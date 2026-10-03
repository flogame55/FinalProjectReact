'use client'

// ============================================================================
// 👤 โฟ — components/Countdown.jsx
// ============================================================================
// หน้าที่: แสดงตัวนับเวลาถอยหลังแบบ Real-time ของแต่ละชิ้นในหน้า /cart
//
// 📋 TODO สำหรับโฟ:
// 1. [ ] คำนวณเวลาที่เหลือ: diff = readyAt - Date.now()
// 2. [ ] ใช้ `useEffect` + `setInterval` (1000ms) อัปเดตเวลาทุกวินาที และ cleanup ด้วย `clearInterval`
// 3. [ ] แปลง diff เป็น ชั่วโมง : นาที : วินาที
// 4. [ ] หากเปิดโหมด `isFastForward`: เร่งเวลานับถอยหลังสำหรับการนำเสนอ
// 5. [ ] เมื่อเวลาหมด (diff <= 0): แสดงข้อความสถานะว่าครบเวลาแล้ว
// 6. [ ] ปุ่ม "ข้ามเวลารอ" (Skip): เรียกฟังก์ชัน `onSkip`
// 7. [ ] ออกแบบตาม genesis-DESIGN.md:
//        - Typography ตัวเลข: ฟอนต์ JetBrains Mono (`font-mono`)
//        - Badge: `rounded-full`, สี Indigo/Neutral
// ============================================================================

import { useState, useEffect } from 'react'

export default function Countdown({ readyAt, onSkip, isFastForward }) {
  // TODO (โฟ): ประกาศ state เก็บเวลาที่เหลือ (timeLeft)

  // TODO (โฟ): เขียน useEffect + setInterval สำหรับนับถอยหลังทุก 1 วินาที

  return (
    <div className="flex items-center justify-between gap-3">
      {/* TODO (โฟ): แสดงเวลานับถอยหลังแบบ font-mono (ชม:นาที:วินาที) */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-[#6B6B6B]">เหลือเวลาคิด:</span>
        <span className="font-mono text-xs font-bold text-[#0A0A0A] bg-slate-100 px-2 py-1 rounded-[6px]">
          --:--:--
        </span>
      </div>

      {/* TODO (โฟ): ปุ่มข้ามเวลารอ */}
      <button
        onClick={onSkip}
        className="text-xs text-[#EF4444] hover:underline"
      >
        ข้ามเวลารอ →
      </button>
    </div>
  )
}
