'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function ErrorBoundary({ error, reset }) {
  useEffect(() => {
    console.error('Captured error in ErrorBoundary:', error)
  }, [error])

  return (
    <section className="mx-auto max-w-2xl py-16 text-center sm:py-24" aria-labelledby="error-heading">
      <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-[#E8E8EC] bg-white text-[#6B6B6B]" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 4H6a2 2 0 0 0-2 2v2M16 4h2a2 2 0 0 1 2 2v2M4 16v2a2 2 0 0 0 2 2h2M20 16v2a2 2 0 0 1-2 2h-2M12 8v5M12 16h.01" strokeLinecap="round" /></svg>
      </div>
      <p className="eyebrow mb-4">LET’S TAKE A MOMENT</p>
      <h1 id="error-heading" className="page-heading">ขอพักสักครู่.</h1>
      <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#6B6B6B]">เรายังโหลดหน้านี้ไม่ได้ในตอนนี้<br />ลองอีกครั้ง หรือกลับไปเริ่มต้นที่หน้าแรกได้เลย</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={reset} className="button-primary">ลองใหม่อีกครั้ง <span aria-hidden="true">↻</span></button>
        <Link href="/" className="button-secondary">กลับหน้าแรก</Link>
      </div>
    </section>
  )
}