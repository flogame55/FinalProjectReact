// ============================================================================
// 👤 พี — app/products/[id]/page.jsx
// ============================================================================
// หน้าที่: หน้ารายละเอียดสินค้าเชิงลึก (Server Component) + วางคอมโพเนนต์ PauseButton
//
// 📋 TODO สำหรับพี:
// 1. [ ] อ่าน route parameter `id` ด้วย:
//        `const resolvedParams = await params`
//        `const id = resolvedParams?.id`
// 2. [ ] เรียก `getProductById(id)` (ฟังก์ชันที่โฟเขียนไว้ใน lib/products.js)
// 3. [ ] หากไม่พบสินค้า ให้เรียก `notFound()` เพื่อพาผู้ใช้ไปหน้า 404
// 4. [ ] ออกแบบ UI หน้ารายละเอียดตามมาตรฐาน genesis-DESIGN.md:
//        - การ์ดครอบ: `rounded-[12px] border border-[#E8E8EC] bg-white overflow-hidden`
//        - แบ่ง 2 ฝั่ง (Desktop): รูปสินค้าด้านซ้าย, ข้อมูลสินค้าด้านขวา
//        - Typography: Heading ชัดเจน (`text-2xl font-bold text-[#0A0A0A]`)
//        - ป้ายหมวดหมู่: `rounded-full bg-slate-100 px-3 py-1 text-xs text-[#6B6B6B]`
// 5. [ ] วางคอมโพเนนต์ `<PauseButton productId={product.id} />` ไว้ใต้รายละเอียดสินค้า
// ============================================================================

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProductById } from '@/lib/products'
import PauseButton from '@/components/PauseButton'

export default async function ProductDetailPage({ params }) {
  // TODO (พี): อ่าน id จาก params และดึงข้อมูลสินค้า
  const resolvedParams = await params
  const id = resolvedParams?.id
  const product = await getProductById(id)

  if (!product) {
    notFound()
  }

  return (
    <div className="space-y-6">
      {/* ลิงก์ย้อนกลับ */}
      <Link
        href="/products"
        className="inline-flex items-center text-xs font-semibold text-[#6B6B6B] hover:text-[#0A0A0A]"
      >
        ← กลับไปหน้ารายการสินค้า
      </Link>

      {/* 
        TODO (พี): ออกแบบกล่องรายละเอียดสินค้าตาม genesis-DESIGN.md
        - แสดงรูปสินค้า (product.imageUrl)
        - แสดงหมวดหมู่ (product.category)
        - แสดงชื่อสินค้า (product.name)
        - แสดงราคา (product.price)
        - แสดงคำอธิบาย (product.description)
        - วางคอมโพเนนต์ <PauseButton productId={product.id} />
      */}
      <div className="rounded-[12px] border border-[#E8E8EC] bg-white p-6">
        {/* เขียน Layout แสดงรายละเอียดสินค้า และวาง <PauseButton productId={product.id} /> ที่นี่ */}
      </div>
    </div>
  )
}
