export const navigationItems = [
  { href: '/', text: 'Home' },
  { href: '/store', text: 'Store' },
  { href: '/shop', text: 'Shop', description: 'Social-friendly shop page' },
  { href: '/blog', text: 'Blog' },
  { href: '/about', text: 'About' },
  { href: '/contact', text: 'Contact' }
]

// Main navigation for authenticated users
export const userNavigationItems = [
  { href: '/orders', text: 'My Orders' },
  { href: '/downloads', text: 'My Downloads' },
  { href: '/account', text: 'Account' }
]

// Admin navigation
export const adminNavigationItems = [
  { href: '/admin', text: 'Dashboard' },
  { href: '/admin/products', text: 'Products' },
  { href: '/admin/orders', text: 'Orders' },
  { href: '/admin/customers', text: 'Customers' },
  { href: '/admin/analytics', text: 'Analytics' }
]