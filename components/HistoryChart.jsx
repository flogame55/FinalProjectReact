'use client'

// ============================================================================
// 👤 กิต — components/HistoryChart.jsx
// ============================================================================
// หน้าที่: แสดงกราฟแท่งเปรียบเทียบสถิติการตัดสินใจด้วย Recharts
// - เปรียบเทียบ 3 กลุ่ม: ซื้อจริง (#10B981), เปลี่ยนใจ (#6366F1), ข้ามเวลา (#EF4444)
// - ใช้งาน ResponsiveContainer, BarChart, Tooltip ตามมาตรฐาน genesis-DESIGN
// - จัดการ Empty State เมื่อยังไม่มีข้อมูล
// ============================================================================

import { useEffect, useState } from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts'

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const item = payload[0].payload
    return (
      <div className="rounded-[6px] border border-[#E8E8EC] bg-white px-3.5 py-2.5 shadow-md">
        <p className="text-xs font-medium text-[#6B6B6B]">{item.name}</p>
        <p className="mt-1 font-mono text-sm font-semibold" style={{ color: item.color }}>
          {item.count.toLocaleString('th-TH')} รายการ
        </p>
      </div>
    )
  }
  return null
}

export default function HistoryChart({ data = [] }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const total = data.reduce((sum, item) => sum + (Number(item?.count) || 0), 0)

  if (!total) {
    return (
      <div className="flex h-56 items-center justify-center rounded-[8px] bg-[#FAFAFA] px-6 py-12 text-center text-sm leading-7 text-[#6B6B6B]">
        เมื่อคุณตัดสินใจหลังพักสินค้า<br />ภาพรวมของคุณจะปรากฏที่นี่
      </div>
    )
  }

  if (!mounted) {
    return <div className="h-64 animate-pulse rounded-[8px] bg-[#F3F3F5]" />
  }

  return (
    <div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 12, right: 12, left: -20, bottom: 0 }}>
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: '#6B6B6B' }}
              axisLine={{ stroke: '#E8E8EC' }}
              tickLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 12, fill: '#6B6B6B' }}
              axisLine={{ stroke: '#E8E8EC' }}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.03)' }} />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || '#6366F1'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <dl className="mt-6 grid grid-cols-3 gap-2.5 border-t border-[#E8E8EC] pt-5 sm:gap-4">
        {data.map((item) => (
          <div key={item.name} className="flex flex-col gap-1">
            <dt className="flex items-center gap-2 text-xs text-[#6B6B6B]">
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="truncate">{item.name}</span>
            </dt>
            <dd className="font-mono text-sm font-semibold text-[#0A0A0A] tabular-nums sm:text-base">
              {item.count.toLocaleString('th-TH')}
              <span className="ml-1 text-[11px] font-normal text-[#6B6B6B]">
                ({total > 0 ? Math.round((item.count / total) * 100) : 0}%)
              </span>
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-5 border-t border-[#E8E8EC] pt-4 text-[11px] leading-5 text-[#6B6B6B]">
        รายการข้ามเวลาพักคิดจะถูกบันทึกแยกในกลุ่มสีแดง เพื่อเปรียบเทียบกับรายการที่พักคิดครบกำหนด
      </p>
    </div>
  )
}