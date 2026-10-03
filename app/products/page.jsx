// ============================================================================
// 👤 กิต — app/products/page.jsx
// ============================================================================
// หน้าที่: หน้ารายการสินค้าทั้งหมด พร้อมระบบค้นหาและตัวกรองหมวดหมู่
//
// 📋 TODO สำหรับกิต:
// 1. [ ] รับ `searchParams` ({ q, category }) จาก URL
// 2. [ ] เรียก `getProducts({ q, category })` เพื่อค้นหาสินค้า
// 3. [ ] นำ `<SearchFilter />` มาวางด้านบน
// 4. [ ] นำ `<ProductCard />` มา map แสดงในตารางกริด (Responsive Grid)
// 5. [ ] แสดง Empty State หากไม่พบสินค้าที่ตรงกับการค้นหา
// 6. [ ] ออกแบบ UI ตาม genesis-DESIGN.md
// ============================================================================

import SearchFilter from '@/components/SearchFilter'
import ProductCard from '@/components/ProductCard'
import { getProducts } from '@/lib/products'

export default async function ProductsPage({ searchParams }) {
  // TODO (กิต): อ่าน query params จาก URL (q, category)
  const resolvedParams = await searchParams
  const q = resolvedParams?.q || ''
  const category = resolvedParams?.category || ''

  const products = await getProducts({ q, category })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0A0A0A]">สินค้าทั้งหมด</h1>
        <p className="text-xs text-[#6B6B6B]">
          ค้นหาและเลือกสินค้าที่สนใจเพื่อเข้าสู่กระบวนการ Cooling-off Cart
        </p>
      </div>

      {/* TODO (กิต): วางคอมโพเนนต์ค้นหาและกรอง SearchFilter */}
      <SearchFilter />

      {/* TODO (กิต): แสดง Grid ของ ProductCard หรือแสดง Empty State หากไม่พบสินค้า */}
      {products.length === 0 ? (
        <div className="rounded-[12px] border border-dashed border-[#E8E8EC] p-8 text-center text-[#6B6B6B]">
          ไม่พบสินค้าที่ค้นหา
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
