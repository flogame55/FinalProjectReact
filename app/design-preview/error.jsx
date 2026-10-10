'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DesignPreviewError({ reset }) {
  const direction = usePathname()?.split('/')[2]
  const theme = ['digital', 'luxury', 'calm'].includes(direction) ? direction : 'calm'
  return (
    <div className={`design-preview-shell preview-${theme}`}>
      <section className="preview-failure" role="alert">
        <p className="preview-eyebrow">DESIGN STUDY · CONNECTION INTERRUPTED</p>
        <h1>เปิดข้อมูลตัวอย่างไม่ได้</h1>
        <p>ลองโหลดหน้านี้ใหม่ หรือลองเลือกแนวทางอื่นได้ ข้อมูลร้านจริงยังอยู่เหมือนเดิม</p>
        <div><button type="button" className="preview-primary" onClick={() => reset()}>ลองอีกครั้ง ↻</button><Link className="preview-text-link" href="/design-preview">กลับไปเลือกดีไซน์</Link></div>
      </section>
    </div>
  )
}
