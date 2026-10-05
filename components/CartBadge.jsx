'use client'

// ============================================================================
// 👤 พี — components/CartBadge.jsx
// ============================================================================
// หน้าที่: แสดงป้ายตัวเลขจำนวนสินค้าในตะกร้าพัก บน Navbar
// - นับจาก `items` ใน PauseCartContext จึงอัปเดตทันทีเมื่อเพิ่ม/ลบสินค้า
// - ซ่อนตัวเองเมื่อไม่มีสินค้า (count === 0)
// ============================================================================

import { usePauseCart } from '@/context/PauseCartContext'

export default function CartBadge() {
  const { items = [] } = usePauseCart() || {}
  const count = items.length

  if (!count) return null

  return (
    <span aria-label={`${count} รายการในตะกร้าพัก`} className="rounded-full bg-[#6366F1] px-1.5 py-0.5 text-[10px] font-bold tabular-nums text-white">
      {count}
    </span>
  )
}
