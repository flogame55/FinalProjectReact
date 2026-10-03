'use client'

// ============================================================================
// 👤 กิต — components/Countdown.jsx
// ============================================================================
// หน้าที่: แสดงตัวนับเวลาถอยหลังแบบ Real-time ของแต่ละชิ้นในหน้า /cart
//
// 📋 TODO สำหรับกิต:
// 1. [ ] คำนวณเวลาที่เหลือ: `const diff = readyAt - Date.now()`
// 2. [ ] ใช้ `useEffect` + `setInterval` (1000ms) อัปเดตเวลาทุก 1 วินาที และอย่าลืม cleanup `clearInterval`
// 3. [ ] คำนวณแปลงเวลาเป็น วัน, ชั่วโมง, นาที, วินาที:
//        - `const seconds = Math.floor((timeLeft / 1000) % 60)`
//        - `const minutes = Math.floor((timeLeft / (1000 * 60)) % 60)`
//        - `const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24)`
// 4. [ ] รองรับโหมด `isFastForward`: ถ้าเปิด ให้เวลานับเร็วขึ้นสำหรับการ Demo
// 5. [ ] เมื่อหมดเวลา (`diff <= 0`): แสดงข้อความหรือป้าย Badge ว่า "ครบกำหนดเวลาแล้ว! พร้อมตัดสินใจ"
// 6. [ ] ปุ่ม "ข้ามเวลารอ": เรียกฟังก์ชัน `onSkip`
// 7. [ ] ออกแบบตาม genesis-DESIGN.md:
//        - ตัวเลขนับถอยหลัง: ฟอนต์ `JetBrains Mono` (`font-mono text-xs font-bold text-[#0A0A0A]`)
//        - กล่องครอบตัวเลข: `bg-slate-100 px-2.5 py-1 rounded-[6px]`
// ============================================================================

import { useState, useEffect } from 'react'

export default function Countdown({ readyAt, onSkip, isFastForward }) {
  // TODO (กิต): จัดการ state timeLeft และ useEffect สำรับ setInterval

  return (
    <div className="flex items-center justify-between gap-3">
      {/* 
        TODO (กิต): 
        1. แสดงตัวเลขนับถอยหลังแบบ font-mono (ชม:นาที:วินาที)
        2. ปุ่ม "ข้ามเวลารอ →" เรียก onSkip
      */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-[#6B6B6B]">เหลือเวลาคิด:</span>
        <span className="font-mono text-xs font-bold text-[#0A0A0A] bg-slate-100 px-2 py-1 rounded-[6px]">
          --:--:--
        </span>
      </div>

      <button
        onClick={onSkip}
        className="text-xs text-[#EF4444] hover:underline"
      >
        ข้ามเวลารอ →
      </button>
    </div>
  )
}
