// ============================================================================
// 👤 กิต — app/page.jsx
// ============================================================================
// หน้าที่: หน้าแรก Landing & Showcase สินค้าไฮไลต์
//
// 📋 TODO สำหรับกิต:
// 1. [ ] ออกแบบ Hero Section แนะนำแนวคิด "Pause" (Friction is friend)
// 2. [ ] ดึงรายการสินค้าแนะนำด้วย `getProducts()` ฝั่ง Server Component
// 3. [ ] นำคอมโพเนนต์ `<ProductCard />` มาจัดแสดงใน Grid (3–4 ชิ้น)
// 4. [ ] ตกแต่ง UI ตามมาตรฐาน genesis-DESIGN.md:
//        - Typography: Heading ตัวหนา letter-spacing -0.03em
//        - Primary Button: สี Indigo (#6366F1) hover (#4F46E5) radius 6px
//        - การเว้นระยะ (Spacing): Section spacing 48px - 64px
// ============================================================================

import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { getProducts } from '@/lib/products'

export default async function HomePage() {
  // TODO (กิต): ดึงสินค้ามาแสดงในหน้าแรก
  const products = await getProducts()
  const featured = products.slice(0, 3)

  return (
    <div className="space-y-12 py-4">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[12px] border border-[#E8E8EC] bg-white p-8 sm:p-12 shadow-xs">
        <div className="max-w-2xl space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-[#6366F1]">
            ⏳ Friction is friend · ซื้อของอย่างมีสติ
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0A0A0A]">
            Pause — ตะกร้าที่บังคับให้คิดก่อนซื้อ
          </h1>
          <p className="text-[#6B6B6B] text-sm sm:text-base leading-relaxed">
            ตัดปุ่ม "ซื้อทันที" เพื่อลด Impulse Buying
            เลือกสินค้าเข้าตะกร้าพักและกำหนดเวลานับถอยหลัง
            เมื่อครบเวลาค่อยถามใจตัวเองอีกครั้งว่ายังอยากได้อยู่จริงไหม
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rounded-[6px] bg-[#6366F1] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#4F46E5]"
            >
              เลือกดูสินค้าทั้งหมด →
            </Link>
            <Link
              href="/cart"
              className="rounded-[6px] border border-[#E8E8EC] bg-white px-5 py-2.5 text-sm font-medium text-[#0A0A0A] transition hover:bg-slate-50"
            >
              ดูตะกร้าพักของคุณ
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#0A0A0A]">สินค้าแนะนำ</h2>
            <p className="text-xs text-[#6B6B6B]">
              ทดลองเลือกสินค้าเพื่อเริ่มประสบการณ์ "หยุดคิดก่อนซื้อ"
            </p>
          </div>
          <Link
            href="/products"
            className="text-xs font-semibold text-[#6366F1] hover:underline"
          >
            ดูทั้งหมด ({products.length}) →
          </Link>
        </div>

        {/* TODO (กิต): Grid แสดงการ์ดสินค้า */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  )
}
