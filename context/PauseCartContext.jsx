'use client'

// 👤 โฟ — PauseCartContext (Global State ตะกร้าพัก + localStorage sync + countdown + skip + dev fast-forward)
// Interface Contract:
//   items: CartItem[] -> [{ productId: number, addedAt: number, readyAt: number, skipped: boolean }]
//   addItem(productId: number, durationHours?: number)
//   removeItem(productId: number)
//   skipItem(productId: number) -> ตั้ง readyAt = now และ skipped = true ทันที
//   has(productId: number) -> boolean
//   readyItems: CartItem[] -> กรองเฉพาะที่ readyAt <= now
//   count: number -> จำนวนสินค้าในตะกร้าพัก
//   devFastForward: boolean, setDevFastForward(val: boolean)

import { createContext, useContext, useState, useEffect } from 'react'

const STORAGE_KEY = 'pause-cart'

const PauseCartContext = createContext(null)

export function PauseCartProvider({ children }) {
  const [items, setItems] = useState([])
  const [devFastForward, setDevFastForward] = useState(false)

  // อ่านจาก localStorage ตอน mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) setItems(parsed)
      }
    } catch (e) {
      console.error('Failed to parse pause-cart from localStorage', e)
    }
  }, [])

  // บันทึกลง localStorage เมื่อ items เปลี่ยน
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch (e) {
      console.error('Failed to save pause-cart to localStorage', e)
    }
  }, [items])

  const addItem = (productId, durationHours = 24) => {
    const now = Date.now()
    const durationMs = durationHours * 60 * 60 * 1000
    setItems((prev) => {
      if (prev.some((it) => it.productId === productId)) return prev
      return [
        ...prev,
        {
          productId,
          addedAt: now,
          readyAt: now + durationMs,
          skipped: false,
        },
      ]
    })
  }

  const removeItem = (productId) => {
    setItems((prev) => prev.filter((it) => it.productId !== productId))
  }

  const skipItem = (productId) => {
    const now = Date.now()
    setItems((prev) =>
      prev.map((it) =>
        it.productId === productId ? { ...it, readyAt: now, skipped: true } : it
      )
    )
  }

  const has = (productId) => items.some((it) => it.productId === productId)

  const count = items.length
  const now = Date.now()
  const readyItems = items.filter((it) => it.readyAt <= now || it.skipped)

  return (
    <PauseCartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        skipItem,
        has,
        readyItems,
        count,
        devFastForward,
        setDevFastForward,
      }}
    >
      {children}
    </PauseCartContext.Provider>
  )
}

export function usePauseCart() {
  const ctx = useContext(PauseCartContext)
  if (!ctx) {
    throw new Error('usePauseCart must be used within PauseCartProvider')
  }
  return ctx
}
