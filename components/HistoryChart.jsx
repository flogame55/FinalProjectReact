'use client'

// 👤 โฟ — HistoryChart (กราฟแดชบอร์ดสถิติด้วย Recharts แยก Bought vs Passed vs Skipped)
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts'

export default function HistoryChart({ data = [] }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
        ยังไม่มีประวัติการตัดสินใจเพียงพอสำหรับสร้างกราฟ
      </div>
    )
  }

  const COLORS = {
    'ซื้อจริง (Bought)': '#10b981',
    'เปลี่ยนใจ (Passed)': '#6366f1',
    'ข้ามไปเลย (Skipped)': '#f43f5e',
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(value, name) => [`${value} รายการ`, 'จำนวน']}
            contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
          />
          <Bar dataKey="count" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#94a3b8'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
