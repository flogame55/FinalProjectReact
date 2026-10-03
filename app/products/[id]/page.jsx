// ============================================================================
// 👤 พี — app/products/[id]/page.jsx
// ============================================================================
// หน้าที่: หน้ารายละเอียดสินค้าเชิงลึก + วางคอมโพเนนต์ PauseButton
//
// 📋 TODO สำหรับพี:
// 1. [ ] อ่าน route parameter `id` ด้วย `params` ฝั่ง Server Component
// 2. [ ] เรียก `getProductById(id)` เพื่อดึงข้อมูลสินค้า
// 3. [ ] หากไม่พบสินค้า ให้เรียก `notFound()` เพื่อพาไปหน้า 404
// 4. [ ] วางคอมโพเนนต์ `<PauseButton productId={product.id} />`
// 5. [ ] ออกแบบ UI ตาม genesis-DESIGN.md:
//        - การ์ดครอบ: surface #FFFFFF, border 1px #E8E8EC, radius 12px
//        - Typography: Heading bold letter-spacing -0.03em
// ============================================================================

import { getProductById } from '@/lib/products'
import { notFound } from 'next/navigation'
import PauseButton from '@/components/PauseButton'
import Link from 'next/link'

export default async function ProductDetailPage({ params }) {
  // TODO (พี): ดึงข้อมูลสินค้าตาม dynamic id
  const resolvedParams = await params
  const id = resolvedParams?.id
  const product = await getProductById(id)

  if (!product) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <Link
        href="/products"
        className="inline-flex items-center text-xs font-semibold text-[#6B6B6B] hover:text-[#0A0A0A]"
      >
        ← กลับไปหน้ารายการสินค้า
      </Link>

      <div className="overflow-hidden rounded-[12px] border border-[#E8E8EC] bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* รูปสินค้า */}
          <div className="aspect-square md:aspect-auto bg-slate-100 p-6 flex items-center justify-center">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="max-h-96 w-full object-contain rounded-[8px]"
            />
          </div>

          {/* รายละเอียดสินค้า */}
          <div className="flex flex-col justify-between p-6 sm:p-8 space-y-6">
            <div className="space-y-3">
              <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-[#6B6B6B] uppercase tracking-wide">
                {product.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#0A0A0A] leading-tight">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-[#0A0A0A]">
                ฿{product.price.toLocaleString()}
              </p>
              <div className="pt-2 border-t border-[#E8E8EC]">
                <h4 className="text-xs font-semibold text-[#0A0A0A] uppercase tracking-wider mb-1">
                  รายละเอียดสินค้า
                </h4>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>

            {/* TODO (พี): คอมโพเนนต์เลือกเวลาและปุ่ม Pause/Skip */}
            <div className="pt-4 border-t border-[#E8E8EC]">
              <PauseButton productId={product.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
