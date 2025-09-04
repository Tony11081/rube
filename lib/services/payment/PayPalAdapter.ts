import { PaymentAdapter, CheckoutSession, WebhookPayload, PaymentVerification } from './PaymentAdapter'

// Note: This is a basic implementation. For production, you'd use the official PayPal SDK
export class PayPalAdapter extends PaymentAdapter {
  name = 'paypal'
  private clientId: string
  private clientSecret: string
  private baseUrl: string

  constructor(clientId: string, clientSecret: string, sandbox = true) {
    super()
    this.clientId = clientId
    this.clientSecret = clientSecret
    this.baseUrl = sandbox 
      ? 'https://api.sandbox.paypal.com'
      : 'https://api.paypal.com'
  }

  private async getAccessToken(): Promise<string> {
    const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')
    
    const response = await fetch(`${this.baseUrl}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    })

    const data = await response.json()
    return data.access_token
  }

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
    const accessToken = await this.getAccessToken()

    const orderPayload = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: params.currency,
            value: params.amount.toFixed(2),
          },
          description: params.productTitle,
          custom_id: params.orderId,
        },
      ],
      application_context: {
        return_url: params.successUrl,
        cancel_url: params.cancelUrl,
        brand_name: 'Kkgool',
        user_action: 'PAY_NOW',
      },
    }

    const response = await fetch(`${this.baseUrl}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderPayload),
    })

    const order = await response.json()
    const approveLink = order.links?.find((link: any) => link.rel === 'approve')

    return {
      id: order.id,
      url: approveLink?.href || '',
      status: 'pending',
    }
  }

  async verifyWebhook(
    payload: string | Buffer,
    signature: string,
    secret: string
  ): Promise<WebhookPayload> {
    // PayPal webhook verification would go here
    // For now, we'll parse the payload directly
    const data = JSON.parse(payload.toString())
    
    return {
      type: data.event_type,
      data: data.resource,
      timestamp: new Date(data.create_time).getTime() / 1000,
    }
  }

  async handleWebhook(payload: WebhookPayload): Promise<PaymentVerification | null> {
    switch (payload.type) {
      case 'CHECKOUT.ORDER.APPROVED': {
        const order = payload.data
        
        return {
          orderId: order.purchase_units?.[0]?.custom_id || '',
          paymentReference: order.id,
          status: 'success',
          amount: parseFloat(order.purchase_units?.[0]?.amount?.value || '0'),
          currency: order.purchase_units?.[0]?.amount?.currency_code || 'USD',
        }
      }
      
      case 'CHECKOUT.ORDER.CANCELLED': {
        const order = payload.data
        
        return {
          orderId: order.purchase_units?.[0]?.custom_id || '',
          paymentReference: order.id,
          status: 'failed',
          amount: parseFloat(order.purchase_units?.[0]?.amount?.value || '0'),
          currency: order.purchase_units?.[0]?.amount?.currency_code || 'USD',
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
    try {
      const accessToken = await this.getAccessToken()
      
      const refundPayload = {
        amount: params.amount ? {
          value: params.amount.toFixed(2),
          currency_code: 'USD', // You'd need to store the original currency
        } : undefined,
        note_to_payer: params.reason,
      }

      const response = await fetch(`${this.baseUrl}/v2/payments/captures/${params.paymentIntentId}/refund`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(refundPayload),
      })

      const refund = await response.json()

      return {
        success: response.ok,
        refundId: refund.id,
      }
    } catch (error) {
      console.error('PayPal refund failed:', error)
      return { success: false }
    }
  }
}