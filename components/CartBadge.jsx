'use client'

// ============================================================================
// 👤 พี — components/CartBadge.jsx
// ============================================================================
// หน้าที่: แสดงป้ายตัวเลขจำนวนสินค้าในตะกร้าพัก บน Navbar
//
// 📋 TODO สำหรับพี:
// 1. [ ] ดึงข้อมูลรายการสินค้าจาก `usePauseCart()` (ที่โฟเขียนไว้)
// 2. [ ] ตรวจสอบว่าถ้าไม่มีสินค้า (`count === 0`) ให้ไม่ต้องแสดงอะไร (return null)
// 3. [ ] ถ้ามีสินค้า ให้แสดงตัวเลข count เช่น "2"
// 4. [ ] สไตล์ตาม genesis-DESIGN.md:
//        - ป้าย Badge/Tag: Pill shape (`rounded-full`), ขนาดเล็ก (`text-[10px] font-bold`)
//        - สี: พื้นหลัง Indigo (`bg-[#6366F1]`) ตัวอักษรสีขาว หรือ Warm Accent
// ============================================================================

import { usePauseCart } from '@/context/PauseCartContext'

export default function CartBadge() {
  const { items = [] } = usePauseCart() || {}
  const count = items.length

  // TODO (พี): ถ้าไม่มีสินค้าในตะกร้า ให้ซ่อน Badge
  if (!count) return null

  // TODO (พี): ออกแบบ Badge ตาม genesis-DESIGN.md
  return (
    <span className="inline-flex items-center justify-center rounded-full bg-[#6366F1] px-1.5 py-0.5 text-[10px] font-bold text-white leading-none">
      {count}
    </span>
  )
}
