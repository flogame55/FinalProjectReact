'use client'

// ============================================================================
// 👤 กิต — components/HistoryChart.jsx
// ============================================================================
// หน้าที่: แสดงผลกราฟสถิติการตัดสินใจด้วย Recharts (Client Component)
//
// 📋 TODO สำหรับกิต:
// 1. [ ] รับ props: `{ data = [] }` โดย data เป็น array ของ `{ name: string, count: number }`
// 2. [ ] จัดการ Empty State: หากไม่มีข้อมูล ให้แสดงกล่อง `rounded-[12px] border border-dashed border-[#E8E8EC] p-6 text-center`
// 3. [ ] นำ Recharts มาเรนเดอร์:
//        - ครอบด้วย `<ResponsiveContainer width="100%" height={260}>`
//        - วาง `<BarChart data={data}>`
//        - วาง `<XAxis dataKey="name" />`, `<YAxis allowDecimals={false} />`, `<Tooltip />`
//        - วาง `<Bar dataKey="count" radius={[6, 6, 0, 0]}>`
// 4. [ ] ใช้โทนสีตาม genesis-DESIGN.md:
//        - ซื้อจริง (Bought) -> `#10B981` (Success Green)
//        - เปลี่ยนใจ (Passed) -> `#6366F1` (Primary Indigo)
//        - ข้ามไปเลย (Skipped) -> `#EF4444` (Error Red)
// ============================================================================

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts'

export default function HistoryChart({ data = [] }) {
  // TODO (กิต): ตรวจสอบ Empty State ถ้าข้อมูลว่างเปล่า

  // TODO (กิต): กำหนดชุดสีตามสถานะการตัดสินใจ

  return (
    <div className="h-64 w-full">
      {/* 
        TODO (กิต): เขียนกราฟแท่งด้วย Recharts ตามคำแนะนำด้านบน 
      */}
      <p className="text-xs text-[#6B6B6B]">TODO: แสดงผลกราฟสถิติ Recharts</p>
    </div>
  )
}
