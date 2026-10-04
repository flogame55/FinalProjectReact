const COLORS = ['#777787', '#86A991']

export default function HistoryChart({ data = [] }) {
  const total = data.reduce((sum, item) => sum + item.count, 0)

  if (!total) {
    return <p className="rounded-[8px] bg-[#FAFAFA] px-6 py-12 text-center text-sm leading-7 text-[#6B6B6B]">เมื่อคุณตัดสินใจหลังพักสินค้า<br />ภาพรวมของคุณจะปรากฏที่นี่</p>
  }

  return (
    <div>
      <div className="mb-7 flex h-8 w-full overflow-hidden rounded-[6px] bg-[#F3F3F5]" aria-hidden="true">
        {data.map((item, index) => (
          <div key={item.name} style={{ width: `${(item.count / total) * 100}%`, backgroundColor: COLORS[index % COLORS.length] }} />
        ))}
      </div>
      <dl className="space-y-5">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center justify-between gap-4">
            <dt className="flex items-center gap-3 text-sm text-[#4B4B4B]"><span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />{item.name}</dt>
            <dd className="flex items-baseline gap-4 text-sm tabular-nums"><span className="font-medium text-[#0A0A0A]">{item.count.toLocaleString('th-TH')} รายการ</span><span className="w-12 text-right text-xs text-[#6B6B6B]">{((item.count / total) * 100).toLocaleString('th-TH', { maximumFractionDigits: 1 })}%</span></dd>
          </div>
        ))}
      </dl>
      <p className="mt-7 border-t border-[#E8E8EC] pt-5 text-xs leading-6 text-[#6B6B6B]">รายการที่ข้ามเวลารอยังคงนับในผลการตัดสินใจด้านบน จึงไม่นับซ้ำเป็นอีกประเภท</p>
    </div>
  )
}