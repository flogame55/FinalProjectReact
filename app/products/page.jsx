// ============================================================================
// 👤 กิต — app/products/page.jsx
// ============================================================================
// หน้าที่: หน้ารายการสินค้าทั้งหมด พร้อมระบบค้นหาและตัวกรองหมวดหมู่
//
// 📋 TODO สำหรับกิต:
// 1. [ ] รับ `searchParams` ({ q, category }) จาก URL ฝั่ง Server Component
// 2. [ ] เรียก `getProducts({ q, category })` เพื่อดึงสินค้าที่ตรงกับเงื่อนไข
// 3. [ ] นำ `<SearchFilter />` มาวางด้านบน
// 4. [ ] นำ `<ProductCard />` มา map แสดงผลใน Responsive Grid (1 col mobile, 2 tablet, 3 desktop)
// 5. [ ] แสดง Empty State เมื่อไม่พบสินค้าที่ตรงกับการค้นหา
// 6. [ ] ออกแบบ UI ตาม genesis-DESIGN.md:
//        - Container max width 1280px (หรือ max-w-5xl)
//        - Grid gap: 20px–24px (gap-6)
// ============================================================================

import SearchFilter from '@/components/SearchFilter'
import ProductCard from '@/components/ProductCard'
import { getProducts } from '@/lib/products'

export default async function ProductsPage({ searchParams }) {
  // TODO (กิต): อ่าน query params จาก URL
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

      {/* แถบค้นหาและตัวกรอง */}
      <SearchFilter />

      {/* TODO (กิต): แสดงรายการสินค้า หรือ Empty State */}
      {products.length === 0 ? (
        <div className="rounded-[12px] border border-dashed border-[#E8E8EC] bg-white p-12 text-center">
          <p className="text-3xl">🔍</p>
          <h3 className="mt-2 text-base font-bold text-[#0A0A0A]">ไม่พบสินค้า</h3>
          <p className="mt-1 text-xs text-[#6B6B6B]">
            ลองปรับเปลี่ยนคำค้นหาหรือเลือกหมวดหมู่อื่น
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
