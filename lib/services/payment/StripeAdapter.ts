import Stripe from 'stripe'
import { PaymentAdapter, CheckoutSession, WebhookPayload, PaymentVerification } from './PaymentAdapter'

export class StripeAdapter extends PaymentAdapter {
  name = 'stripe'
  private stripe: Stripe

  constructor(secretKey: string) {
    super()
    this.stripe = new Stripe(secretKey, {
      apiVersion: '2023-10-16',
    })
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
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: params.customerEmail,
      line_items: [
        {
          price_data: {
            currency: params.currency.toLowerCase(),
            product_data: {
              name: params.productTitle,
              description: params.productDescription,
            },
            unit_amount: Math.round(params.amount * 100), // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
      metadata: {
        orderId: params.orderId,
        ...params.metadata,
      },
      expires_at: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
    })

    return {
      id: session.id,
      url: session.url!,
      paymentIntentId: session.payment_intent as string,
      status: 'pending',
    }
  }

  async verifyWebhook(
    payload: string | Buffer,
    signature: string,
    secret: string
  ): Promise<WebhookPayload> {
    const event = this.stripe.webhooks.constructEvent(payload, signature, secret)
    
    return {
      type: event.type,
      data: event.data,
      timestamp: event.created,
    }
  }

  async handleWebhook(payload: WebhookPayload): Promise<PaymentVerification | null> {
    switch (payload.type) {
      case 'checkout.session.completed': {
        const session = payload.data.object as Stripe.Checkout.Session
        
        return {
          orderId: session.metadata?.orderId || '',
          paymentReference: session.id,
          status: 'success',
          amount: (session.amount_total || 0) / 100,
          currency: session.currency?.toUpperCase() || 'USD',
          metadata: session.metadata || {},
        }
      }
      
      case 'checkout.session.expired': {
        const session = payload.data.object as Stripe.Checkout.Session
        
        return {
          orderId: session.metadata?.orderId || '',
          paymentReference: session.id,
          status: 'failed',
          amount: (session.amount_total || 0) / 100,
          currency: session.currency?.toUpperCase() || 'USD',
          metadata: session.metadata || {},
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
      const refund = await this.stripe.refunds.create({
        payment_intent: params.paymentIntentId,
        amount: params.amount ? Math.round(params.amount * 100) : undefined,
        reason: params.reason as Stripe.RefundCreateParams.Reason,
      })

      return {
        success: true,
        refundId: refund.id,
      }
    } catch (error) {
      console.error('Stripe refund failed:', error)
      return { success: false }
    }
  }
}