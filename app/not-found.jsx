// ============================================================================
// 👤 พี — app/not-found.jsx (หน้า 404 เมื่อไม่พบหน้าหรือสินค้า)
// ============================================================================
// หน้าที่: แสดงข้อความแจ้งเตือนเมื่อ URL ไม่ถูกต้อง หรือหาสินค้าไม่พบ
//
// 📋 TODO สำหรับพี:
// 1. [ ] ออกแบบหน้า 404 ตามมาตรฐาน genesis-DESIGN.md:
//        - Typography: DM Sans, Heading bold letter-spacing -0.03em
//        - หัวข้อใหญ่ "404" (`text-4xl font-extrabold text-[#0A0A0A]`)
//        - คำอธิบายย่อย: สี `#6B6B6B`
//        - ปุ่ม "← กลับหน้าแรก": ลิงก์กลับไป "/" (`rounded-[6px] bg-[#6366F1] hover:bg-[#4F46E5] text-white px-4 py-2 text-sm font-medium`)
// ============================================================================

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="py-20 text-center space-y-4">
      {/* 
        TODO (พี): ออกแบบหน้า 404 ให้สวยงามตาม genesis-DESIGN.md
        - ไอคอน หรือ ตัวเลข 404
        - ข้อความแจ้งว่าไม่พบหน้าหรือสินค้า
        - ปุ่มกดกลับหน้าแรก (Link ไป '/')
      */}
      <h1 className="text-4xl font-bold text-[#0A0A0A]">404</h1>
      <p className="text-sm text-[#6B6B6B]">ไม่พบหน้าที่คุณต้องการ</p>
      <div>
        <Link href="/" className="text-xs text-[#6366F1] underline">
          ← กลับหน้าแรก
        </Link>
      </div>
    </div>
  )
}
