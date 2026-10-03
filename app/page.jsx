// ============================================================================
// 👤 กิต — app/page.jsx
// ============================================================================
// หน้าที่: หน้าแรก Landing & Showcase สินค้าไฮไลต์
//
// 📋 TODO สำหรับกิต:
// 1. [ ] ออกแบบ Hero Section อธิบายคอนเซปต์ "Pause — ตะกร้าที่บังคับให้คิดก่อนซื้อ"
// 2. [ ] ดึงสินค้าแนะนำด้วย `getProducts()` ฝั่ง Server Component
// 3. [ ] นำ `<ProductCard />` มาแสดงใน Layout Grid
// 4. [ ] ตกแต่ง UI ตามมาตรฐาน genesis-DESIGN.md:
//        - Cards: surface #FFFFFF, border 1px #E8E8EC, radius 12px
//        - Typography: Heading bold letter-spacing -0.03em
//        - ปุ่ม: radius 6px, สี Indigo (#6366F1)
// ============================================================================

import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { getProducts } from '@/lib/products'

export default async function HomePage() {
  // TODO (กิต): ดึงข้อมูลสินค้าแนะนำ
  const products = await getProducts()
  const featured = products.slice(0, 3)

  return (
    <div className="space-y-10 py-4">
      {/* TODO (กิต): ออกแบบ Hero Section ตาม genesis-DESIGN.md */}
      <section className="rounded-[12px] border border-[#E8E8EC] bg-white p-8">
        <h1 className="text-3xl font-bold text-[#0A0A0A]">
          Pause — ตะกร้าที่บังคับให้คิดก่อนซื้อ
        </h1>
        <p className="mt-2 text-sm text-[#6B6B6B]">
          Friction is friend: ระบบช้อปปิ้งที่ช่วยชะลอการตัดสินใจเพื่อลด Impulse Buying
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            href="/products"
            className="rounded-[6px] bg-[#6366F1] px-4 py-2 text-sm font-medium text-white hover:bg-[#4F46E5] transition"
          >
            ดูสินค้าทั้งหมด →
          </Link>
        </div>
      </section>

      {/* TODO (กิต): แสดงสินค้าแนะนำด้วย ProductCard */}
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
