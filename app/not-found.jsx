// 👤 พี — app/not-found.jsx (หน้า 404 เมื่อไม่พบหน้าหรือสินค้า)
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
      <span className="text-6xl">⏸️</span>
      <h1 className="text-4xl font-black text-slate-900">404</h1>
      <h2 className="text-lg font-bold text-slate-800">ไม่พบหน้าที่คุณต้องการ</h2>
      <p className="text-xs text-slate-500 max-w-sm">
        หน้านี้อาจถูกย้าย หรือสินค้าที่คุณค้นหาอาจไม่มีอยู่ในระบบ Pause
      </p>
      <div className="pt-2">
        <Link
          href="/"
          className="rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
        >
          ← กลับหน้าแรก
        </Link>
      </div>
    </div>
  )
}
