'use client'

// ============================================================================
// 👤 พี — components/PauseButton.jsx
// ============================================================================
// หน้าที่: คอมโพเนนต์เลือกเวลาพักคิด (Cooling-off Period) + ปุ่มหยุดคิดก่อน + ปุ่มข้ามไปเลย
//
// 📋 TODO สำหรับพี:
// 1. [ ] ทำ Dropdown ตัวเลือกเวลาสำเร็จรูป (Presets):
//        - 1h, 6h, 12h, 24h (มาตรฐาน), 48h, 7d, และตัวเลือก "กำหนดเอง..."
// 2. [ ] Conditional Rendering: เมื่อเลือก "กำหนดเอง" ให้แสดงช่อง Input ตัวเลขระบุชั่วโมง (1–168 ชม.)
// 3. [ ] ปุ่ม "หยุดคิดก่อน" (Primary Button):
//        - เรียก `addItem(productId, hours)` จาก `usePauseCart()`
//        - นำทางผู้ใช้ไปยัง `/cart`
// 4. [ ] ปุ่ม "ข้ามไปเลย / พร้อมซื้อเลย" (Secondary Action):
//        - เรียก `skipItem(productId)` ทันที และนำทางผู้ใช้ไปยัง `/ready`
// 5. [ ] ตรวจสอบสถานะถ้าสินค้านี้อยู่ในตะกร้าแล้ว (`has(productId)`):
//        - ให้แสดงข้อความแจ้งเตือนและปุ่ม "ไปที่ตะกร้าพัก →"
// 6. [ ] ออกแบบ UI ตาม genesis-DESIGN.md:
//        - Primary Button: Indigo (#6366F1) hover (#4F46E5), radius 6px
//        - Dropdowns & Inputs: radius 6px, border 1px #E8E8EC, focus ring 3px indigo
// ============================================================================

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePauseCart } from '@/context/PauseCartContext'

const PRESET_OPTIONS = [
  { value: '1', label: '1 ชั่วโมง' },
  { value: '6', label: '6 ชั่วโมง' },
  { value: '12', label: '12 ชั่วโมง' },
  { value: '24', label: '24 ชั่วโมง (มาตรฐาน)' },
  { value: '48', label: '48 ชั่วโมง (2 วัน)' },
  { value: '168', label: '7 วัน' },
  { value: 'custom', label: 'กำหนดเอง...' },
]

export default function PauseButton({ productId }) {
  const router = useRouter()
  const { addItem, skipItem, has } = usePauseCart()

  // TODO (พี): จัดการ state ตัวเลือกเวลา
  const [preset, setPreset] = useState('24')
  const [customHours, setCustomHours] = useState(24)
  const isAlreadyInCart = has(productId)

  const handlePause = () => {
    // TODO (พี): เพิ่มเข้าตะกร้าพักตามชั่วโมงที่เลือก
    const hours = preset === 'custom' ? Number(customHours) || 24 : Number(preset)
    addItem(productId, hours)
    router.push('/cart')
  }

  const handleSkip = () => {
    // TODO (พี): ข้ามเวลาพักและไปหน้า ready ทันที
    addItem(productId, 0)
    skipItem(productId)
    router.push('/ready')
  }

  if (isAlreadyInCart) {
    return (
      <div className="rounded-[8px] border border-amber-200 bg-amber-50 p-4 text-center">
        <p className="text-sm font-semibold text-amber-800">
          ⏳ สินค้านี้อยู่ในตะกร้าพักของคุณแล้ว
        </p>
        <button
          onClick={() => router.push('/cart')}
          className="mt-2 text-xs font-bold text-amber-700 underline hover:text-amber-900 cursor-pointer"
        >
          ไปที่ตะกร้าพัก →
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4 rounded-[12px] border border-[#E8E8EC] bg-white p-4">
      {/* TODO (พี): ตัวเลือกเวลาพักคิด */}
      <div>
        <label className="block text-xs font-semibold text-[#0A0A0A] uppercase tracking-wider mb-1.5">
          เลือกระยะเวลาพักคิด (Cooling-off Period)
        </label>
        <select
          value={preset}
          onChange={(e) => setPreset(e.target.value)}
          className="w-full rounded-[6px] border border-[#E8E8EC] bg-white px-3 py-2 text-sm text-[#0A0A0A] focus:border-[#6366F1] focus:ring-3 focus:ring-[#6366F1]/12 focus:outline-none"
        >
          {PRESET_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {preset === 'custom' && (
        <div>
          <label className="block text-xs text-[#6B6B6B] mb-1">
            กรอกจำนวนชั่วโมงที่ต้องการ (1–168 ชั่วโมง):
          </label>
          <input
            type="number"
            min="1"
            max="168"
            value={customHours}
            onChange={(e) => setCustomHours(Math.max(1, Math.min(168, Number(e.target.value))))}
            className="w-full rounded-[6px] border border-[#E8E8EC] bg-white px-3 py-2 text-sm text-[#0A0A0A] focus:border-[#6366F1] focus:ring-3 focus:ring-[#6366F1]/12 focus:outline-none"
          />
        </div>
      )}

      {/* TODO (พี): ปุ่มหยุดคิดก่อน และปุ่มข้ามเวลา */}
      <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
        <button
          onClick={handlePause}
          className="flex-1 rounded-[6px] bg-[#6366F1] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#4F46E5] active:scale-98 cursor-pointer"
        >
          ⏸ หยุดคิดก่อน (เข้าตะกร้าพัก)
        </button>
        <button
          onClick={handleSkip}
          className="rounded-[6px] border border-[#EF4444] bg-white px-4 py-2.5 text-sm font-medium text-[#EF4444] transition hover:bg-rose-50 active:scale-98 cursor-pointer"
          title="จำเป็นจริงๆ ไม่ต้องรอเวลา แต่ระบบจะบันทึกว่าข้ามเข้าสถิติ"
        >
          ⚡ ข้ามไปเลย / ซื้อเลย
        </button>
      </div>
    </div>
  )
}
