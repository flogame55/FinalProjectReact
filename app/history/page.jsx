// ============================================================================
// 👤 โฟ — app/history/page.jsx
// ============================================================================
// หน้าที่: หน้าแดชบอร์ดสถิติและประวัติส่วนตัว (Insights)
//
// 📋 TODO สำหรับโฟ:
// 1. [ ] Query ข้อมูลจากตาราง `DecisionLog` ใน Supabase
// 2. [ ] สรุปตัวเลขสถิติ 3 ด้าน:
//        - ยอดเงินที่ประหยัดได้ (ผลรวม price ของรายการสถานะ 'PASSED')
//        - ยอดซื้อจริง (ผลรวม price ของรายการสถานะ 'BOUGHT')
//        - จำนวนรายการที่กดข้ามเวลารอ (skipped === true)
// 3. [ ] นำข้อมูลมาแปลงเป็นสัดส่วนเพื่อส่งให้ `<HistoryChart data={chartData} />`
// 4. [ ] ออกแบบ Metric Cards และจัดหน้าตาม genesis-DESIGN.md:
//        - Cards: surface #FFFFFF, border 1px #E8E8EC, radius 12px
//        - ตัวเลขขนาดใหญ่ 32px-40px bold
// ============================================================================

import { supabase } from '@/lib/supabase'
import HistoryChart from '@/components/HistoryChart'

export const dynamic = 'force-dynamic'

export default async function HistoryPage() {
  let logs = []

  try {
    // TODO (โฟ): เขียน query ดึง DecisionLog พร้อม join Product
    const { data, error } = await supabase
      .from('DecisionLog')
      .select('*, Product(name, category)')
      .order('timestamp', { ascending: false })

    if (!error && data) {
      logs = data
    }
  } catch (err) {
    console.warn('TODO (โฟ): จัดการ error การดึงข้อมูลสถิติ', err.message)
  }

  // ตัวอย่างข้อมูล Fallback หากยังไม่ได้ต่อ Supabase
  if (logs.length === 0) {
    logs = [
      { id: 1, price: 4990, decisionStatus: 'PASSED', skipped: false },
      { id: 2, price: 1890, decisionStatus: 'BOUGHT', skipped: false },
      { id: 3, price: 650, decisionStatus: 'PASSED', skipped: true },
    ]
  }

  // TODO (โฟ): คำนวณยอดเงินและสัดส่วนสถิติ
  const boughtLogs = logs.filter((l) => l.decisionStatus === 'BOUGHT')
  const passedLogs = logs.filter((l) => l.decisionStatus === 'PASSED')
  const skippedLogs = logs.filter((l) => l.skipped)

  const totalSaved = passedLogs.reduce((sum, l) => sum + (l.price || 0), 0)
  const totalSpent = boughtLogs.reduce((sum, l) => sum + (l.price || 0), 0)

  const chartData = [
    { name: 'ซื้อจริง (Bought)', count: boughtLogs.length },
    { name: 'เปลี่ยนใจ (Passed)', count: passedLogs.length },
    { name: 'ข้ามไปเลย (Skipped)', count: skippedLogs.length },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#0A0A0A]">สถิติและข้อมูลเชิงลึก (Insights)</h1>
        <p className="text-xs text-[#6B6B6B]">
          วิเคราะห์พฤติกรรม Impulse Buying และยอดเงินที่คุณประหยัดได้จากระบบ Pause
        </p>
      </div>

      {/* TODO (โฟ): ตกแต่ง Metric Cards สรุปตัวเลขตาม genesis-DESIGN.md */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-[12px] border border-[#E8E8EC] bg-white p-6 shadow-xs">
          <p className="text-xs font-semibold text-[#10B981] uppercase tracking-wider">
            💰 ประหยัดเงินไปได้
          </p>
          <p className="mt-2 text-3xl font-bold text-[#0A0A0A]">฿{totalSaved.toLocaleString()}</p>
          <p className="mt-1 text-xs text-[#6B6B6B]">จากการเปลี่ยนใจไม่ซื้อ {passedLogs.length} รายการ</p>
        </div>

        <div className="rounded-[12px] border border-[#E8E8EC] bg-white p-6 shadow-xs">
          <p className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">
            🛍️ ยอดซื้อจริงหลังคิดรอบคอบ
          </p>
          <p className="mt-2 text-3xl font-bold text-[#0A0A0A]">฿{totalSpent.toLocaleString()}</p>
          <p className="mt-1 text-xs text-[#6B6B6B]">จำนวน {boughtLogs.length} รายการ</p>
        </div>

        <div className="rounded-[12px] border border-[#E8E8EC] bg-white p-6 shadow-xs">
          <p className="text-xs font-semibold text-[#EF4444] uppercase tracking-wider">
            ⚡ สินค้าที่ข้ามเวลารอ
          </p>
          <p className="mt-2 text-3xl font-bold text-[#0A0A0A]">{skippedLogs.length} ชิ้น</p>
          <p className="mt-1 text-xs text-[#6B6B6B]">สินค้าที่ตัดสินใจซื้อทันทีโดยไม่พักคิด</p>
        </div>
      </div>

      {/* TODO (โฟ): วางคอมโพเนนต์กราฟ HistoryChart */}
      <div className="rounded-[12px] border border-[#E8E8EC] bg-white p-6 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-[#0A0A0A]">สัดส่วนการตัดสินใจ (Decision Breakdown)</h2>
        <HistoryChart data={chartData} />
      </div>
    </div>
  )
}
