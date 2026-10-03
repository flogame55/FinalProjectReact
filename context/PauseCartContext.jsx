'use client'

// ============================================================================
// 👤 โฟ — context/PauseCartContext.jsx
// ============================================================================
// หน้าที่: จัดการ Global State ของ "ตะกร้าพัก" (Cooling-off Cart) เชื่อมต่อกับ localStorage
//
// 📋 TODO สำหรับโฟ:
// 1. [ ] จัดการ state `items` เก็บรายการสินค้าในตะกร้าพัก
//        โครงสร้างไอเทม: { productId: number, addedAt: number, readyAt: number, skipped: boolean }
// 2. [ ] ซิงก์ข้อมูลกับ browser `localStorage` (key: "pause-cart") ทั้งตอนโหลดครั้งแรกและตอน state เปลี่ยน
// 3. [ ] จัดการ Error กรณี localStorage เสียหาย (ห้ามหน้าจอขาว)
// 4. [ ] ฟังก์ชัน `addItem(productId, durationHours)`:
//        - คำนวณ readyAt = now + (durationHours * 3600 * 1000)
//        - ป้องกันการเพิ่มสินค้าซ้ำ
// 5. [ ] ฟังก์ชัน `removeItem(productId)`: ลบสินค้าออกจากตะกร้า
// 6. [ ] ฟังก์ชัน `skipItem(productId)`: ตั้ง readyAt = now และ skipped = true ทันที
// 7. [ ] คำนวณ `readyItems`: กรองเฉพาะไอเทมที่ readyAt <= now หรือ skipped === true (คำนวณตอน render)
// 8. [ ] สวิตช์ `devFastForward`: สำหรับเร่งเวลานับถอยหลังในการนำเสนอ (เช่น 1 ชม. -> 1 วินาที)
// ============================================================================

import { createContext, useContext, useState, useEffect } from 'react'

const STORAGE_KEY = 'pause-cart'
const PauseCartContext = createContext(null)

export function PauseCartProvider({ children }) {
  // TODO (โฟ): ปรับปรุง state และ logic ตามข้อกำหนดด้านบน
  const [items, setItems] = useState([])
  const [devFastForward, setDevFastForward] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) setItems(parsed)
      }
    } catch (e) {
      console.error('TODO (โฟ): จัดการ error กรณี parse localStorage ล้มเหลว', e)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch (e) {
      console.error('TODO (โฟ): บันทึกลง localStorage', e)
    }
  }, [items])

  const addItem = (productId, durationHours = 24) => {
    // TODO (โฟ): คำนวณระยะเวลา และเพิ่มสินค้าเข้า items
    const now = Date.now()
    const durationMs = durationHours * 60 * 60 * 1000
    setItems((prev) => {
      if (prev.some((it) => it.productId === productId)) return prev
      return [...prev, { productId, addedAt: now, readyAt: now + durationMs, skipped: false }]
    })
  }

  const removeItem = (productId) => {
    // TODO (โฟ): นำ productId ออกจาก items
    setItems((prev) => prev.filter((it) => it.productId !== productId))
  }

  const skipItem = (productId) => {
    // TODO (โฟ): ปรับ readyAt ให้เป็นปัจจุบัน และตั้ง skipped = true
    const now = Date.now()
    setItems((prev) =>
      prev.map((it) => (it.productId === productId ? { ...it, readyAt: now, skipped: true } : it))
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
