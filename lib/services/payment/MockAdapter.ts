import { PaymentAdapter, CheckoutSession, WebhookPayload, PaymentVerification } from './PaymentAdapter'

export class MockAdapter extends PaymentAdapter {
  name = 'mock'

  async createCheckoutSession(params: {
    orderId: string
    amount: number
    currency: string
    productTitle: string
    productDescription?: string
    customerEmail: string
    successUrl: string
    cancelUrl: string
    metadata?: Record<string, any>
  }): Promise<CheckoutSession> {
    // Simulate payment processing time
    await new Promise(resolve => setTimeout(resolve, 100))

    const sessionId = `mock_session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const baseUrl = process.env.SITE_URL || 'http://localhost:3000'
    
    return {
      id: sessionId,
      url: `${baseUrl}/api/payment/mock/checkout?session=${sessionId}&order=${params.orderId}&amount=${params.amount}&currency=${params.currency}`,
      paymentIntentId: `mock_pi_${Date.now()}`,
      status: 'pending',
    }
  }

  async verifyWebhook(
    payload: string | Buffer,
    signature: string,
    secret: string
  ): Promise<WebhookPayload> {
    // Mock webhook verification
    const data = JSON.parse(payload.toString())
    
    return {
      type: data.type,
      data: data.data,
      timestamp: data.timestamp || Math.floor(Date.now() / 1000),
    }
  }

  async handleWebhook(payload: WebhookPayload): Promise<PaymentVerification | null> {
    switch (payload.type) {
      case 'payment.succeeded': {
        const data = payload.data
        
        return {
          orderId: data.orderId,
          paymentReference: data.sessionId,
          status: 'success',
          amount: data.amount,
          currency: data.currency,
          metadata: data.metadata || {},
        }
      }
      
      case 'payment.failed': {
        const data = payload.data
        
        return {
          orderId: data.orderId,
          paymentReference: data.sessionId,
          status: 'failed',
          amount: data.amount,
          currency: data.currency,
          metadata: data.metadata || {},
        }
      }
      
      default:
        return null
    }
  }

  async refund(params: {
    paymentIntentId: string
    amount?: number
    reason?: string
  }): Promise<{ success: boolean; refundId?: string }> {
    // Mock refund - always succeeds in demo
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return {
      success: true,
      refundId: `mock_refund_${Date.now()}`,
    }
  }

  // Helper method for mock payment completion (used by the mock checkout page)
  static async simulatePayment(params: {
    sessionId: string
    orderId: string
    amount: number
    currency: string
    success: boolean
  }): Promise<void> {
    const webhookUrl = `${process.env.SITE_URL}/api/webhooks/mock`
    
    const payload = {
      type: params.success ? 'payment.succeeded' : 'payment.failed',
      data: {
        sessionId: params.sessionId,
        orderId: params.orderId,
        amount: params.amount,
        currency: params.currency,
      },
      timestamp: Math.floor(Date.now() / 1000),
    }

    // Simulate webhook call
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
    } catch (error) {
      console.error('Mock webhook failed:', error)
    }
  }
}