// ============================================================================
// 👤 กิต — components/ProductCard.jsx
// ============================================================================
// หน้าที่: คอมโพเนนต์การ์ดแสดงสินค้า (ใช้ซ้ำในหน้าแรก / และหน้ารายการ /products)
//
// 📋 TODO สำหรับกิต:
// 1. [ ] รับ props: `{ product: { id, name, price, category, imageUrl, description } }`
// 2. [ ] ออกแบบการ์ดสินค้าตามมาตรฐาน genesis-DESIGN.md:
//        - กรอบการ์ด: `rounded-[12px] border border-[#E8E8EC] bg-white p-4`
//        - Interactive Hover: ลอยขึ้น -2px และมีเงา (`hover:-translate-y-0.5 hover:shadow-md transition duration-200`)
//        - รูปสินค้า: `aspect-video w-full rounded-[8px] object-cover bg-slate-100`
//        - Tag หมวดหมู่: `rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] text-[#6B6B6B]`
//        - ชื่อสินค้า: `font-semibold text-sm text-[#0A0A0A] line-clamp-1`
//        - ราคา: `font-bold text-sm text-[#0A0A0A]` (แสดงเครื่องหมาย ฿)
//        - ปุ่ม "ดูรายละเอียด": `Link` ไปที่ `/products/${id}` สไตล์ Primary:
//          `rounded-[6px] bg-[#6366F1] hover:bg-[#4F46E5] text-white px-3.5 py-1.5 text-xs font-medium`
// ============================================================================

import Link from 'next/link'

export default function ProductCard({ product }) {
  const { id, name, price, category, imageUrl, description } = product || {}

  return (
    <div className="rounded-[12px] border border-[#E8E8EC] bg-white p-4">
      {/* 
        TODO (กิต): ออกแบบและวาง Layout การ์ดสินค้าตาม genesis-DESIGN.md
        - ส่วนรูปสินค้า
        - ส่วนป้ายหมวดหมู่และชื่อสินค้า
        - ส่วนราคาและปุ่ม Link ไป /products/${id}
      */}
      <p className="text-sm font-semibold text-[#0A0A0A]">{name || 'ชื่อสินค้า'}</p>
      <Link href={`/products/${id}`} className="text-xs text-[#6366F1] underline">
        ดูรายละเอียด →
      </Link>
    </div>
  )
}
