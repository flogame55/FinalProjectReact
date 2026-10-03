// ============================================================================
// 👤 พี — app/not-found.jsx (หน้า 404 เมื่อไม่พบหน้าหรือสินค้า)
// ============================================================================
// 📋 TODO สำหรับพี:
// 1. [ ] ออกแบบหน้า 404 ตามมาตรฐาน genesis-DESIGN.md:
//        - Typography: DM Sans, Heading bold letter-spacing -0.03em
//        - ปุ่ม "กลับหน้าแรก": Primary Indigo (#6366F1), hover (#4F46E5), radius 6px
//        - พื้นหลัง: Clean Neutral #FAFAFA
// 2. [ ] มีข้อความแจ้งเตือนที่ชัดเจนเมื่อค้นหาไม่พบ หรือ URL ผิด
// 3. [ ] มีปุ่ม Link นำทางกลับสู่หน้าแรก ("/")
// ============================================================================

import Link from 'next/link'

export default function NotFound() {
  // TODO (พี): เขียน UI หน้า 404 ให้สวยงามตาม genesis-DESIGN.md
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <span className="text-5xl mb-4">⏸️</span>
      <h1 className="text-4xl font-extrabold text-[#0A0A0A] tracking-tight">404</h1>
      <h2 className="mt-2 text-lg font-semibold text-[#0A0A0A]">
        ไม่พบหน้าที่คุณต้องการ
      </h2>
      <p className="mt-1 text-sm text-[#6B6B6B] max-w-sm">
        หน้านี้อาจไม่มีอยู่ หรือสินค้าที่คุณค้นหาไม่มีในระบบ Pause
      </p>
      <div className="mt-6">
        {/* TODO (พี): ปรับปุ่มให้ตรงตามมาตรฐาน genesis-DESIGN.md (radius 6px, indigo #6366F1) */}
        <Link
          href="/"
          className="inline-flex items-center rounded-[6px] bg-[#6366F1] px-4 py-2 text-sm font-medium text-white hover:bg-[#4F46E5] transition"
        >
          ← กลับหน้าแรก
        </Link>
      </div>
    </div>
  )
}
