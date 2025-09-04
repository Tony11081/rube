export interface CheckoutSession {
  id: string
  url: string
  paymentIntentId?: string
  status: 'pending' | 'completed' | 'expired' | 'cancelled'
}

export interface WebhookPayload {
  type: string
  data: any
  timestamp: number
  signature?: string
}

export interface PaymentVerification {
  orderId: string
  paymentReference: string
  status: 'success' | 'failed' | 'pending'
  amount: number
  currency: string
  metadata?: Record<string, any>
}

export abstract class PaymentAdapter {
  abstract name: string

  abstract createCheckoutSession(params: {
    orderId: string
    amount: number
    currency: string
    productTitle: string
    productDescription?: string
    customerEmail: string
    successUrl: string
    cancelUrl: string
    metadata?: Record<string, any>
  }): Promise<CheckoutSession>

  abstract verifyWebhook(
    payload: string | Buffer,
    signature: string,
    secret: string
  ): Promise<WebhookPayload>

  abstract handleWebhook(payload: WebhookPayload): Promise<PaymentVerification | null>

  abstract refund?(params: {
    paymentIntentId: string
    amount?: number
    reason?: string
  }): Promise<{ success: boolean; refundId?: string }>
}