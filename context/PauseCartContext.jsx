'use client'

// ============================================================================
// 👤 โฟ — context/PauseCartContext.jsx
// ============================================================================
// หน้าที่: จัดการ Global State ของ "ตะกร้าพัก" (Cooling-off Cart) ซิงก์กับ localStorage
//
// 📋 TODO สำหรับโฟ:
// 1. [ ] สร้าง State:
//        - `const [items, setItems] = useState([])`
//        - `const [devFastForward, setDevFastForward] = useState(false)`
//        (โครงสร้างไอเทม: `{ productId: number, addedAt: number, readyAt: number, skipped: boolean }`)
// 2. [ ] ซิงก์กับ Browser `localStorage` (key: "pause-cart"):
//        - โหลดครั้งแรกตอน mount:
//          ```javascript
//          useEffect(() => {
//            try {
//              const stored = localStorage.getItem('pause-cart')
//              if (stored) setItems(JSON.parse(stored))
//            } catch (e) {
//              console.error(e)
//            }
//          }, [])
//          ```
//        - เซฟอัตโนมัติเมื่อ items เปลี่ยน:
//          ```javascript
//          useEffect(() => {
//            try {
//              localStorage.setItem('pause-cart', JSON.stringify(items))
//            } catch (e) {
//              console.error(e)
//            }
//          }, [items])
//          ```
// 3. [ ] ฟังก์ชัน `addItem(productId, durationHours)`:
//        - คำนวณ `readyAt = Date.now() + (durationHours * 3600 * 1000)`
//        - เพิ่มเข้า items ถ้ายังไม่มีสินค้านี้
// 4. [ ] ฟังก์ชัน `removeItem(productId)`:
//        - กรองไอเทมที่ไม่ตรงกับ productId ออก: `setItems(prev => prev.filter(...))`
// 5. [ ] ฟังก์ชัน `skipItem(productId)`:
//        - ตั้งค่า `readyAt = Date.now()` และ `skipped = true`
// 6. [ ] ตัวแปรคำนวณ `readyItems`:
//        - `items.filter(it => it.skipped || (it.readyAt && it.readyAt <= Date.now()))`
// ============================================================================

import { createContext, useContext, useState, useEffect } from 'react'

const STORAGE_KEY = 'pause-cart'
const PauseCartContext = createContext(null)

export function PauseCartProvider({ children }) {
  // TODO (โฟ): สร้าง state items และ devFastForward

  // TODO (โฟ): เขียน useEffect ซิงก์ข้อมูลเข้า-ออกจาก localStorage

  // TODO (โฟ): เขียนฟังก์ชัน addItem, removeItem, skipItem, has, readyItems
  const items = []
  const readyItems = []
  const addItem = (productId, durationHours) => {}
  const removeItem = (productId) => {}
  const skipItem = (productId) => {}
  const has = (productId) => false
  const devFastForward = false
  const setDevFastForward = () => {}

  const value = {
    items,
    readyItems,
    addItem,
    removeItem,
    skipItem,
    has,
    devFastForward,
    setDevFastForward,
  }

  return (
    <PauseCartContext.Provider value={value}>
      {children}
    </PauseCartContext.Provider>
  )
}

export function usePauseCart() {
  const context = useContext(PauseCartContext)
  if (!context) {
    throw new Error('usePauseCart must be used within a PauseCartProvider')
  }
  return context
}
