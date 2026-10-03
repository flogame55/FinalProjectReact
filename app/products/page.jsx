// 👤 กิต — app/products/page.jsx (หน้ารายการสินค้าทั้งหมด ค้นหาตามชื่อและกรองตามหมวดหมู่)
import SearchFilter from '@/components/SearchFilter'
import ProductCard from '@/components/ProductCard'
import { getProducts } from '@/lib/products'

export default async function ProductsPage({ searchParams }) {
  const resolvedParams = await searchParams
  const q = resolvedParams?.q || ''
  const category = resolvedParams?.category || ''

  const products = await getProducts({ q, category })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">สินค้าทั้งหมด</h1>
        <p className="text-xs text-slate-500">
          ค้นหาและเลือกสินค้าที่สนใจเพื่อเข้าสู่กระบวนการ Cooling-off Cart
        </p>
      </div>

      <SearchFilter />

      {products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-3xl">🔍</p>
          <h3 className="mt-2 text-base font-bold text-slate-800">ไม่พบสินค้า</h3>
          <p className="mt-1 text-xs text-slate-500">
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
