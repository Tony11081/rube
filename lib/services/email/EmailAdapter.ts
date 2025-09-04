export interface EmailTemplate {
  subject: string
  html: string
  text?: string
}

export interface EmailRecipient {
  email: string
  name?: string
}

export interface EmailParams {
  to: EmailRecipient | EmailRecipient[]
  from: EmailRecipient
  subject: string
  html?: string
  text?: string
  template?: string
  templateData?: Record<string, any>
  attachments?: Array<{
    filename: string
    content: Buffer | string
    contentType?: string
  }>
}

export abstract class EmailAdapter {
  abstract name: string

  abstract sendEmail(params: EmailParams): Promise<{
    success: boolean
    messageId?: string
    error?: string
  }>

  abstract renderTemplate(templateName: string, data: Record<string, any>, locale?: string): Promise<EmailTemplate>
}

export class MockEmailAdapter extends EmailAdapter {
  name = 'mock'

  async sendEmail(params: EmailParams): Promise<{
    success: boolean
    messageId?: string
    error?: string
  }> {
    // Simulate email sending
    console.log('📧 Mock Email Sent:', {
      to: params.to,
      subject: params.subject,
      template: params.template,
    })

    await new Promise(resolve => setTimeout(resolve, 100))

    return {
      success: true,
      messageId: `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    }
  }

  async renderTemplate(templateName: string, data: Record<string, any>, locale = 'en'): Promise<EmailTemplate> {
    const templates: Record<string, Record<string, EmailTemplate>> = {
      'order-confirmation': {
        'en': {
          subject: `Order Confirmation - ${data.orderNumber}`,
          html: `
            <h1>Thank you for your order!</h1>
            <p>Hello ${data.customerName},</p>
            <p>Your order for "${data.productTitle}" has been confirmed.</p>
            <p><strong>Order Number:</strong> ${data.orderNumber}</p>
            <p><strong>Amount:</strong> ${data.amount} ${data.currency}</p>
            <p>You can download your files here: <a href="${data.downloadUrl}">Download Now</a></p>
          `,
          text: `Thank you for your order! Order: ${data.orderNumber}, Amount: ${data.amount} ${data.currency}. Download: ${data.downloadUrl}`,
        },
        'zh-CN': {
          subject: `订单确认 - ${data.orderNumber}`,
          html: `
            <h1>感谢您的订单！</h1>
            <p>您好 ${data.customerName}，</p>
            <p>您购买的"${data.productTitle}"订单已确认。</p>
            <p><strong>订单号：</strong> ${data.orderNumber}</p>
            <p><strong>金额：</strong> ${data.amount} ${data.currency}</p>
            <p>您可以在这里下载文件：<a href="${data.downloadUrl}">立即下载</a></p>
          `,
        },
        'ja': {
          subject: `注文確認 - ${data.orderNumber}`,
          html: `
            <h1>ご注文ありがとうございます！</h1>
            <p>${data.customerName}様</p>
            <p>「${data.productTitle}」のご注文が確認されました。</p>
            <p><strong>注文番号：</strong> ${data.orderNumber}</p>
            <p><strong>金額：</strong> ${data.amount} ${data.currency}</p>
            <p>こちらからダウンロードできます：<a href="${data.downloadUrl}">ダウンロード</a></p>
          `,
        },
      },
      'download-ready': {
        'en': {
          subject: `Your download is ready - ${data.productTitle}`,
          html: `
            <h1>Your download is ready!</h1>
            <p>Hello ${data.customerName},</p>
            <p>Your purchase "${data.productTitle}" is ready for download.</p>
            <p><strong>Download expires:</strong> ${data.expiresAt}</p>
            <p><strong>Downloads remaining:</strong> ${data.remainingDownloads}</p>
            <p><a href="${data.downloadUrl}" style="background: #007cba; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Download Files</a></p>
          `,
        },
        'zh-CN': {
          subject: `您的下载已准备就绪 - ${data.productTitle}`,
          html: `
            <h1>您的下载已准备就绪！</h1>
            <p>您好 ${data.customerName}，</p>
            <p>您购买的"${data.productTitle}"已准备好下载。</p>
            <p><strong>下载过期时间：</strong> ${data.expiresAt}</p>
            <p><strong>剩余下载次数：</strong> ${data.remainingDownloads}</p>
            <p><a href="${data.downloadUrl}" style="background: #007cba; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">下载文件</a></p>
          `,
        },
        'ja': {
          subject: `ダウンロードの準備ができました - ${data.productTitle}`,
          html: `
            <h1>ダウンロードの準備ができました！</h1>
            <p>${data.customerName}様</p>
            <p>ご購入いただいた「${data.productTitle}」のダウンロードが可能です。</p>
            <p><strong>ダウンロード期限：</strong> ${data.expiresAt}</p>
            <p><strong>残りダウンロード回数：</strong> ${data.remainingDownloads}</p>
            <p><a href="${data.downloadUrl}" style="background: #007cba; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">ファイルをダウンロード</a></p>
          `,
        },
      },
    }

    const template = templates[templateName]?.[locale] || templates[templateName]?.['en']
    
    if (!template) {
      throw new Error(`Template not found: ${templateName}`)
    }

    return template
  }
}

export class ResendAdapter extends EmailAdapter {
  name = 'resend'
  private apiKey: string

  constructor(apiKey: string) {
    super()
    this.apiKey = apiKey
  }

  async sendEmail(params: EmailParams): Promise<{
    success: boolean
    messageId?: string
    error?: string
  }> {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `${params.from.name} <${params.from.email}>`,
          to: Array.isArray(params.to) 
            ? params.to.map(r => r.email)
            : [params.to.email],
          subject: params.subject,
          html: params.html,
          text: params.text,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: result.message || 'Failed to send email',
        }
      }

      return {
        success: true,
        messageId: result.id,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  async renderTemplate(templateName: string, data: Record<string, any>, locale = 'en'): Promise<EmailTemplate> {
    // Use the same mock templates for now
    const mockAdapter = new MockEmailAdapter()
    return mockAdapter.renderTemplate(templateName, data, locale)
  }
}

export class EmailService {
  private adapter: EmailAdapter

  constructor(adapter: EmailAdapter) {
    this.adapter = adapter
  }

  async sendOrderConfirmation(params: {
    to: string
    customerName: string
    orderNumber: string
    productTitle: string
    amount: number
    currency: string
    downloadUrl: string
    locale?: string
  }): Promise<boolean> {
    try {
      const template = await this.adapter.renderTemplate('order-confirmation', params, params.locale)
      
      const result = await this.adapter.sendEmail({
        to: { email: params.to, name: params.customerName },
        from: { email: 'noreply@kkgool.cc', name: 'Kkgool' },
        subject: template.subject,
        html: template.html,
        text: template.text,
      })

      return result.success
    } catch (error) {
      console.error('Failed to send order confirmation:', error)
      return false
    }
  }

  async sendDownloadReady(params: {
    to: string
    customerName: string
    productTitle: string
    downloadUrl: string
    expiresAt: string
    remainingDownloads: number
    locale?: string
  }): Promise<boolean> {
    try {
      const template = await this.adapter.renderTemplate('download-ready', params, params.locale)
      
      const result = await this.adapter.sendEmail({
        to: { email: params.to, name: params.customerName },
        from: { email: 'noreply@kkgool.cc', name: 'Kkgool' },
        subject: template.subject,
        html: template.html,
        text: template.text,
      })

      return result.success
    } catch (error) {
      console.error('Failed to send download ready email:', error)
      return false
    }
  }

  static createAdapter(type: string, config: any): EmailAdapter {
    switch (type) {
      case 'resend':
        return new ResendAdapter(config.apiKey)
      case 'mock':
      default:
        return new MockEmailAdapter()
    }
  }
}