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
//        - Font: DM Sans, ขนาด 14px (`text-sm font-medium`), สี `#6B6B6B`
//        - Hover state: เปลี่ยนสีเป็น `#0A0A0A` หรือไฮไลต์พื้นหลังเบาๆ
// 2. [ ] ใส่ลิงก์นำทาง 5 เส้นทาง:
//        - โลโก้ Pause -> "/"
//        - "สินค้าทั้งหมด" -> "/products"
//        - "ตะกร้าพัก" -> "/cart" (วางคอมโพเนนต์ `<CartBadge />` ด้านข้าง)
//        - "พร้อมตัดสินใจ" -> "/ready"
//        - "สถิติ" -> "/history"
// ============================================================================

import Link from 'next/link'
import CartBadge from './CartBadge'

export default function Nav() {
  // TODO (พี): จัด Layout Navbar และสไตล์ตาม genesis-DESIGN.md
  return (
    <header className="sticky top-0 z-50 h-[56px] border-b border-[#E8E8EC] bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* โลโก้ Pause */}
        <Link href="/" className="font-bold text-lg text-[#0A0A0A]">
          ⏸ Pause
        </Link>

        {/* TODO (พี): ตกแต่งแถบเมนูลิงก์ 4 หน้า + CartBadge */}
        <nav className="flex items-center gap-4 text-sm font-medium text-[#6B6B6B]">
          <Link href="/products" className="hover:text-[#0A0A0A] transition">
            สินค้าทั้งหมด
          </Link>
          <Link href="/cart" className="inline-flex items-center gap-1.5 hover:text-[#0A0A0A] transition">
            ตะกร้าพัก
            <CartBadge />
          </Link>
          <Link href="/ready" className="hover:text-[#0A0A0A] transition">
            พร้อมตัดสินใจ
          </Link>
          <Link href="/history" className="hover:text-[#0A0A0A] transition">
            สถิติ
          </Link>
        </nav>
      </div>
    </header>
  )
}
