'use client'

// ============================================================================
// 👤 กิต — components/SearchFilter.jsx
// ============================================================================
// หน้าที่: แถบค้นหาชื่อสินค้าและตัวกรองหมวดหมู่ (ซิงก์ค่าลงใน URL Query String)
//
// 📋 TODO สำหรับกิต:
// 1. [ ] อ่านค่า `q` และ `category` ปัจจุบันจาก `useSearchParams()`
// 2. [ ] เมื่อพิมพ์ในช่องค้นหาหรือเลือกหมวดหมู่ ให้อัปเดต URL เช่น `/products?q=...&category=...` ด้วย `router.push()`
// 3. [ ] ออกแบบ UI ตามมาตรฐาน genesis-DESIGN.md:
//        - Inputs & Selects: border 1px #E8E8EC, radius 6px (rounded-[6px]), padding 10px 14px
//        - Focus Ring: 3px rgba(99,102,241,0.12) และ border เปลี่ยนเป็น Primary Indigo (#6366F1)
//        - Placeholder: สี muted #9C9C9C
// ============================================================================

import { useRouter, useSearchParams } from 'next/navigation'

const CATEGORIES = [
  { value: '', label: 'ทุกหมวดหมู่' },
  { value: 'electronics', label: 'อุปกรณ์อิเล็กทรอนิกส์' },
  { value: 'fashion', label: 'แฟชั่น & เครื่องแต่งกาย' },
  { value: 'lifestyle', label: 'ของใช้ & ไลฟ์สไตล์' },
]

export default function SearchFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const q = searchParams.get('q') || ''
  const category = searchParams.get('category') || ''

  // TODO (กิต): จัดการเขียน Query Params ลง URL
  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/products?${params.toString()}`)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-[12px] border border-[#E8E8EC] mb-6">
      <div className="relative flex-1">
        <input
          type="text"
          defaultValue={q}
          onChange={(e) => updateParam('q', e.target.value)}
          placeholder="ค้นหาชื่อสินค้า..."
          className="w-full rounded-[6px] border border-[#E8E8EC] px-3.5 py-2 text-sm placeholder-[#9C9C9C] text-[#0A0A0A] focus:border-[#6366F1] focus:ring-3 focus:ring-[#6366F1]/12 focus:outline-none"
        />
      </div>

      <div className="w-full sm:w-56">
        <select
          value={category}
          onChange={(e) => updateParam('category', e.target.value)}
          className="w-full rounded-[6px] border border-[#E8E8EC] px-3 py-2 text-sm text-[#0A0A0A] focus:border-[#6366F1] focus:ring-3 focus:ring-[#6366F1]/12 focus:outline-none"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
