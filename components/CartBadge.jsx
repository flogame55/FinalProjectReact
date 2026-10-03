'use client'

// ============================================================================
// 👤 พี — components/CartBadge.jsx
// ============================================================================
// หน้าที่: แสดงป้ายตัวเลขจำนวนสินค้าในตะกร้าพัก บน Navbar
//
// 📋 TODO สำหรับพี:
// 1. [ ] ดึงข้อมูลรายการสินค้าจาก `usePauseCart()`:
//        `const { items = [] } = usePauseCart() || {}`
//        `const count = items.length`
// 2. [ ] ตรวจสอบว่าถ้าไม่มีสินค้า (`count === 0`) ให้ซ่อน (return null)
// 3. [ ] สไตล์ตาม genesis-DESIGN.md:
//        - ป้ายทรงแคปซูล/วงกลม: `rounded-full bg-[#6366F1] px-1.5 py-0.5 text-[10px] font-bold text-white`
// ============================================================================

import { usePauseCart } from '@/context/PauseCartContext'

export default function CartBadge() {
  const { items = [] } = usePauseCart() || {}
  const count = items.length

  // TODO (พี): เขียนเงื่อนไขซ่อนเมื่อ count เป็น 0 และแสดงป้ายตัวเลข
  if (!count) return null

  return (
    <span className="rounded-full bg-[#6366F1] px-1.5 py-0.5 text-[10px] font-bold text-white">
      {count}
    </span>
  )
}
