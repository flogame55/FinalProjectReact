'use client'

// 👤 พี — CartBadge (แสดงจำนวนสินค้าในตะกร้าพักที่ดึงมาจาก PauseCartContext)
import { usePauseCart } from '@/context/PauseCartContext'

export default function CartBadge() {
  const { count } = usePauseCart()

  if (count === 0) return null

  return (
    <span className="ml-1.5 inline-flex items-center justify-center rounded-full bg-amber-500 px-2 py-0.5 text-xs font-bold text-white">
      {count}
    </span>
  )
}
