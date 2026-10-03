// ============================================================================
// 👤 กิต — components/ProductCard.jsx
// ============================================================================
// หน้าที่: คอมโพเนนต์การ์ดแสดงสินค้า (ใช้ซ้ำในหน้าแรก / และหน้ารายการ /products)
//
// 📋 TODO สำหรับกิต:
// 1. [ ] รับ props: `{ product: { id, name, price, category, imageUrl, description } }`
// 2. [ ] แสดงรูปสินค้า (aspect-video หรือ aspect-square, มี overflow-hidden)
// 3. [ ] แสดงชื่อสินค้า, ราคา (฿), หมวดหมู่สินค้า, คำอธิบายย่อ
// 4. [ ] ปุ่ม "ดูรายละเอียด": ลิงก์ Next.js ไปที่ `/products/${id}`
// 5. [ ] ปรับแต่ง UI ตามมาตรฐาน genesis-DESIGN.md:
//        - Cards: surface #FFFFFF, border 1px #E8E8EC, radius 12px (`rounded-[12px]`)
//        - Card Hover: ลอยขึ้น -2px (`hover:-translate-y-0.5`), เงา (`hover:shadow-md`)
//        - Tag หมวดหมู่: radius 9999px (`rounded-full`), ฟอนต์เล็กกระชับ
//        - ปุ่ม: radius 6px (`rounded-[6px]`), สี Indigo (#6366F1) hover (#4F46E5)
// ============================================================================

import Link from 'next/link'

export default function ProductCard({ product }) {
  const { id, name, price, category, imageUrl, description } = product || {}

  // TODO (กิต): ออกแบบและตกแต่งการ์ดสินค้าตาม genesis-DESIGN.md
  return (
    <div className="group rounded-[12px] border border-[#E8E8EC] bg-white p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      {/* TODO (กิต): แสดงรูปสินค้า */}
      <div className="aspect-video w-full overflow-hidden rounded-[8px] bg-slate-100 mb-3">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-xs text-[#6B6B6B]">ไม่มีรูปภาพ</div>
        )}
      </div>

      {/* TODO (กิต): แสดงชื่อ, ราคา, หมวดหมู่ และปุ่มไปหน้ารายละเอียด */}
      <div className="space-y-1">
        <span className="text-[10px] uppercase font-semibold text-[#6B6B6B]">{category}</span>
        <h3 className="font-semibold text-sm text-[#0A0A0A] line-clamp-1">{name}</h3>
        <p className="text-xs text-[#6B6B6B] line-clamp-2">{description}</p>
        <div className="pt-2 flex items-center justify-between border-t border-[#E8E8EC] mt-3">
          <span className="font-bold text-sm text-[#0A0A0A]">฿{price?.toLocaleString()}</span>
          <Link
            href={`/products/${id}`}
            className="rounded-[6px] bg-[#6366F1] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#4F46E5] transition"
          >
            ดูรายละเอียด
          </Link>
        </div>
      </div>
    </div>
  )
}
