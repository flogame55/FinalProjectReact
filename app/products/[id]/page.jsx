// ============================================================================
// 👤 พี — app/products/[id]/page.jsx
// ============================================================================
// หน้าที่: หน้ารายละเอียดสินค้าเชิงลึก + วางคอมโพเนนต์ PauseButton
//
// 📋 TODO สำหรับพี:
// 1. [ ] อ่าน route parameter `id` ด้วย `await params`
// 2. [ ] เรียก `getProductById(id)` เพื่อดึงข้อมูลสินค้า (ฟังก์ชันของกิต)
// 3. [ ] หากไม่พบสินค้า ให้เรียก `notFound()` เพื่อพาไปหน้า 404
// 4. [ ] วางคอมโพเนนต์ `<PauseButton productId={product.id} />`
// 5. [ ] ออกแบบ UI หน้ารายละเอียดตาม genesis-DESIGN.md:
//        - การ์ดครอบ: surface #FFFFFF, border 1px #E8E8EC, radius 12px
//        - Typography: Heading bold letter-spacing -0.03em
//        - รูปสินค้า: aspect-square หรือ 400px+
// ============================================================================

import { getProductById } from '@/lib/products'
import { notFound } from 'next/navigation'
import PauseButton from '@/components/PauseButton'
import Link from 'next/link'

export default async function ProductDetailPage({ params }) {
  // TODO (พี): ดึง id จาก params และดึงข้อมูลสินค้า
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

      {/* TODO (พี): ออกแบบ layout หน้ารายละเอียดสินค้าตาม genesis-DESIGN.md */}
      <div className="rounded-[12px] border border-[#E8E8EC] bg-white p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* รูปสินค้า */}
        <div className="bg-slate-100 rounded-[8px] flex items-center justify-center p-4">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="max-h-80 object-contain"
          />
        </div>

        {/* ข้อมูลสินค้า และปุ่ม Pause */}
        <div className="flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs uppercase tracking-wide text-[#6B6B6B]">
              {product.category}
            </span>
            <h1 className="text-2xl font-bold text-[#0A0A0A] mt-1">
              {product.name}
            </h1>
            <p className="text-2xl font-bold text-[#0A0A0A] mt-2">
              ฿{product.price?.toLocaleString()}
            </p>
            <p className="text-sm text-[#6B6B6B] mt-4">
              {product.description}
            </p>
          </div>

          {/* TODO (พี): วางคอมโพเนนต์ PauseButton */}
          <div className="pt-4 border-t border-[#E8E8EC]">
            <PauseButton productId={product.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
