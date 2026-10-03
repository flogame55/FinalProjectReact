'use client'

// ============================================================================
// 👤 โฟ — context/PauseCartContext.jsx
// ============================================================================
// หน้าที่: จัดการ Global State ของ "ตะกร้าพัก" (Cooling-off Cart) ซิงก์กับ localStorage + จัดการ sessionId
//
// 📋 TODO สำหรับโฟ:
// 1. [ ] จัดการ State `sessionId` เพื่อแยกผู้ใช้แต่ละคน (ไม่ให้สถิติปนกันบน Vercel):
//        - อ่านจาก localStorage ('pause-session-id')
//        - ถ้ายังไม่มี ให้สร้างด้วย `crypto.randomUUID()` แล้วบันทึกลง localStorage
//        - บันทึกลง Cookie ด้วย เพื่อให้ Server Component (หน้า /history) อ่านได้:
//          `document.cookie = 'pause-session-id=' + sid + '; path=/; max-age=31536000; SameSite=Lax'`
//
// 2. [ ] สร้าง State สำหรับตะกร้าพัก:
//        - `const [items, setItems] = useState([])`
//        - `const [devFastForward, setDevFastForward] = useState(false)`
//        (โครงสร้างไอเทม: `{ productId: number, addedAt: number, readyAt: number, skipped: boolean }`)
//
// 3. [ ] ซิงก์กับ Browser `localStorage` (key: "pause-cart"):
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
// 4. [ ] ฟังก์ชัน `addItem(productId, durationHours)`:
//        - คำนวณ `readyAt = Date.now() + (durationHours * 3600 * 1000)`
//        - เพิ่มเข้า items ถ้ายังไม่มีสินค้านี้
// 5. [ ] ฟังก์ชัน `removeItem(productId)`:
//        - กรองไอเทมที่ไม่ตรงกับ productId ออก: `setItems(prev => prev.filter(...))`
// 6. [ ] ฟังก์ชัน `skipItem(productId)`:
//        - ตั้งค่า `readyAt = Date.now()` และ `skipped = true`
// 7. [ ] ตัวแปรคำนวณ `readyItems`:
//        - `items.filter(it => it.skipped || (it.readyAt && it.readyAt <= Date.now()))`
// ============================================================================

import { createContext, useContext, useState, useEffect } from 'react'

const STORAGE_KEY = 'pause-cart'
const PauseCartContext = createContext(null)

export function PauseCartProvider({ children }) {
  // TODO (โฟ): สร้าง state sessionId, items, devFastForward
  const [sessionId, setSessionId] = useState('')

  // TODO (โฟ): เขียน useEffect สร้าง/อ่าน sessionId และซิงก์ข้อมูลเข้า-ออกจาก localStorage

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
    sessionId,
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
