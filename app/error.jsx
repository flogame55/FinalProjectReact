'use client'

// ============================================================================
// 👤 พี — app/error.jsx (Error Boundary สำหรับดักจับและแสดงข้อผิดพลาดของหน้า)
// ============================================================================
// 📋 TODO สำหรับพี:
// 1. [ ] รับ props `{ error, reset }` จาก Next.js
// 2. [ ] บันทึก log error ลง console
// 3. [ ] ออกแบบ UI แจ้งเตือนข้อผิดพลาดตาม genesis-DESIGN.md:
//        - ข้อความเตือนสีแดง Coral/Red (#EF4444)
//        - ปุ่ม "ลองใหม่อีกครั้ง" เรียก `reset()` สไตล์ Primary หรือ Secondary (radius 6px)
// ============================================================================

import { useEffect } from 'react'

export default function ErrorBoundary({ error, reset }) {
  useEffect(() => {
    // TODO (พี): จัดการ log error
    console.error('Captured error in ErrorBoundary:', error)
  }, [error])

  // TODO (พี): ออกแบบ UI แจ้งเตือน error ตาม genesis-DESIGN.md
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <span className="text-5xl mb-4">⚠️</span>
      <h2 className="text-xl font-bold text-[#0A0A0A]">เกิดข้อผิดพลาดในการโหลดข้อมูล</h2>
      <p className="mt-2 text-sm text-[#EF4444] max-w-md">
        {error?.message || 'เกิดข้อผิดพลาดไม่ทราบสาเหตุ'}
      </p>
      <div className="mt-6">
        {/* TODO (พี): ผูกปุ่ม reset เพื่อให้ผู้ใช้กดโหลดข้อมูลใหม่ได้ */}
        <button
          onClick={() => reset()}
          className="rounded-[6px] bg-[#6366F1] px-4 py-2 text-sm font-medium text-white hover:bg-[#4F46E5] transition"
        >
          ลองใหม่อีกครั้ง
        </button>
      </div>
    </div>
  )
}
