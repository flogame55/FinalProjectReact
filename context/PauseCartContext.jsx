'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { convertUsdToThb } from '@/lib/pricing'

const STORAGE_KEY = 'pause-cart'
const SESSION_KEY = 'pause-session-id'
const PauseCartContext = createContext(null)

function readItems(value, exchangeRate) {
  try {
    const parsed = JSON.parse(value || '[]')
    return Array.isArray(parsed) ? parsed.filter((item) =>
      Number.isInteger(item?.productId) && item.productId > 0
      && Number.isFinite(item.addedAt) && Number.isFinite(item.readyAt),
    ).map((item) => {
      const product = item.product
      const isDummyJsonProduct = product?.imageUrl?.includes('cdn.dummyjson.com')
      if (!isDummyJsonProduct) return item

      const hasUsdSnapshot = Number.isFinite(product.priceUsd) && Number.isFinite(product.usdToThbRate)
      const priceUsd = hasUsdSnapshot ? product.priceUsd : Number(product.price)
      const rate = hasUsdSnapshot ? product.usdToThbRate : exchangeRate?.rate
      if (!Number.isFinite(priceUsd) || !Number.isFinite(rate)) return item

      const price = convertUsdToThb(priceUsd, rate)
      return {
        ...item,
        product: {
          ...product,
          price,
          priceUsd,
          usdToThbRate: rate,
          exchangeRateDate: hasUsdSnapshot ? product.exchangeRateDate : exchangeRate?.date,
          exchangeRateSource: hasUsdSnapshot ? product.exchangeRateSource : exchangeRate?.source,
        },
      }
    }) : []
  } catch {
    return []
  }
}

function productSnapshot(product) {
  if (!product) return undefined
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    priceUsd: product.priceUsd,
    usdToThbRate: product.usdToThbRate,
    exchangeRateDate: product.exchangeRateDate,
    exchangeRateSource: product.exchangeRateSource,
    imageUrl: product.imageUrl,
    category: product.category,
  }
}

export function PauseCartProvider({ children, exchangeRate }) {
  const exchangeRateRate = exchangeRate?.rate
  const exchangeRateDate = exchangeRate?.date
  const exchangeRateSource = exchangeRate?.source
  const [items, setItems] = useState([])
  const [sessionId, setSessionId] = useState('')
  const [hydrated, setHydrated] = useState(false)
  const [now, setNow] = useState(0)
  const [devFastForward, setDevFastForward] = useState(false)

  useEffect(() => {
    let sid = ''
    const currentExchangeRate = { rate: exchangeRateRate, date: exchangeRateDate, source: exchangeRateSource }
    try {
      setItems(readItems(localStorage.getItem(STORAGE_KEY), currentExchangeRate))
      sid = localStorage.getItem(SESSION_KEY) || crypto.randomUUID()
      localStorage.setItem(SESSION_KEY, sid)
    } catch {
      sid = crypto.randomUUID()
    }
    setSessionId(sid)
    document.cookie = SESSION_KEY + '=' + encodeURIComponent(sid) + '; path=/; max-age=31536000; SameSite=Lax' + (location.protocol === 'https:' ? '; Secure' : '')
    setNow(Date.now())
    setHydrated(true)
    const syncStorage = (event) => {
      if (event.key === STORAGE_KEY) setItems(readItems(event.newValue, currentExchangeRate))
    }
    window.addEventListener('storage', syncStorage)
    return () => window.removeEventListener('storage', syncStorage)
  }, [exchangeRateRate, exchangeRateDate, exchangeRateSource])

  useEffect(() => {
    if (!hydrated) return
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)) } catch { /* Cart remains available in memory. */ }
  }, [items, hydrated])

  useEffect(() => {
    if (!hydrated || !items.length) return
    let previous = Date.now()
    const timer = setInterval(() => {
      const current = Date.now()
      if (devFastForward) {
        const extraElapsed = (current - previous) * 3599
        setItems((previousItems) => previousItems.map((item) => item.skipped ? item : { ...item, readyAt: Math.max(current, item.readyAt - extraElapsed) }))
      }
      previous = current
      setNow(current)
    }, 1000)
    return () => clearInterval(timer)
  }, [hydrated, items.length, devFastForward])

  const addItem = useCallback((id, durationHours, product) => {
    const productId = Number(id)
    const hours = Number(durationHours)
    if (!Number.isInteger(productId) || productId < 1 || !Number.isFinite(hours) || hours < 1 || hours > 168) return
    const timestamp = Date.now()
    setNow(timestamp)
    setItems((previous) => previous.some((item) => item.productId === productId) ? previous : [
      ...previous, { productId, addedAt: timestamp, readyAt: timestamp + hours * 3600000, skipped: false, product: productSnapshot(product) },
    ])
  }, [])

  const removeItem = useCallback((id) => setItems((previous) => previous.filter((item) => item.productId !== Number(id))), [])

  const skipItem = useCallback((id, product) => {
    const productId = Number(id)
    if (!Number.isInteger(productId) || productId < 1) return
    const timestamp = Date.now()
    setNow(timestamp)
    setItems((previous) => previous.some((item) => item.productId === productId)
      ? previous.map((item) => item.productId === productId ? { ...item, readyAt: timestamp, skipped: true } : item)
      : [...previous, { productId, addedAt: timestamp, readyAt: timestamp, skipped: true, product: productSnapshot(product) }])
  }, [])

  const has = useCallback((id) => items.some((item) => item.productId === Number(id)), [items])
  const readyItems = useMemo(() => items.filter((item) => item.skipped || item.readyAt <= now), [items, now])
  const value = { sessionId, items, readyItems, addItem, removeItem, skipItem, has, hydrated, now, devFastForward, setDevFastForward }

  return <PauseCartContext.Provider value={value}>{children}</PauseCartContext.Provider>
}

export function usePauseCart() {
  const context = useContext(PauseCartContext)
  if (!context) throw new Error('usePauseCart must be used within a PauseCartProvider')
  return context
}
