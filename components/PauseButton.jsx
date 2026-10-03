'use client'

// ============================================================================
// 👤 พี — components/PauseButton.jsx
// ============================================================================
// หน้าที่: คอมโพเนนต์เลือกเวลาพักคิด (Cooling-off Period) + ปุ่มหยุดคิดก่อน + ปุ่มข้ามไปเลย
//
// 📋 TODO สำหรับพี:
// 1. [ ] กำหนดตัวเลือกเวลาสำเร็จรูป (Presets):
//        - 1 ชั่วโมง, 6 ชั่วโมง, 12 ชั่วโมง, 24 ชั่วโมง (มาตรฐาน), 48 ชั่วโมง, 7 วัน, และ 'กำหนดเอง...'
// 2. [ ] สร้าง State:
//        - `const [preset, setPreset] = useState('24')`
//        - `const [customHours, setCustomHours] = useState(24)`
// 3. [ ] เช็คว่าสินค้านี้อยู่ในตะกร้าพักแล้วหรือยัง:
//        - `const isAlreadyInCart = has?.(productId)`
//        - ถ้ามีแล้ว ให้แสดงข้อความแจ้งเตือน "สินค้านี้อยู่ในตะกร้าพักแล้ว" พร้อมปุ่มพาไปหน้า `/cart`
// 4. [ ] ฟังก์ชัน handlePause ("หยุดคิดก่อน"):
//        - คำนวณชั่วโมง: `const hours = preset === 'custom' ? Number(customHours) : Number(preset)`
//        - เรียก `addItem(productId, hours)` จาก `usePauseCart()`
//        - ใช้ `router.push('/cart')` นำทางไปหน้าตะกร้าพัก
// 5. [ ] ฟังก์ชัน handleSkip ("ข้ามไปเลย / ซื้อเลย"):
//        - เรียก `skipItem(productId)` จาก `usePauseCart()`
//        - ใช้ `router.push('/ready')` นำทางไปหน้าพร้อมตัดสินใจ
// 6. [ ] ออกแบบ UI ตามมาตรฐาน genesis-DESIGN.md:
//        - กล่องครอบ: `rounded-[12px] border border-[#E8E8EC] bg-white p-4`
//        - Select / Inputs: `rounded-[6px] border border-[#E8E8EC] px-3 py-2 text-sm text-[#0A0A0A]`
//        - ปุ่ม "หยุดคิดก่อน": `rounded-[6px] bg-[#6366F1] hover:bg-[#4F46E5] text-white text-sm font-medium`
//        - ปุ่ม "ข้ามไปเลย": `rounded-[6px] border border-[#EF4444] text-[#EF4444] hover:bg-rose-50 text-sm font-medium`
// ============================================================================

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePauseCart } from '@/context/PauseCartContext'

export default function PauseButton({ productId }) {
  const router = useRouter()
  const { addItem, skipItem, has } = usePauseCart() || {}

  // TODO (พี): ประกาศ state ตัวเลือกเวลา
  // const [preset, setPreset] = useState('24')
  // const [customHours, setCustomHours] = useState(24)

  // TODO (พี): เขียนฟังก์ชัน handlePause และ handleSkip

  return (
    <div className="rounded-[12px] border border-[#E8E8EC] bg-white p-4 space-y-4">
      {/* 
        TODO (พี): แสดง Dropdown ตัวเลือกเวลาพักคิด (1h, 6h, 12h, 24h, 48h, 7d, กำหนดเอง)
        - ถ้าเลือก 'กำหนดเอง' ให้แสดงช่อง input กรอกชั่วโมง (1–168 ชม.)
      */}
      <div>
        <label className="block text-xs font-semibold text-[#0A0A0A] mb-1.5">
          เลือกระยะเวลาพักคิด (Cooling-off Period)
        </label>
        {/* เขียน <select> และ <option> ที่นี่ */}
      </div>

      {/* 
        TODO (พี): ปุ่มดำเนินการ 2 ปุ่ม:
        1. ปุ่ม "⏸ หยุดคิดก่อน (เข้าตะกร้าพัก)" -> เรียก handlePause
        2. ปุ่ม "⚡ ข้ามไปเลย / ซื้อเลย" -> เรียก handleSkip
      */}
      <div className="flex flex-col sm:flex-row gap-2 pt-2">
        {/* เขียน <button> ทั้งสองที่นี่ */}
      </div>
    </div>
  )
}
