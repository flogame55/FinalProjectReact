'use client'

import { useId, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePauseCart } from '@/context/PauseCartContext'

const PRESETS = [
  { value: '1', label: '1 ชั่วโมง' },
  { value: '6', label: '6 ชั่วโมง' },
  { value: '12', label: '12 ชั่วโมง' },
  { value: '24', label: '24 ชั่วโมง' },
  { value: '48', label: '48 ชั่วโมง' },
  { value: '168', label: '7 วัน' },
]

export default function PauseButton({ productId, product }) {
  const router = useRouter()
  const customInputId = useId()
  const { addItem, skipItem, has, hydrated } = usePauseCart()
  const [preset, setPreset] = useState('24')
  const [customHours, setCustomHours] = useState('24')
  const hours = Number(preset === 'custom' ? customHours : preset)
  const validHours = Number.isFinite(hours) && hours >= 1 && hours <= 168
  const isAlreadyInCart = has(productId)

  if (isAlreadyInCart) {
    return (
      <div className="surface space-y-4 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 font-semibold" aria-hidden="true">✓</span>
          <div>
            <h2 className="font-medium text-[#0A0A0A]">เก็บไว้ในตะกร้าพักแล้ว</h2>
            <p className="mt-1 text-sm leading-6 text-[#6B6B6B]">กำลังช่วยคุณนับเวลาถอยหลัง เพื่อให้เวลาคิดก่อนตัดสินใจ</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 pt-1">
          <Link href="/cart" className="button-primary text-center">ดูตะกร้าพัก <span aria-hidden="true">→</span></Link>
          <button type="button" onClick={handleSkip} className="button-secondary text-center text-xs">ไม่อยากรอ · ตัดสินใจเลย ⚡</button>
        </div>
      </div>
    )
  }

  function handlePause() {
    if (!validHours || !hydrated) return
    addItem(productId, hours, product)
    router.push('/cart')
  }

  function handleSkip() {
    skipItem(productId, product)
    router.push('/ready')
  }

  return (
    <div className="surface space-y-5 p-5 sm:p-6">
      <div>
        <p className="eyebrow">COOLING-OFF PERIOD · ให้เวลาตัวเอง</p>
        <h2 className="mt-2 text-xl font-medium tracking-tight text-[#0A0A0A]">ชอบแล้ว พักคิดไว้ก่อน</h2>
        <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">พักสินค้านี้ไว้ในตะกร้าชั่วคราว เพื่อลดการซื้อด้วยอารมณ์ชั่ววูบ</p>
      </div>

      <fieldset>
        <legend className="mb-3 text-sm font-medium text-[#0A0A0A]">เลือกเวลาที่คุณต้องการพักคิด:</legend>
        <div className="grid grid-cols-3 gap-2">
          {PRESETS.map((option) => (
            <button
              type="button"
              key={option.value}
              aria-pressed={preset === option.value}
              onClick={() => setPreset(option.value)}
              className={`min-h-11 rounded-[6px] border px-2 py-2 text-sm transition-colors ${preset === option.value ? 'border-[#6366F1] bg-indigo-50 text-indigo-700 font-medium' : 'border-[#E8E8EC] bg-white text-[#6B6B6B] hover:border-slate-400'}`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <button type="button" aria-expanded={preset === 'custom'} onClick={() => setPreset(preset === 'custom' ? '24' : 'custom')} className="mt-3 min-h-9 text-xs text-[#6B6B6B] underline underline-offset-4 hover:text-[#0A0A0A]">กำหนดเวลาเอง</button>
        {preset === 'custom' && (
          <div className="mt-2">
            <label htmlFor={customInputId} className="mb-2 block text-sm text-[#0A0A0A]">จำนวนชั่วโมง (1–168)</label>
            <input id={customInputId} type="number" min="1" max="168" step="any" value={customHours} onChange={(event) => setCustomHours(event.target.value)} aria-invalid={!validHours} aria-describedby={!validHours ? `${customInputId}-error` : undefined} className="input-field w-full" />
            {!validHours && <p id={`${customInputId}-error`} className="mt-2 text-xs text-red-600">กรุณาระบุเวลาระหว่าง 1 ถึง 168 ชั่วโมง</p>}
          </div>
        )}
      </fieldset>

      <div className="space-y-2.5 border-t border-[#E8E8EC] pt-5">
        <button type="button" disabled={!hydrated || !validHours} onClick={handlePause} className="button-primary w-full">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M8 5v14M16 5v14" /></svg>
          พักคิดก่อน ({hours} ชม.)
        </button>
        <button type="button" disabled={!hydrated} onClick={handleSkip} className="button-quiet w-full text-xs text-[#6B6B6B] hover:text-[#0A0A0A]">ไม่อยากรอ · ข้ามไปตัดสินใจซื้อทันที ⚡</button>
      </div>
      <p className="text-center text-xs leading-5 text-[#9C9C9C]">ยังไม่มีการสั่งซื้อหรือเรียกเก็บเงินในขั้นตอนนี้</p>
    </div>
  )
}
