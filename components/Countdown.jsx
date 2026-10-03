'use client'

// ============================================================================
// 👤 โฟ — components/Countdown.jsx
// ============================================================================
// หน้าที่: แสดงตัวนับเวลาถอยหลังแบบ Real-time ของแต่ละชิ้นในหน้า /cart
//
// 📋 TODO สำหรับโฟ:
// 1. [ ] คำนวณเวลาที่เหลือ: diff = readyAt - Date.now()
// 2. [ ] ใช้ `useEffect` + `setInterval` (1000ms) อัปเดตเวลาทุกวินาที และอย่าลืม cleanup `clearInterval`
// 3. [ ] แปลงเวลาเป็น วัน / ชั่วโมง / นาที / วินาที
// 4. [ ] รองรับโหมด `isFastForward`: ถ้าเปิดโหมดนี้ ให้เวลานับเร็วขึ้นสำหรับการ Demo (เช่น 1 ชม. เหลือ 1 วิ)
// 5. [ ] เมื่อเวลาหมด (diff <= 0): แสดง Badge สถานะ "ครบเวลาแล้ว พร้อมตัดสินใจ"
// 6. [ ] ปุ่ม "ข้ามเวลารอ" (Skip): เรียก callback `onSkip` เพื่อย้ายสินค้าไปพร้อมตัดสินใจทันที
// 7. [ ] ปรับ UI ตาม genesis-DESIGN.md:
//        - Typography: ตัวเลขฟอนต์ JetBrains Mono (`font-mono`)
//        - Badge: radius 9999px (rounded-full)
// ============================================================================

import { useState, useEffect } from 'react'

export default function Countdown({ readyAt, onSkip, isFastForward }) {
  const [timeLeft, setTimeLeft] = useState(0)

  useEffect(() => {
    // TODO (โฟ): เขียน timer คำนวณเวลานับถอยหลังจริง และจัดการ cleanup
    const calculateTime = () => {
      const diff = readyAt - Date.now()
      setTimeLeft(diff > 0 ? diff : 0)
    }

    calculateTime()
    const interval = setInterval(calculateTime, 1000)
    return () => clearInterval(interval)
  }, [readyAt, isFastForward])

  if (timeLeft <= 0) {
    return (
      <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
        ✅ ครบกำหนดเวลาแล้ว! พร้อมตัดสินใจ
      </span>
    )
  }

  // TODO (โฟ): ปรับการคำนวณและแสดงผลตามที่ออกแบบไว้
  const seconds = Math.floor((timeLeft / 1000) % 60)
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60)
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24)
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-[#6B6B6B]">เหลือเวลาคิด:</span>
        <div className="flex gap-1 text-xs font-mono font-bold text-[#0A0A0A] bg-slate-100 px-2.5 py-1 rounded-[6px]">
          {days > 0 && <span>{days}d</span>}
          <span>{String(hours).padStart(2, '0')}h</span>
          <span>:</span>
          <span>{String(minutes).padStart(2, '0')}m</span>
          <span>:</span>
          <span>{String(seconds).padStart(2, '0')}s</span>
        </div>
      </div>

      <button
        onClick={onSkip}
        className="text-xs font-semibold text-rose-600 hover:text-rose-800 underline self-start sm:self-auto cursor-pointer"
      >
        ข้ามเวลารอ →
      </button>
    </div>
  )
}
