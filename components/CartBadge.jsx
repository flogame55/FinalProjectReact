'use client'

// ============================================================================
// 👤 พี — components/CartBadge.jsx
// ============================================================================
// หน้าที่: แสดง Badge ตัวเลขจำนวนสินค้าที่กำลังพักอยู่ในตะกร้า (ดึงมาจาก PauseCartContext)
//
// 📋 TODO สำหรับพี:
// 1. [ ] อ่าน `count` จาก `usePauseCart()`
// 2. [ ] ถ้า `count === 0` ไม่ต้องเรนเดอร์ (return null)
// 3. [ ] สไตล์ตาม genesis-DESIGN.md:
//        - Badge: radius 9999px (rounded-full)
//        - สี: Primary Indigo (#6366F1) หรือ Warning Amber (#F59E0B)
// ============================================================================

import { usePauseCart } from '@/context/PauseCartContext'

export default function CartBadge() {
  const { count } = usePauseCart()

  if (count === 0) return null

  return (
    <span className="ml-1.5 inline-flex items-center justify-center rounded-full bg-[#6366F1] px-2 py-0.5 text-xs font-bold text-white">
      {count}
    </span>
  )
}
