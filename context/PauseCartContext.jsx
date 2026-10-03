'use client'

// ============================================================================
// 👤 โฟ — context/PauseCartContext.jsx
// ============================================================================
// หน้าที่: จัดการ Global State ของ "ตะกร้าพัก" (Cooling-off Cart) ซิงก์กับ localStorage
//
// 📋 TODO สำหรับโฟ:
// 1. [ ] จัดการ state `items` เก็บรายการสินค้าในตะกร้าพัก
//        โครงสร้างไอเทม: { productId: number, addedAt: number, readyAt: number, skipped: boolean }
// 2. [ ] ซิงก์ข้อมูลกับ browser `localStorage` (key: "pause-cart")
//        - อ่านค่าเริ่มต้นจาก localStorage เมื่อคอมโพเนนต์ mount (useEffect)
//        - บันทึกลง localStorage เมื่อ items มีการเปลี่ยนแปลง
// 3. [ ] จัดการ try-catch ป้องกันแอปล่มกรณี localStorage เสียหาย
// 4. [ ] ฟังก์ชัน `addItem(productId, durationHours)`:
//        - คำนวณ readyAt = now + (durationHours * 3600 * 1000)
//        - ป้องกันการเพิ่มสินค้าเดิมซ้ำ
// 5. [ ] ฟังก์ชัน `removeItem(productId)`: ลบสินค้าออกจากตะกร้า
// 6. [ ] ฟังก์ชัน `skipItem(productId)`: ตั้ง readyAt = now และ skipped = true ทันที
// 7. [ ] คำนวณ `readyItems`: กรองเฉพาะไอเทมที่ readyAt <= now หรือ skipped === true
// 8. [ ] สวิตช์ `devFastForward`: สำหรับเร่งเวลานับถอยหลังในการนำเสนอ (เช่น 1 ชม. -> 1 วินาที)
// ============================================================================

import { createContext, useContext, useState, useEffect } from 'react'

const STORAGE_KEY = 'pause-cart'
const PauseCartContext = createContext(null)

export function PauseCartProvider({ children }) {
  // TODO (โฟ): สร้าง state items และ devFastForward
  const [items, setItems] = useState([])
  const [devFastForward, setDevFastForward] = useState(false)

  // TODO (โฟ): เขียน useEffect ซิงก์ข้อมูลเข้า-ออกจาก localStorage

  // TODO (โฟ): เขียนฟังก์ชัน addItem(productId, durationHours)
  const addItem = (productId, durationHours = 24) => {
    // โค้ดของโฟ
  }

  // TODO (โฟ): เขียนฟังก์ชัน removeItem(productId)
  const removeItem = (productId) => {
    // โค้ดของโฟ
  }

  // TODO (โฟ): เขียนฟังก์ชัน skipItem(productId)
  const skipItem = (productId) => {
    // โค้ดของโฟ
  }

  // TODO (โฟ): ฟังก์ชันตรวจสอบว่าสินค้านี้อยู่ในตะกร้าแล้วหรือไม่
  const has = (productId) => items.some((it) => it.productId === productId)

  // TODO (โฟ): คำนวณ readyItems (สินค้าที่ครบกำหนดเวลาแล้ว)
  const readyItems = items.filter((it) => it.skipped || (it.readyAt && it.readyAt <= Date.now()))

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
