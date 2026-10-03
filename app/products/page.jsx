// ============================================================================
// 👤 กิต — app/products/page.jsx
// ============================================================================
// หน้าที่: หน้ารายการสินค้าทั้งหมด พร้อมระบบค้นหาและตัวกรองหมวดหมู่ (Server Component)
//
// 📋 TODO สำหรับกิต:
// 1. [ ] อ่าน query parameters จาก URL:
//        `const resolvedParams = await searchParams`
//        `const q = resolvedParams?.q || ''`
//        `const category = resolvedParams?.category || ''`
// 2. [ ] เรียก `getProducts({ q, category })` จาก lib/products.js
// 3. [ ] นำคอมโพเนนต์ `<SearchFilter />` มาวางด้านบน
// 4. [ ] แสดงผลลัพธ์สินค้า:
//        - กรณีไม่พบสินค้า: แสดงกล่อง Empty State (`rounded-[12px] border border-dashed border-[#E8E8EC] p-8 text-center`)
//        - กรณีพบสินค้า: แสดง Grid ของ `<ProductCard product={p} />`
//          ด้วยคลาส `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6`
// ============================================================================

import SearchFilter from '@/components/SearchFilter'
import ProductCard from '@/components/ProductCard'
import { getProducts } from '@/lib/products'

export default async function ProductsPage({ searchParams }) {
  // TODO (กิต): อ่าน searchParams จาก URL
  const resolvedParams = await searchParams
  const q = resolvedParams?.q || ''
  const category = resolvedParams?.category || ''

  const products = await getProducts({ q, category })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0A0A0A]">สินค้าทั้งหมด</h1>
        <p className="text-xs text-[#6B6B6B]">
          เลือกสินค้าที่คุณสนใจเพื่อเข้าสู่กระบวนการพักคิด (Cooling-off Cart)
        </p>
      </div>

      {/* แถบค้นหาและตัวกรอง */}
      <SearchFilter />

      {/* 
        TODO (กิต): วนลูปแสดงสินค้าด้วย Grid ของ <ProductCard /> 
        หรือแสดงกล่องแจ้งเตือนเมื่อค้นหาไม่พบ (Empty State)
      */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
