# Digital Store - International E-commerce Platform

A modern, international digital goods marketplace built with Next.js 14, featuring multi-language support, global payments, and secure digital downloads.

## 🌟 Features

### 🛍️ **E-commerce Core**
- **Digital Products**: Sell PDFs, templates, courses, and digital resources
- **Multi-Currency**: Support for USD, EUR, JPY, GBP, CNY with real-time conversion
- **Global Payments**: Stripe, PayPal, and mock payment integration
- **Secure Downloads**: JWT-signed download tokens with expiration and usage limits

### 🌍 **Internationalization**
- **Multi-Language**: English, Chinese (Simplified), Japanese
- **Localized Routing**: `/(locale)/store` URL structure
- **Currency Formatting**: Region-appropriate number and date formatting
- **Tax Compliance**: EU VAT, US sales tax, and global tax strategies

### 🔒 **Security & Compliance**
- **Download Protection**: Time-limited and usage-limited download links
- **Payment Security**: Webhook verification and PCI compliance
- **User Authentication**: Clerk integration with role-based access
- **Legal Pages**: Terms, Privacy, Refund, EULA, and Cookie preferences

### ⚡ **Performance & Reliability**
- **Redis Caching**: Multi-level caching for FX rates and product data
- **CDN Storage**: S3/R2 compatibility for global file distribution
- **SEO Optimized**: Multi-language sitemaps, structured data, and hreflang
- **Type Safety**: Full TypeScript with Drizzle ORM

## 🏗️ **Tech Stack**

### **Frontend**
- **Next.js 14** (App Router)
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **next-intl** for internationalization

### **Backend**
- **Neon PostgreSQL** database
- **Drizzle ORM** for type-safe queries
- **Upstash Redis** for caching
- **Clerk** for authentication

### **Services**
- **Stripe** & **PayPal** for payments
- **S3/Cloudflare R2** for file storage
- **Resend** for transactional emails
- **Vercel** for deployment and analytics

## 🚀 **Quick Start**

### **1. Installation**
```bash
git clone <repository-url>
cd digital-store
pnpm install
```

### **2. Environment Setup**
Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

**Required Configuration:**
- Database: Neon PostgreSQL connection
- Redis: Upstash Redis for caching
- Auth: Clerk keys for user management
- Storage: S3 or R2 credentials
- Payment: Stripe and/or PayPal credentials

### **3. Database Setup**
```bash
# Generate and push database schema
pnpm db:generate
pnpm db:push

# Or run migrations
pnpm db:migrate
```

### **4. Development**
```bash
# Start development server
pnpm dev

# Start email preview server (optional)
pnpm dev:email
```

### **5. Production Build**
```bash
pnpm build
pnpm start
```

## 📁 **Project Structure**

```
📦 digital-store/
├── 📂 app/
│   ├── 📂 [locale]/           # Internationalized routes
│   │   ├── 📂 store/          # Product catalog
│   │   ├── 📂 p/[slug]/       # Product details
│   │   ├── 📂 checkout/       # Checkout flow
│   │   ├── 📂 order/[id]/     # Order management
│   │   └── 📂 legal/          # Legal pages
│   ├── 📂 api/                # API routes
│   │   ├── 📂 webhooks/       # Payment webhooks
│   │   ├── 📂 payment/        # Payment processing
│   │   └── 📂 orders/         # Order management
│   └── 📂 admin/              # Admin dashboard
├── 📂 lib/
│   ├── 📂 services/           # Business logic
│   │   ├── 📂 payment/        # Payment adapters
│   │   ├── 📂 tax/            # Tax calculation
│   │   ├── 📂 fx/             # Currency conversion
│   │   ├── 📂 download/       # Secure downloads
│   │   └── 📂 email/          # Email templates
│   └── 📂 i18n/              # Internationalization
├── 📂 db/                     # Database schema
├── 📂 components/             # React components
├── 📂 emails/                 # Email templates
└── 📂 sanity/                # CMS configuration
```

## 💳 **Payment Integration**

### **Stripe Setup**
1. Create Stripe account and get API keys
2. Configure webhook endpoint: `/api/webhooks/stripe`
3. Set required environment variables:
```bash
STRIPE_SECRET_KEY=sk_...
STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### **PayPal Setup**
1. Create PayPal Developer account
2. Get client credentials
3. Configure webhook endpoint: `/api/webhooks/paypal`
```bash
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
PAYPAL_WEBHOOK_ID=...
```

## 🗄️ **Database Schema**

### **Core Tables**
- `products` - Product catalog
- `product_prices` - Multi-currency pricing
- `product_assets` - Downloadable files
- `orders` - Purchase records
- `download_tokens` - Secure download links

### **Supporting Tables**
- `product_categories` - Product organization
- `fx_rates_cache` - Currency conversion cache
- `subscribers` - Newsletter subscribers
- `comments` & `guestbook` - User engagement

## 🌍 **Internationalization**

### **Supported Locales**
- **English (en)** - Default
- **简体中文 (zh-CN)** - Simplified Chinese
- **日本語 (ja)** - Japanese

### **Adding New Languages**
1. Create translation file: `lib/i18n/locales/{locale}.json`
2. Update locale config: `lib/i18n/config.ts`
3. Add currency mapping if needed

## 📊 **Admin Dashboard**

Access the admin panel at `/admin` with proper permissions:

### **Features**
- Product management (CRUD)
- Order tracking and fulfillment
- Customer management
- Sales analytics
- Download token management
- FX rate controls

### **Roles**
- `admin` - Full access
- `editor` - Product and content management
- `customer` - Default user role

## 🔧 **Configuration**

### **Tax Settings**
Configure tax strategies in environment:
```bash
TAX_DEFAULT_STRATEGY="inclusive_eu_exclusive_us"
VAT_RATE_EU="20"
TAX_RATE_US="0"
```

### **Download Security**
```bash
DOWNLOAD_TTL_HOURS="24"      # Link expiration
DOWNLOAD_MAX_TIMES="5"       # Download limit
JWT_SECRET="your-secret"     # Token signing
```

### **Storage Options**
```bash
STORAGE_DRIVER="s3"          # s3 | r2 | local
S3_BUCKET="your-bucket"
S3_ACCESS_KEY_ID="..."
S3_SECRET_ACCESS_KEY="..."
```

## 🚢 **Deployment**

### **Vercel (Recommended)**
1. Connect your GitHub repository
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### **Self-Hosted**
1. Build the application: `pnpm build`
2. Set up PostgreSQL and Redis
3. Configure environment variables
4. Start with: `pnpm start`

### **Docker**
```bash
# Build image
docker build -t digital-store .

# Run container
docker run -p 3000:3000 --env-file .env digital-store
```

## 📈 **Analytics & Monitoring**

### **Built-in Analytics**
- Order conversion tracking
- Product performance metrics
- Revenue reporting by currency/region

### **External Integration**
- Vercel Analytics for performance
- Custom event tracking for commerce events
- Error monitoring with Sentry (optional)

## 🛡️ **Security Best Practices**

### **Download Protection**
- JWT-signed download tokens
- IP address logging
- Time and usage limits
- File access auditing

### **Payment Security**
- Webhook signature verification
- PCI DSS compliance via Stripe/PayPal
- Secure API key management
- Rate limiting on checkout endpoints

### **User Data**
- GDPR/CCPA compliant data handling
- Optional user accounts
- Data retention policies
- Cookie consent management

## 📚 **API Documentation**

### **Key Endpoints**
- `GET /api/products` - Product catalog
- `POST /api/payment/create-session` - Start checkout
- `GET /api/orders/[id]` - Order details
- `GET /api/orders/[id]/download/[token]` - Secure download
- `POST /api/webhooks/stripe` - Payment webhooks

### **Authentication**
Most endpoints require Clerk authentication. Admin endpoints require specific roles.

## 🔄 **Development Workflow**

### **Code Quality**
```bash
pnpm lint          # ESLint
pnpm type-check    # TypeScript
pnpm format        # Prettier
```

### **Database**
```bash
pnpm db:generate   # Generate migrations
pnpm db:push       # Push schema changes
pnpm db:studio     # Open Drizzle Studio
```

### **Testing**
```bash
pnpm test          # Run tests
pnpm test:watch    # Watch mode
pnpm test:e2e      # End-to-end tests
```

## 🆘 **Support & Troubleshooting**

### **Common Issues**

**Database Connection**
- Verify Neon connection string
- Check network connectivity
- Ensure IP whitelist includes your deployment

**Payment Webhooks**
- Verify webhook endpoints are accessible
- Check webhook signing secrets
- Monitor webhook logs in provider dashboard

**File Downloads**
- Ensure storage credentials are correct
- Check file permissions and bucket policies
- Verify JWT secret consistency

### **Getting Help**
- Check the [Issues](https://github.com/your-repo/issues) page
- Review environment variable configuration
- Enable debug logging in development

## 📄 **License**

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

**🎉 Ready to launch your digital marketplace!** This platform provides everything needed for a professional, international e-commerce operation with enterprise-grade security and performance.