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
// 3. [ ] จัดรูปแบบข้อมูลแล้วส่งให้คอมโพเนนต์ `<HistoryChart data={...} />`
// 4. [ ] ออกแบบ Metric Cards ตาม genesis-DESIGN.md:
//        - Cards: surface #FFFFFF, border 1px #E8E8EC, radius 12px
//        - ตัวเลขขนาดใหญ่ 32px-40px bold
// ============================================================================

import { supabase } from '@/lib/supabase'
import HistoryChart from '@/components/HistoryChart'

export const dynamic = 'force-dynamic'

export default async function HistoryPage() {
  // TODO (โฟ): เขียน query ดึงข้อมูล DecisionLog จาก Supabase
  let logs = []

  // TODO (โฟ): คำนวณยอดเงินประหยัดได้ ยอดซื้อจริง และสถิติข้ามเวลา
  const totalSaved = 0
  const totalSpent = 0
  const chartData = [
    { name: 'ซื้อจริง (Bought)', count: 0 },
    { name: 'เปลี่ยนใจ (Passed)', count: 0 },
    { name: 'ข้ามไปเลย (Skipped)', count: 0 },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#0A0A0A]">สถิติและข้อมูลเชิงลึก (Insights)</h1>
        <p className="text-xs text-[#6B6B6B]">
          วิเคราะห์พฤติกรรม Impulse Buying และยอดเงินที่คุณประหยัดได้จากระบบ Pause
        </p>
      </div>

      {/* TODO (โฟ): ออกแบบ 3 Metric Cards สรุปตัวเลขตาม genesis-DESIGN.md */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-[12px] border border-[#E8E8EC] bg-white p-6">
          <p className="text-xs text-[#10B981] font-semibold">💰 ประหยัดเงินไปได้</p>
          <p className="text-3xl font-bold text-[#0A0A0A] mt-2">฿{totalSaved.toLocaleString()}</p>
        </div>
        <div className="rounded-[12px] border border-[#E8E8EC] bg-white p-6">
          <p className="text-xs text-[#6B6B6B] font-semibold">🛍️ ยอดซื้อจริง</p>
          <p className="text-3xl font-bold text-[#0A0A0A] mt-2">฿{totalSpent.toLocaleString()}</p>
        </div>
        <div className="rounded-[12px] border border-[#E8E8EC] bg-white p-6">
          <p className="text-xs text-[#EF4444] font-semibold">⚡ ข้ามเวลารอ</p>
          <p className="text-3xl font-bold text-[#0A0A0A] mt-2">0 ชิ้น</p>
        </div>
      </div>

      {/* TODO (โฟ): แสดงกราฟสถิติ HistoryChart */}
      <div className="rounded-[12px] border border-[#E8E8EC] bg-white p-6">
        <h2 className="text-base font-bold text-[#0A0A0A] mb-4">สัดส่วนการตัดสินใจ</h2>
        <HistoryChart data={chartData} />
      </div>
    </div>
  )
}
