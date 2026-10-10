'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const PreviewContext = createContext(null)

export function DesignPreviewProvider({ direction, children }) {
  const cartKey = `pause-preview-cart-${direction}`
  const decisionKey = `pause-preview-decisions-${direction}`
  const [items, setItems] = useState([])
  const [decisions, setDecisions] = useState([])
  const [hydrated, setHydrated] = useState(false)
  const [now, setNow] = useState(0)
  const [devFastForward, setDevFastForward] = useState(false)

  useEffect(() => {
    try {
      const savedItems = JSON.parse(localStorage.getItem(cartKey) || '[]')
      const savedDecisions = JSON.parse(localStorage.getItem(decisionKey) || '[]')
      setItems(Array.isArray(savedItems) ? savedItems : [])
      setDecisions(Array.isArray(savedDecisions) ? savedDecisions : [])
    } catch {
      setItems([])
      setDecisions([])
    }
    setNow(Date.now())
    setHydrated(true)
  }, [cartKey, decisionKey])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(cartKey, JSON.stringify(items))
      localStorage.setItem(decisionKey, JSON.stringify(decisions))
    } catch {
      // Preview continues in memory if browser storage is unavailable.
    }
  }, [cartKey, decisionKey, decisions, hydrated, items])

  useEffect(() => {
    if (!hydrated || !items.length) return
    let previous = Date.now()
    const timer = setInterval(() => {
      const current = Date.now()
      if (devFastForward) {
        const accelerated = (current - previous) * 3599
        setItems((currentItems) => currentItems.map((item) => item.skipped ? item : { ...item, readyAt: Math.max(current, item.readyAt - accelerated) }))
      }
      previous = current
      setNow(current)
    }, 1000)
    return () => clearInterval(timer)
  }, [devFastForward, hydrated, items.length])

  const addItem = useCallback((productId, durationHours, product) => {
    const id = Number(productId)
    const hours = Number(durationHours)
    if (!Number.isInteger(id) || id < 1 || !Number.isFinite(hours) || hours < 1 || hours > 168) return
    const addedAt = Date.now()
    const durationMs = hours * 3600000
    setItems((currentItems) => currentItems.some((item) => item.productId === id) ? currentItems : [...currentItems, { productId: id, addedAt, readyAt: addedAt + durationMs, durationMs, skipped: false, product }])
    setNow(addedAt)
  }, [])

  const removeItem = useCallback((productId) => setItems((currentItems) => currentItems.filter((item) => item.productId !== Number(productId))), [])
  const skipItem = useCallback((productId, product) => {
    const id = Number(productId)
    const timestamp = Date.now()
    setNow(timestamp)
    setItems((currentItems) => currentItems.some((item) => item.productId === id)
      ? currentItems.map((item) => item.productId === id ? { ...item, readyAt: timestamp, skipped: true } : item)
      : [...currentItems, { productId: id, addedAt: timestamp, readyAt: timestamp, durationMs: 0, skipped: true, product }])
  }, [])
  const has = useCallback((productId) => items.some((item) => item.productId === Number(productId)), [items])
  const recordDecision = useCallback((decision) => setDecisions((current) => [{ ...decision, timestamp: new Date().toISOString() }, ...current]), [])
  const readyItems = useMemo(() => items.filter((item) => item.skipped || item.readyAt <= now), [items, now])
  const value = { items, decisions, readyItems, addItem, removeItem, skipItem, has, hydrated, now, devFastForward, setDevFastForward, recordDecision }

  return <PreviewContext.Provider value={value}>{children}</PreviewContext.Provider>
}

export function useDesignPreview() {
  const context = useContext(PreviewContext)
  if (!context) throw new Error('useDesignPreview must be used inside DesignPreviewProvider')
  return context
}
