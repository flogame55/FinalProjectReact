'use client'

// ============================================================================
// 👤 โฟ — components/HistoryChart.jsx
// ============================================================================
// หน้าที่: แสดงผลกราฟสถิติการตัดสินใจด้วย Recharts (Client Component)
//
// 📋 TODO สำหรับโฟ:
// 1. [ ] นำ Recharts มาเรนเดอร์กราฟ (BarChart, PieChart หรือ Bar)
// 2. [ ] แสดงผลเปรียบเทียบสัดส่วน 3 กลุ่ม:
//        - ซื้อจริง (Bought) -> สี Success #10B981
//        - เปลี่ยนใจไม่ซื้อ (Passed) -> สี Indigo #6366F1
//        - ข้ามเวลา (Skipped) -> สี Red #EF4444
// 3. [ ] รองรับ ResponsiveContainer และ Empty State เมื่อยังไม่มีข้อมูล
// 4. [ ] ออกแบบตาม genesis-DESIGN.md
// ============================================================================

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

export default function HistoryChart({ data = [] }) {
  // TODO (โฟ): จัดการ Empty State ถ้าไม่มีข้อมูล
  if (!data || data.length === 0) {
    return (
      <div className="flex h-60 items-center justify-center rounded-[12px] border border-dashed border-[#E8E8EC] p-6 text-sm text-[#6B6B6B]">
        ยังไม่มีข้อมูลสถิติเพียงพอสำหรับสร้างกราฟ
      </div>
    )
  }

  // TODO (โฟ): เขียนกราฟด้วย Recharts ตาม genesis-DESIGN.md
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#6366F1" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
