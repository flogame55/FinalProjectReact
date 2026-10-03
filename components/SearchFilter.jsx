'use client'

// ============================================================================
// 👤 กิต — components/SearchFilter.jsx
// ============================================================================
// หน้าที่: แถบค้นหาชื่อสินค้าและตัวกรองหมวดหมู่ (ซิงก์ค่าลงใน URL Query String)
//
// 📋 TODO สำหรับกิต:
// 1. [ ] อ่านค่า `q` และ `category` จาก `useSearchParams()`
// 2. [ ] เมื่อผู้ใช้พิมพ์ค้นหา หรือเปลี่ยนหมวดหมู่ ให้อัปเดต URL เช่น `/products?q=...&category=...`
// 3. [ ] ออกแบบ UI ตามมาตรฐาน genesis-DESIGN.md:
//        - Inputs & Selects: border 1px #E8E8EC, radius 6px (`rounded-[6px]`)
//        - Focus ring: Indigo (#6366F1)
//        - Placeholder: muted #9C9C9C
// ============================================================================

import { useRouter, useSearchParams } from 'next/navigation'

export default function SearchFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // TODO (กิต): เขียนฟังก์ชันอัปเดต URL query parameters เมื่อ input เปลี่ยนแปลง
  const handleSearch = (e) => {
    // โค้ดของกิต
  }

  const handleCategoryChange = (e) => {
    // โค้ดของกิต
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-[12px] border border-[#E8E8EC] mb-6">
      {/* TODO (กิต): ช่อง Input ค้นหาชื่อสินค้า */}
      <input
        type="text"
        placeholder="ค้นหาชื่อสินค้า..."
        onChange={handleSearch}
        className="flex-1 rounded-[6px] border border-[#E8E8EC] p-2 text-sm text-[#0A0A0A] placeholder-[#9C9C9C]"
      />

      {/* TODO (กิต): Select เลือกหมวดหมู่ */}
      <select
        onChange={handleCategoryChange}
        className="rounded-[6px] border border-[#E8E8EC] p-2 text-sm text-[#0A0A0A]"
      >
        <option value="">ทุกหมวดหมู่</option>
        <option value="electronics">อุปกรณ์อิเล็กทรอนิกส์</option>
        <option value="fashion">แฟชั่น & เครื่องแต่งกาย</option>
        <option value="lifestyle">ของใช้ & ไลฟ์สไตล์</option>
      </select>
    </div>
  )
}
