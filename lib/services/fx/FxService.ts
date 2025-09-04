import { Redis } from '@upstash/redis'

export interface ExchangeRate {
  from: string
  to: string
  rate: number
  timestamp: number
  provider: string
}

export interface FxProvider {
  getName(): string
  getRates(baseCurrency: string, currencies: string[]): Promise<Record<string, number>>
}

export class MockFxProvider implements FxProvider {
  getName(): string {
    return 'mock'
  }

  async getRates(baseCurrency: string, currencies: string[]): Promise<Record<string, number>> {
    // Mock exchange rates - in production, use real rates
    const mockRates: Record<string, Record<string, number>> = {
      'USD': {
        'EUR': 0.85,
        'JPY': 149.50,
        'GBP': 0.79,
        'CNY': 7.25,
        'USD': 1.0,
      },
      'EUR': {
        'USD': 1.18,
        'JPY': 176.47,
        'GBP': 0.93,
        'CNY': 8.53,
        'EUR': 1.0,
      },
      'JPY': {
        'USD': 0.0067,
        'EUR': 0.0057,
        'GBP': 0.0053,
        'CNY': 0.0485,
        'JPY': 1.0,
      },
      'GBP': {
        'USD': 1.27,
        'EUR': 1.08,
        'JPY': 189.87,
        'CNY': 9.19,
        'GBP': 1.0,
      },
      'CNY': {
        'USD': 0.138,
        'EUR': 0.117,
        'JPY': 20.62,
        'GBP': 0.109,
        'CNY': 1.0,
      },
    }

    await new Promise(resolve => setTimeout(resolve, 100)) // Simulate API call

    const rates: Record<string, number> = {}
    const baseRates = mockRates[baseCurrency] || {}

    for (const currency of currencies) {
      rates[currency] = baseRates[currency] || 1.0
    }

    return rates
  }
}

export class FxService {
  private redis: Redis
  private provider: FxProvider
  private cacheTtl: number = 3600 // 1 hour

  constructor(redisUrl: string, redisToken: string, provider?: FxProvider) {
    this.redis = new Redis({
      url: redisUrl,
      token: redisToken,
    })
    this.provider = provider || new MockFxProvider()
  }

  async getRate(from: string, to: string): Promise<number> {
    if (from === to) return 1.0

    // Try cache first
    const cacheKey = `fx:${from}:${to}`
    const cached = await this.redis.get(cacheKey)
    
    if (cached && typeof cached === 'object' && 'rate' in cached) {
      const rate = cached as ExchangeRate
      if (Date.now() - rate.timestamp < this.cacheTtl * 1000) {
        return rate.rate
      }
    }

    // Fetch fresh rate
    try {
      const rates = await this.provider.getRates(from, [to])
      const rate = rates[to] || 1.0

      // Cache the result
      const exchangeRate: ExchangeRate = {
        from,
        to,
        rate,
        timestamp: Date.now(),
        provider: this.provider.getName(),
      }

      await this.redis.setex(cacheKey, this.cacheTtl, JSON.stringify(exchangeRate))
      
      return rate
    } catch (error) {
      console.error('Failed to fetch exchange rate:', error)
      
      // Return cached value if available, even if expired
      if (cached && typeof cached === 'object' && 'rate' in cached) {
        return (cached as ExchangeRate).rate
      }
      
      return 1.0 // Fallback
    }
  }

  async getRates(from: string, currencies: string[]): Promise<Record<string, number>> {
    const results: Record<string, number> = {}
    
    // Check cache for all rates
    const cacheKeys = currencies.map(to => `fx:${from}:${to}`)
    const cached = await this.redis.mget(...cacheKeys)
    
    const missingCurrencies: string[] = []
    
    currencies.forEach((currency, index) => {
      const cachedRate = cached[index]
      if (cachedRate && typeof cachedRate === 'object' && 'rate' in cachedRate) {
        const rate = cachedRate as ExchangeRate
        if (Date.now() - rate.timestamp < this.cacheTtl * 1000) {
          results[currency] = rate.rate
          return
        }
      }
      missingCurrencies.push(currency)
    })

    // Fetch missing rates
    if (missingCurrencies.length > 0) {
      try {
        const freshRates = await this.provider.getRates(from, missingCurrencies)
        
        // Cache and store results
        const pipeline = this.redis.pipeline()
        
        for (const [currency, rate] of Object.entries(freshRates)) {
          results[currency] = rate
          
          const exchangeRate: ExchangeRate = {
            from,
            to: currency,
            rate,
            timestamp: Date.now(),
            provider: this.provider.getName(),
          }
          
          pipeline.setex(`fx:${from}:${currency}`, this.cacheTtl, JSON.stringify(exchangeRate))
        }
        
        await pipeline.exec()
      } catch (error) {
        console.error('Failed to fetch exchange rates:', error)
        
        // Use expired cache values for missing currencies
        currencies.forEach((currency, index) => {
          if (!results[currency]) {
            const cachedRate = cached[index]
            if (cachedRate && typeof cachedRate === 'object' && 'rate' in cachedRate) {
              results[currency] = (cachedRate as ExchangeRate).rate
            } else {
              results[currency] = 1.0 // Fallback
            }
          }
        })
      }
    }

    return results
  }

  async convertAmount(amount: number, from: string, to: string): Promise<number> {
    const rate = await this.getRate(from, to)
    return Math.round(amount * rate * 100) / 100
  }

  async freezeRate(from: string, to: string): Promise<void> {
    const currentRate = await this.getRate(from, to)
    
    const frozenRate: ExchangeRate = {
      from,
      to,
      rate: currentRate,
      timestamp: Date.now(),
      provider: 'frozen',
    }

    // Cache for a very long time (1 year)
    await this.redis.setex(`fx:${from}:${to}`, 365 * 24 * 3600, JSON.stringify(frozenRate))
  }

  async clearCache(from?: string, to?: string): Promise<void> {
    if (from && to) {
      await this.redis.del(`fx:${from}:${to}`)
    } else {
      // Clear all FX cache
      const keys = await this.redis.keys('fx:*')
      if (keys.length > 0) {
        await this.redis.del(...keys)
      }
    }
  }
}