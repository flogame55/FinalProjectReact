'use client'

// ============================================================================
// 👤 พี — components/PauseButton.jsx
// ============================================================================
// หน้าที่: คอมโพเนนต์เลือกเวลาพักคิด (Cooling-off Period) + ปุ่มหยุดคิดก่อน + ปุ่มข้ามไปเลย
//
// 📋 TODO สำหรับพี:
// 1. [ ] กำหนดตัวเลือกเวลา Presets (1h, 6h, 12h, 24h, 48h, 7d, และ 'กำหนดเอง')
// 2. [ ] สเตทจัดการเวลาที่เลือก (preset) และกรณีเลือกกำหนดเอง (customHours)
// 3. [ ] ตรวจสอบว่าสินค้านี้อยู่ในตะกร้าแล้วหรือไม่ (`has(productId)` จาก usePauseCart)
//        - ถ้ามีแล้ว: แสดงข้อความเตือนพร้อมลิงก์ไป /cart
// 4. [ ] ปุ่ม "หยุดคิดก่อน":
//        - เรียก `addItem(productId, hours)` จาก usePauseCart()
//        - นำทางไปหน้า `/cart`
// 5. [ ] ปุ่ม "ข้ามเวลา / ซื้อเลย":
//        - เรียก `skipItem(productId)` และนำทางไปหน้า `/ready`
// 6. [ ] ออกแบบ UI ตาม genesis-DESIGN.md:
//        - Inputs/Selects: radius 6px, border 1px #E8E8EC, focus ring 3px indigo
//        - Primary Button: Indigo (#6366F1), radius 6px, font-medium
//        - Skip Button: Secondary/Border Red (#EF4444) หรือ Outline
// ============================================================================

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePauseCart } from '@/context/PauseCartContext'

export default function PauseButton({ productId }) {
  const router = useRouter()
  const { addItem, skipItem, has } = usePauseCart() || {}

  // TODO (พี): ประกาศ state สำหรับระยะเวลาพักคิด (เช่น preset: '24', customHours: 24)

  // TODO (พี): ฟังก์ชันเมื่อกด "หยุดคิดก่อน" (เข้าตะกร้าพัก)
  const handlePause = () => {
    // โค้ดของพี
  }

  // TODO (พี): ฟังก์ชันเมื่อกด "ข้ามเวลา / ซื้อเลย"
  const handleSkip = () => {
    // โค้ดของพี
  }

  return (
    <div className="space-y-4 rounded-[12px] border border-[#E8E8EC] bg-white p-4">
      {/* TODO (พี): ออกแบบ Dropdown เลือกเวลา + ช่องกรอกกรณีเลือก custom */}
      <div>
        <label className="block text-xs font-semibold text-[#0A0A0A] mb-1.5">
          เลือกระยะเวลาพักคิด (Cooling-off Period)
        </label>
        <select className="w-full rounded-[6px] border border-[#E8E8EC] p-2 text-sm text-[#0A0A0A]">
          <option value="24">24 ชั่วโมง (มาตรฐาน)</option>
          {/* TODO (พี): เพิ่ม options อื่นๆ (1h, 6h, 12h, 48h, 7d, กำหนดเอง) */}
        </select>
      </div>

      {/* TODO (พี): ปุ่มหยุดคิดก่อน และปุ่มข้ามเวลา ตามมาตรฐาน genesis-DESIGN.md */}
      <div className="flex gap-2">
        <button
          onClick={handlePause}
          className="flex-1 rounded-[6px] bg-[#6366F1] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#4F46E5] transition"
        >
          ⏸ หยุดคิดก่อน (เข้าตะกร้าพัก)
        </button>
        <button
          onClick={handleSkip}
          className="rounded-[6px] border border-[#EF4444] px-4 py-2.5 text-sm font-medium text-[#EF4444] hover:bg-rose-50 transition"
        >
          ⚡ ข้ามไปเลย
        </button>
      </div>
    </div>
  )
}
