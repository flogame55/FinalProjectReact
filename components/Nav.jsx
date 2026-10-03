// ============================================================================
// 👤 พี — components/Nav.jsx
// ============================================================================
// หน้าที่: แถบนำทางหลัก (Navbar) ของทั้งเว็บไซต์
//
// 📋 TODO สำหรับพี:
// 1. [ ] วางลิงก์ไปยัง 5 หน้าหลัก:
//        - หน้าแรก (`/`)
//        - สินค้าทั้งหมด (`/products`)
//        - ตะกร้าพัก (`/cart`) พร้อม `<CartBadge />`
//        - พร้อมตัดสินใจ (`/ready`)
//        - สถิติ (`/history`)
// 2. [ ] ออกแบบ Navbar ตามมาตรฐาน genesis-DESIGN.md:
//        - ตำแหน่ง: Sticky Top (`sticky top-0 z-50`)
//        - พื้นหลัง: Backdrop-blur (`bg-white/80 backdrop-blur-md`)
//        - ความสูง: 56px (`h-[56px]`)
//        - เส้นขอบล่าง: 1px subtle border (`border-b border-[#E8E8EC]`)
//        - ลิงก์: 14px medium weight (`text-sm font-medium`), hover เปลี่ยนสี/พื้นหลัง
// ============================================================================

import Link from 'next/link'
import CartBadge from './CartBadge'

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 h-[56px] border-b border-[#E8E8EC] bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* โลโก้ */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-[#0A0A0A]">
            ⏸ Pause
          </span>
        </Link>

        {/* TODO (พี): จัดแต่งแถบลิงก์และสถานะ Active */}
        <nav className="flex items-center gap-1 sm:gap-2 text-sm font-medium text-[#6B6B6B]">
          <Link
            href="/products"
            className="rounded-[6px] px-3 py-1.5 transition hover:bg-slate-100 hover:text-[#0A0A0A]"
          >
            สินค้าทั้งหมด
          </Link>
          <Link
            href="/cart"
            className="inline-flex items-center rounded-[6px] px-3 py-1.5 transition hover:bg-slate-100 hover:text-[#0A0A0A]"
          >
            ตะกร้าพัก
            <CartBadge />
          </Link>
          <Link
            href="/ready"
            className="rounded-[6px] px-3 py-1.5 transition hover:bg-slate-100 hover:text-[#0A0A0A]"
          >
            พร้อมตัดสินใจ
          </Link>
          <Link
            href="/history"
            className="rounded-[6px] px-3 py-1.5 transition hover:bg-slate-100 hover:text-[#0A0A0A]"
          >
            สถิติ
          </Link>
        </nav>
      </div>
    </header>
  )
}
