// ============================================================================
// 👤 พี — components/Nav.jsx
// ============================================================================
// หน้าที่: แถบนำทางหลัก (Navbar) ของทั้งเว็บไซต์
//
// 📋 TODO สำหรับพี:
// 1. [ ] ออกแบบ Navbar ตามมาตรฐาน genesis-DESIGN.md:
//        - ความสูง: 56px (`h-[56px]`)
//        - Sticky Top: `sticky top-0 z-50`
//        - พื้นหลัง: `bg-white/80 backdrop-blur-md`
//        - เส้นขอบล่าง: 1px border `border-b border-[#E8E8EC]`
//        - Typography: DM Sans, ขนาด 14px (`text-sm font-medium`), สี `#6B6B6B`
//        - ลิงก์ตอน hover: `hover:text-[#0A0A0A] hover:bg-slate-100 rounded-[6px] px-3 py-1.5 transition`
// 2. [ ] ใส่ลิงก์นำทาง 5 รายการ:
//        - โลโก้ Pause -> "/"
//        - "สินค้าทั้งหมด" -> "/products"
//        - "ตะกร้าพัก" -> "/cart" (วางคอมโพเนนต์ `<CartBadge />` ด้านข้าง)
//        - "พร้อมตัดสินใจ" -> "/ready"
//        - "สถิติ" -> "/history"
// ============================================================================

import Link from 'next/link'
import CartBadge from './CartBadge'

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 h-[56px] border-b border-[#E8E8EC] bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* โลโก้ Pause */}
        <Link href="/" className="font-bold text-lg text-[#0A0A0A]">
          ⏸ Pause
        </Link>

        {/* 
          TODO (พี): วางลิงก์นำทาง 4 เมนู 
          - /products
          - /cart (พร้อม <CartBadge />)
          - /ready
          - /history
        */}
        <nav className="flex items-center gap-2">
          {/* เขียนลิงก์ <Link> ต่างๆ ที่นี่ */}
        </nav>
      </div>
    </header>
  )
}
