export default function ExchangeRateCaption({ product, className = '' }) {
  if (!Number.isFinite(product?.priceUsd) || !Number.isFinite(product?.usdToThbRate)) return null

  const rate = product.usdToThbRate.toLocaleString('en-US', { maximumFractionDigits: 4 })
  const date = product.exchangeRateDate
    ? new Intl.DateTimeFormat('th-TH', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Bangkok' }).format(new Date(`${product.exchangeRateDate}T12:00:00Z`))
    : null
  const rateLabel = product.exchangeRateSource === 'fallback' ? 'เรตสำรอง' : date ? `อัตราอ้างอิง ${date}` : 'อัตราอ้างอิง'

  return <p className={className}>แปลงจาก USD · {rateLabel} ฿{rate}/USD</p>
}
