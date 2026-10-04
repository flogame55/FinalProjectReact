export function roundToCharmPrice(amount) {
  const value = Number(amount)
  if (!Number.isFinite(value) || value <= 0) return 0

  const base = Math.floor(value / 10) * 10
  const candidates = [base, base + 9, base + 10]
  return candidates.reduce((closest, candidate) => (
    Math.abs(candidate - value) <= Math.abs(closest - value) ? candidate : closest
  ))
}

export function convertUsdToThb(amount, rate) {
  const usdAmount = Number(amount)
  const exchangeRate = Number(rate)
  if (!Number.isFinite(usdAmount) || !Number.isFinite(exchangeRate) || exchangeRate <= 0) return 0
  return roundToCharmPrice(usdAmount * exchangeRate)
}
