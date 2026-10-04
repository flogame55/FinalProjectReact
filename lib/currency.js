const RATE_URL = 'https://api.frankfurter.dev/v2/rate/usd/thb'
const DEFAULT_FALLBACK_RATE = 33.62

import { convertUsdToThb } from './pricing'
export { convertUsdToThb }

export async function getUsdToThbRate() {
  try {
    const response = await fetch(RATE_URL, { next: { revalidate: 3600 } })
    if (!response.ok) throw new Error(`Exchange rate API responded with ${response.status}`)

    const result = await response.json()
    const rate = Number(result.rate)
    if (!Number.isFinite(rate) || rate <= 0) throw new Error('Exchange rate API returned an invalid rate')

    return { rate, date: result.date || null, source: 'Frankfurter' }
  } catch (error) {
    console.error('โหลดอัตราแลกเปลี่ยน USD/THB ไม่สำเร็จ ใช้อัตราสำรองแทน:', error?.message || error)
    const configuredRate = Number(process.env.USD_TO_THB_FALLBACK_RATE)
    return {
      rate: Number.isFinite(configuredRate) && configuredRate > 0 ? configuredRate : DEFAULT_FALLBACK_RATE,
      date: null,
      source: 'fallback',
    }
  }
}
