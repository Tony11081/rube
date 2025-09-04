const { execSync } = require('child_process');

console.log('Starting build process...');

try {
  // 设置环境变量
  process.env.SKIP_ENV_VALIDATION = '1';
  process.env.NODE_ENV = 'production';
  process.env.NEXT_SKIP_API_ROUTES = '1';
  
  // 提供默认值，但允许被已设置的环境变量覆盖
  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = 'postgresql://dummy:dummy@localhost:5432/dummy';
  }
  
  if (!process.env.RESEND_API_KEY) {
    process.env.RESEND_API_KEY = 're_dummy';
  }
  
  if (!process.env.UPSTASH_REDIS_REST_URL) {
    process.env.UPSTASH_REDIS_REST_URL = 'https://dummy.upstash.io';
  }
  
  if (!process.env.UPSTASH_REDIS_REST_TOKEN) {
    process.env.UPSTASH_REDIS_REST_TOKEN = 'dummy_token';
  }
  
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'dummy';
  }
  
  if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
    process.env.NEXT_PUBLIC_SANITY_DATASET = 'dummy';
  }
  
  if (!process.env.NEXT_PUBLIC_SANITY_USE_CDN) {
    process.env.NEXT_PUBLIC_SANITY_USE_CDN = 'true';
  }
  
  if (!process.env.NEXT_PUBLIC_SITE_URL) {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://shopchina.vercel.app';
  }
  
  if (!process.env.NEXT_PUBLIC_SITE_EMAIL_FROM) {
    process.env.NEXT_PUBLIC_SITE_EMAIL_FROM = 'noreply@shopchina.vercel.app';
  }
  
  console.log('Environment variables set');
  
  // 运行构建命令
  console.log('Running next build command...');
  execSync('npx next build', { stdio: 'inherit' });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed with error:', error.message);
  process.exit(1);
} 