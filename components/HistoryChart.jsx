'use client'

// ============================================================================
// 👤 โฟ — components/HistoryChart.jsx
// ============================================================================
// หน้าที่: แสดงผลกราฟสถิติการตัดสินใจด้วย Recharts (Client Component)
//
// 📋 TODO สำหรับโฟ:
// 1. [ ] นำ Recharts มาเรนเดอร์กราฟ (BarChart, PieChart หรือตามที่กลุ่มตกลง)
// 2. [ ] แสดงผลเปรียบเทียบสัดส่วน 3 กลุ่ม:
//        - ซื้อจริง (Bought)
//        - เปลี่ยนใจ (Passed)
//        - ข้ามไปเลย (Skipped)
// 3. [ ] ใช้โทนสีตาม genesis-DESIGN.md:
//        - ซื้อจริง / สำเร็จ: Success Green (#10B981)
//        - เปลี่ยนใจ: Primary Indigo (#6366F1)
//        - ข้ามเวลา / ไม่รอ: Error Rose (#EF4444)
// 4. [ ] รองรับ ResponsiveContainer และสถานะเมื่อยังไม่มีข้อมูล (Empty State)
// ============================================================================

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts'

export default function HistoryChart({ data = [] }) {
  // TODO (โฟ): จัดการ Empty State ถ้ายังไม่มีข้อมูล
  if (!data || data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-[12px] border border-dashed border-[#E8E8EC] bg-white text-sm text-[#9C9C9C]">
        ยังไม่มีประวัติการตัดสินใจเพียงพอสำหรับสร้างกราฟ
      </div>
    )
  }

  // TODO (โฟ): ปรับแต่งสีและกราฟตาม genesis-DESIGN.md
  const COLORS = {
    'ซื้อจริง (Bought)': '#10B981',
    'เปลี่ยนใจ (Passed)': '#6366F1',
    'ข้ามไปเลย (Skipped)': '#EF4444',
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6B6B6B' }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#6B6B6B' }} />
          <Tooltip
            formatter={(value) => [`${value} รายการ`, 'จำนวน']}
            contentStyle={{ borderRadius: '6px', border: '1px solid #E8E8EC' }}
          />
          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#9C9C9C'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
