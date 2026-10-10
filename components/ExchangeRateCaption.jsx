export default function ExchangeRateCaption({ product, className = '' }) {
  if (!Number.isFinite(product?.priceUsd) || !Number.isFinite(product?.usdToThbRate)) return null

  const source = product.exchangeRateSource === 'fallback' ? 'เรตสำรอง' : 'Frankfurter'
  const date = product.exchangeRateDate
    ? new Intl.DateTimeFormat('th-TH', { dateStyle: 'medium', timeZone: 'Asia/Bangkok' }).format(new Date(product.exchangeRateDate))
    : null

  return (
    <p className={className}>
      ราคาอ้างอิง ${product.priceUsd.toFixed(2)} · 1 USD = {product.usdToThbRate.toFixed(4)} THB ({source}{date ? ` · ${date}` : ''})
    </p>
  )
}
