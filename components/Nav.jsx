// 👤 พี — Nav (แถบนำทางหลัก มีลิงก์ไปยัง 5 เส้นทาง + แสดง CartBadge)
import Link from 'next/link'
import CartBadge from './CartBadge'

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tight text-slate-900">
            ⏸ Pause
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2 text-sm font-medium text-slate-600">
          <Link
            href="/products"
            className="rounded-lg px-3 py-1.5 transition hover:bg-slate-100 hover:text-slate-900"
          >
            สินค้าทั้งหมด
          </Link>
          <Link
            href="/cart"
            className="inline-flex items-center rounded-lg px-3 py-1.5 transition hover:bg-slate-100 hover:text-slate-900"
          >
            ตะกร้าพัก
            <CartBadge />
          </Link>
          <Link
            href="/ready"
            className="rounded-lg px-3 py-1.5 transition hover:bg-slate-100 hover:text-slate-900"
          >
            พร้อมตัดสินใจ
          </Link>
          <Link
            href="/history"
            className="rounded-lg px-3 py-1.5 transition hover:bg-slate-100 hover:text-slate-900"
          >
            สถิติ
          </Link>
        </nav>
      </div>
    </header>
  )
}
