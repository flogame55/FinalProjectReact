// ============================================================================
// 👤 กิต — app/page.jsx
// ============================================================================
// หน้าที่: หน้าแรก Landing & Showcase สินค้าไฮไลต์
//
// 📋 TODO สำหรับกิต:
// 1. [ ] ดึงข้อมูลสินค้าแนะนำ: `const products = await getProducts()`
// 2. [ ] ออกแบบ Hero Section ตามมาตรฐาน genesis-DESIGN.md:
//        - การ์ดครอบ Hero: `rounded-[12px] border border-[#E8E8EC] bg-white p-8 sm:p-12`
//        - หัวข้อใหญ่: `text-3xl sm:text-5xl font-bold tracking-tight text-[#0A0A0A]`
//        - คำบรรยายแนวคิด: อธิบายคอนเซปต์ "Friction is friend" ชะลอความอยากซื้อเพื่อลด Impulse Buying
//        - ปุ่ม CTA: ลิงก์ไป `/products` (`rounded-[6px] bg-[#6366F1] hover:bg-[#4F46E5] text-white px-5 py-2.5`)
// 3. [ ] นำคอมโพเนนต์ `<ProductCard />` มา map แสดงใน Responsive Grid (3-4 ชิ้น)
// ============================================================================

import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { getProducts } from '@/lib/products'

export default async function HomePage() {
  // TODO (กิต): เรียก getProducts() เพื่อดึงสินค้ามาแสดงในหน้าแรก
  const products = await getProducts()
  const featured = products.slice(0, 3)

  return (
    <div className="space-y-10 py-4">
      {/* 
        TODO (กิต): 
        1. ส่วน Hero Section แนะนำระบบ Pause และปุ่มพาไปเลือกดูสินค้า
        2. ส่วนแสดงสินค้าแนะนำด้วย Grid ของ <ProductCard />
      */}
      <section className="rounded-[12px] border border-[#E8E8EC] bg-white p-8">
        <h1 className="text-2xl font-bold text-[#0A0A0A]">Pause — ตะกร้าที่บังคับให้คิดก่อนซื้อ</h1>
        <p className="text-sm text-[#6B6B6B] mt-2">TODO: ออกแบบ Hero Section ตาม genesis-DESIGN.md</p>
        <div className="mt-4">
          <Link href="/products" className="text-xs text-[#6366F1] underline">ดูสินค้าทั้งหมด →</Link>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#0A0A0A]">สินค้าแนะนำ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  )
}
