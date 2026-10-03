// ============================================================================
// 👤 กิต — components/ProductCard.jsx
// ============================================================================
// หน้าที่: คอมโพเนนต์การ์ดแสดงสินค้า (ใช้ซ้ำในหน้าแรก / และหน้ารายการ /products)
//
// 📋 TODO สำหรับกิต:
// 1. [ ] รับ props: `{ product: { id, name, price, category, imageUrl, description } }`
// 2. [ ] แสดงรูปสินค้า (aspect-ratio เหมาะสม, 180-200px image area)
// 3. [ ] แสดงชื่อสินค้า, ราคา (฿), หมวดหมู่สินค้า, คำอธิบายแบบย่อ
// 4. [ ] ปุ่มกด "ดูรายละเอียด" เชื่อมลิงก์ Next.js ไปที่ `/products/${id}`
// 5. [ ] ปรับ UI ตามมาตรฐาน genesis-DESIGN.md:
//        - Cards: surface #FFFFFF, border 1px #E8E8EC, radius 12px (rounded-[12px])
//        - Card Hover: ลอยขึ้น -2px (hover:-translate-y-0.5) พร้อมเงา (hover:shadow-md)
//        - Chip หมวดหมู่: radius 9999px (rounded-full), พื้นหลังสีเทาอ่อน
//        - ปุ่ม: radius 6px (rounded-[6px]), Primary Indigo (#6366F1) hover (#4F46E5)
// ============================================================================

import Link from 'next/link'

export default function ProductCard({ product }) {
  // TODO (กิต): ปรับแต่งสไตล์และการแสดงผลตาม genesis-DESIGN.md
  const { id, name, price, category, imageUrl, description } = product

  return (
    <div className="group flex flex-col overflow-hidden rounded-[12px] border border-[#E8E8EC] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      {/* ส่วนแสดงรูปสินค้า */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <span className="absolute top-2 left-2 rounded-full bg-black/60 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-xs capitalize">
          {category}
        </span>
      </div>

      {/* ส่วนรายละเอียดสินค้า */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold text-[#0A0A0A] line-clamp-1 group-hover:text-[#6366F1] transition">
          {name}
        </h3>
        <p className="mt-1 text-xs text-[#6B6B6B] line-clamp-2">{description}</p>

        <div className="mt-4 flex items-center justify-between pt-2 border-t border-[#E8E8EC]">
          <span className="text-base font-bold text-[#0A0A0A]">
            ฿{price.toLocaleString()}
          </span>
          <Link
            href={`/products/${id}`}
            className="rounded-[6px] bg-[#6366F1] px-3.5 py-1.5 text-xs font-medium text-white transition hover:bg-[#4F46E5]"
          >
            ดูรายละเอียด
          </Link>
        </div>
      </div>
    </div>
  )
}
