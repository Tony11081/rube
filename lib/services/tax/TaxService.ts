export interface TaxCalculation {
  subtotal: number
  taxAmount: number
  total: number
  taxRate: number
  taxInclusive: boolean
  region: string
}

export interface TaxCalculationParams {
  amount: number
  country: string
  region?: string
  postalCode?: string
  vatNumber?: string
  productType?: 'digital' | 'physical'
  strategy?: 'inclusive_eu_exclusive_us' | 'always_inclusive' | 'always_exclusive'
}

export class TaxService {
  private static readonly EU_COUNTRIES = [
    'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
    'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
    'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'
  ]

  private static readonly TAX_RATES: Record<string, number> = {
    // EU Digital Services VAT rates (simplified)
    'AT': 20, 'BE': 21, 'BG': 20, 'HR': 25, 'CY': 19, 'CZ': 21,
    'DK': 25, 'EE': 20, 'FI': 24, 'FR': 20, 'DE': 19, 'GR': 24,
    'HU': 27, 'IE': 23, 'IT': 22, 'LV': 21, 'LT': 21, 'LU': 17,
    'MT': 18, 'NL': 21, 'PL': 23, 'PT': 23, 'RO': 19, 'SK': 20,
    'SI': 22, 'ES': 21, 'SE': 25,
    
    // Other major markets
    'GB': 20, // UK VAT
    'US': 0,  // No federal sales tax, state taxes vary
    'CA': 5,  // GST, provinces add PST
    'AU': 10, // GST
    'JP': 10, // Consumption tax
    'CH': 7.7, // VAT
    'NO': 25, // VAT
  }

  static calculateTax(params: TaxCalculationParams): TaxCalculation {
    const {
      amount,
      country,
      region,
      vatNumber,
      productType = 'digital',
      strategy = 'inclusive_eu_exclusive_us'
    } = params

    // Determine tax rate
    const baseRate = this.TAX_RATES[country] || 0
    const taxRate = this.getTaxRate(country, region, vatNumber, productType, baseRate)

    // Determine if tax should be included based on strategy
    const shouldIncludeTax = this.shouldIncludeTax(country, strategy)

    let subtotal: number
    let taxAmount: number
    let total: number

    if (shouldIncludeTax) {
      // Tax inclusive - amount already includes tax
      total = amount
      subtotal = amount / (1 + taxRate / 100)
      taxAmount = total - subtotal
    } else {
      // Tax exclusive - add tax to amount
      subtotal = amount
      taxAmount = amount * (taxRate / 100)
      total = subtotal + taxAmount
    }

    return {
      subtotal: Math.round(subtotal * 100) / 100,
      taxAmount: Math.round(taxAmount * 100) / 100,
      total: Math.round(total * 100) / 100,
      taxRate,
      taxInclusive: shouldIncludeTax,
      region: this.getRegionName(country),
    }
  }

  private static getTaxRate(
    country: string,
    region: string | undefined,
    vatNumber: string | undefined,
    productType: string,
    baseRate: number
  ): number {
    // VAT number exemption for B2B in EU
    if (vatNumber && this.EU_COUNTRIES.includes(country) && productType === 'digital') {
      return 0 // Reverse charge applies
    }

    // Special cases for US state taxes (simplified)
    if (country === 'US' && region) {
      const stateTaxRates: Record<string, number> = {
        'CA': 7.25, // California
        'NY': 8,    // New York
        'TX': 6.25, // Texas
        'FL': 6,    // Florida
        'WA': 6.5,  // Washington
        // Add more states as needed
      }
      return stateTaxRates[region] || 0
    }

    return baseRate
  }

  private static shouldIncludeTax(country: string, strategy: string): boolean {
    switch (strategy) {
      case 'inclusive_eu_exclusive_us':
        return this.EU_COUNTRIES.includes(country) || country === 'GB'
      case 'always_inclusive':
        return true
      case 'always_exclusive':
        return false
      default:
        return false
    }
  }

  private static getRegionName(country: string): string {
    if (this.EU_COUNTRIES.includes(country)) {
      return 'European Union'
    }

    const regionNames: Record<string, string> = {
      'GB': 'United Kingdom',
      'US': 'United States',
      'CA': 'Canada',
      'AU': 'Australia',
      'JP': 'Japan',
      'CH': 'Switzerland',
      'NO': 'Norway',
    }

    return regionNames[country] || 'Other'
  }

  static isValidVATNumber(vatNumber: string, country: string): boolean {
    if (!vatNumber || !this.EU_COUNTRIES.includes(country)) {
      return false
    }

    // Basic VAT number format validation (simplified)
    const vatPatterns: Record<string, RegExp> = {
      'DE': /^DE\d{9}$/,
      'FR': /^FR[A-Z0-9]{2}\d{9}$/,
      'GB': /^GB\d{9}$/,
      'IT': /^IT\d{11}$/,
      'ES': /^ES[A-Z0-9]\d{7}[A-Z0-9]$/,
      'NL': /^NL\d{9}B\d{2}$/,
      // Add more patterns as needed
    }

    const pattern = vatPatterns[country]
    return pattern ? pattern.test(vatNumber.replace(/\s/g, '').toUpperCase()) : false
  }

  static getRequiredTaxFields(country: string): {
    requiresVAT: boolean
    requiresPostalCode: boolean
    requiresRegion: boolean
  } {
    return {
      requiresVAT: this.EU_COUNTRIES.includes(country),
      requiresPostalCode: ['US', 'CA'].includes(country),
      requiresRegion: ['US', 'CA'].includes(country),
    }
  }
}