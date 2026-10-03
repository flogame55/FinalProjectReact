'use client'

// 👤 พี — PauseButton (เลือกเวลาถอยหลัง + ปุ่มหยุดคิดก่อน + ปุ่มข้ามไปเลย/พร้อมซื้อเลย)
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

  const [preset, setPreset] = useState('24')
  const [customHours, setCustomHours] = useState(24)
  const isAlreadyInCart = has(productId)

  const handlePause = () => {
    const hours = preset === 'custom' ? Number(customHours) || 24 : Number(preset)
    addItem(productId, hours)
    router.push('/cart')
  }

  const handleSkip = () => {
    addItem(productId, 0)
    skipItem(productId)
    router.push('/ready')
  }

  if (isAlreadyInCart) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-center">
        <p className="text-sm font-semibold text-amber-800">
          ⏳ สินค้านี้อยู่ในตะกร้าพักของคุณแล้ว
        </p>
        <button
          onClick={() => router.push('/cart')}
          className="mt-2 text-xs font-bold text-amber-700 underline hover:text-amber-900"
        >
          ไปที่ตะกร้าพัก →
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          เลือกระยะเวลาพักคิด (Cooling-off Period)
        </label>
        <select
          value={preset}
          onChange={(e) => setPreset(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
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
          <label className="block text-xs text-slate-600 mb-1">
            กรอกจำนวนชั่วโมงที่ต้องการ (1–168 ชั่วโมง):
          </label>
          <input
            type="number"
            min="1"
            max="168"
            value={customHours}
            onChange={(e) => setCustomHours(Math.max(1, Math.min(168, Number(e.target.value))))}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
          />
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
        <button
          onClick={handlePause}
          className="flex-1 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800 active:scale-98 shadow-xs"
        >
          ⏸ หยุดคิดก่อน (เข้าตะกร้าพัก)
        </button>
        <button
          onClick={handleSkip}
          className="rounded-xl border border-rose-300 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 active:scale-98"
          title="จำเป็นจริงๆ ไม่ต้องรอเวลา แต่ระบบจะบันทึกว่าข้ามเข้าสถิติ"
        >
          ⚡ ข้ามไปเลย / ซื้อเลย
        </button>
      </div>
    </div>
  )
}
