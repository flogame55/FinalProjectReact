'use client'

// ============================================================================
// 👤 กิต — components/SearchFilter.jsx
// ============================================================================
// หน้าที่: แถบค้นหาชื่อสินค้าและตัวกรองหมวดหมู่ (ซิงก์ค่าลงใน URL Query String)
//
// 📋 TODO สำหรับกิต:
// 1. [ ] อ่านค่าปัจจุบันจาก URL ด้วย `useSearchParams()`:
//        `const q = searchParams.get('q') || ''`
//        `const category = searchParams.get('category') || ''`
// 2. [ ] เขียนฟังก์ชันอัปเดต Query String ลงใน URL:
//        ```javascript
//        const updateFilter = (key, value) => {
//          const params = new URLSearchParams(searchParams.toString())
//          if (value) params.set(key, value)
//          else params.delete(key)
//          router.push(`/products?${params.toString()}`)
//        }
//        ```
// 3. [ ] ออกแบบ UI ตามมาตรฐาน genesis-DESIGN.md:
//        - กรอบครอบ: `flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-[12px] border border-[#E8E8EC]`
//        - ช่อง Input: `rounded-[6px] border border-[#E8E8EC] px-3.5 py-2 text-sm text-[#0A0A0A] placeholder-[#9C9C9C]`
//        - Select: `rounded-[6px] border border-[#E8E8EC] px-3 py-2 text-sm text-[#0A0A0A]`
// ============================================================================

import { useRouter, useSearchParams } from 'next/navigation'

export default function SearchFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // TODO (กิต): จัดการ state หรือฟังก์ชันอัปเดต query params เมื่อพิมพ์ค้นหาหรือเลือกหมวดหมู่

  return (
    <div className="bg-white p-4 rounded-[12px] border border-[#E8E8EC]">
      {/* 
        TODO (กิต): 
        1. ช่อง <input> ค้นหาชื่อสินค้า (เมื่อพิมพ์ให้เรียก updateFilter('q', e.target.value))
        2. เมนู <select> เลือกหมวดหมู่ (เมื่อเปลี่ยนให้เรียก updateFilter('category', e.target.value))
      */}
      <p className="text-xs text-[#6B6B6B]">TODO: ช่องค้นหาชื่อสินค้า และตัวกรองหมวดหมู่</p>
    </div>
  )
}
