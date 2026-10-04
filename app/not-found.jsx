import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl py-14 text-center sm:py-20" aria-labelledby="not-found-heading">
      <p className="mb-6 text-[88px] font-medium leading-none tracking-[-0.07em] text-[#DADADC] sm:text-[120px]" aria-hidden="true">404<span className="text-[#0A0A0A]">.</span></p>
      <p className="eyebrow mb-4">A SMALL DETOUR</p>
      <h1 id="not-found-heading" className="page-heading">หน้านี้อาจหลงทางไปหน่อย.</h1>
      <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#6B6B6B]">เราไม่พบหน้าหรือสินค้าที่คุณกำลังมองหา<br />ยังมีอีกหลายสิ่งให้คุณค่อย ๆ เลือกดู</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/products" className="button-primary">เลือกดูสินค้า <span aria-hidden="true">↗</span></Link>
        <Link href="/" className="button-secondary">กลับหน้าแรก</Link>
      </div>
    </section>
  )
}