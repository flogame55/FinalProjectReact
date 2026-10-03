'use client'

// 👤 พี — app/error.jsx (Error Boundary สำหรับจัดการข้อผิดพลาดระดับหน้าจอ)
import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Page error captured:', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
      <span className="text-5xl">⚠️</span>
      <h2 className="text-xl font-bold text-slate-900">เกิดข้อผิดพลาดในการโหลดข้อมูล</h2>
      <p className="text-xs text-rose-600 max-w-md">{error?.message || 'เกิดข้อผิดพลาดไม่ทราบสาเหตุ'}</p>
      <div className="pt-2">
        <button
          onClick={() => reset()}
          className="rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
        >
          ลองใหม่อีกครั้ง
        </button>
      </div>
    </div>
  )
}
