import Link from 'next/link'

const concepts = [
  { id: 'digital', number: '01', name: 'เท่และล้ำสมัย', en: 'FUTURE / DIGITAL', note: 'Midnight studio · electric cyan · data-led flow', className: 'preview-hub-digital' },
  { id: 'luxury', number: '02', name: 'หรูหราและมีรสนิยม', en: 'LUXURY / EDITORIAL', note: 'Warm paper · antique gold · considered detail', className: 'preview-hub-luxury' },
  { id: 'calm', number: '03', name: 'เรียบง่ายและสงบ', en: 'CALM / MINIMAL', note: 'Quiet space · clear choices · gentle motion', className: 'preview-hub-calm' },
]

export const metadata = { title: 'Design studies — Pause' }

export default function DesignPreviewHub() {
  return (
    <div className="design-preview-shell design-preview-hub">
      <div className="preview-hub-top"><Link href="/" className="preview-brand">pause<span>.</span></Link><span>DESIGN STUDY · 2026</span></div>
      <header className="preview-hub-intro"><p className="preview-eyebrow">THREE DISTINCT DIRECTIONS</p><h1>ให้เวลา<br />กับการออกแบบ</h1><p>สามแนวทางสำหรับประสบการณ์เดียวกัน—เลือกดูทีละแบบ แล้วทดลองเส้นทางใช้งานจริงของ Pause</p></header>
      <div className="preview-hub-grid">
        {concepts.map((concept) => (
          <Link key={concept.id} href={`/design-preview/${concept.id}`} className={`preview-hub-card ${concept.className}`}>
            <div className="preview-hub-art" aria-hidden="true"><span>{concept.number}</span><i /><b>pause.</b></div>
            <div className="preview-hub-copy"><p className="preview-eyebrow">{concept.en}</p><h2>{concept.name}</h2><p>{concept.note}</p><span className="preview-hub-open">เปิดดูดีไซน์ <b aria-hidden="true">↗</b></span></div>
          </Link>
        ))}
      </div>
      <p className="preview-hub-note">พื้นที่ทดลองดีไซน์ · แคตตาล็อกอ่านจาก Supabase · ตะกร้าและประวัติจำลองแยกจากเว็บจริง</p>
    </div>
  )
}
