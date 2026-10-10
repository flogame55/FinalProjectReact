import './globals.css'
import Link from 'next/link'
import Nav from '@/components/Nav'
import { PauseCartProvider } from '@/context/PauseCartContext'

export const metadata = {
  title: { default: 'Pause — เลือกอย่างตั้งใจ', template: '%s · Pause' },
  description: 'ค้นพบของที่ชอบ ให้เวลากับตัวเอง แล้วเลือกสิ่งที่ต้องการจริง ๆ ด้วยตะกร้าพักของ Pause',
}

export default function RootLayout({ children }) {
  return (
    <html lang="th" data-scroll-behavior="smooth">
      <body className="flex min-h-screen flex-col antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:p-3">ข้ามไปเนื้อหาหลัก</a>
        <PauseCartProvider>
          <Nav />
          <main id="main-content" className="page-enter mx-auto w-full max-w-[1280px] flex-1 px-5 py-8 sm:px-8 sm:py-12">{children}</main>
          <footer className="mt-12 border-t border-[#E8E8EC] bg-white">
            <div className="mx-auto max-w-[1280px] px-5 py-10 sm:px-8">
              <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-start">
                <div>
                  <Link href="/" className="font-display text-3xl font-semibold tracking-[-.07em]">pause.</Link>
                  <p className="mt-3 text-xs leading-6 text-[#6B6B6B]">พื้นที่เล็ก ๆ ระหว่าง “อยากได้” กับ “ตัดสินใจ”<br />เลือกอย่างตั้งใจ ในจังหวะของคุณ</p>
                </div>
                <nav aria-label="เมนูท้ายหน้า" className="flex flex-wrap gap-x-8 gap-y-4 text-xs text-[#6B6B6B]">
                  <Link href="/products" className="hover:text-[#4F46E5]">เลือกดูสินค้า</Link>
                  <Link href="/cart" className="hover:text-[#4F46E5]">ตะกร้าพัก</Link>
                  <Link href="/history" className="hover:text-[#4F46E5]">บันทึกของคุณ</Link>
                </nav>
              </div>
              <div className="mt-8 flex flex-wrap justify-between gap-3 border-t border-[#E8E8EC] pt-5 text-[10px] text-[#85858d]">
                <p>© 2026 Pause · Final Project, DII CAMT</p><p>Made for more considered choices.</p>
              </div>
            </div>
          </footer>
        </PauseCartProvider>
      </body>
    </html>
  )
}
