// ============================================================================
// 👤 กิต — app/history/page.jsx
// ============================================================================
// หน้าที่: หน้าแดชบอร์ดสถิติและประวัติส่วนตัว (Insights)
//
// 📋 TODO สำหรับกิต:
// 1. [ ] อ่าน `sessionId` จากคุกกี้เพื่อแยกดูเฉพาะสถิติของเครื่องตัวเอง:
//        ```javascript
//        const cookieStore = await cookies()
//        const sessionId = cookieStore.get('pause-session-id')?.value || ''
//        ```
// 2. [ ] Query ข้อมูลจากตาราง `DecisionLog` ใน Supabase:
//        ```javascript
//        let query = supabase.from('DecisionLog').select('*')
//        if (sessionId) {
//          query = query.eq('sessionId', sessionId)
//        }
//        const { data: logs } = await query.order('timestamp', { ascending: false })
//        ```
// 3. [ ] คำนวณตัวเลขสถิติ 3 ด้าน:
//        - `totalSaved`: ยอดเงินที่ประหยัดได้ (ผลรวมราคาของรายการที่ decisionStatus === 'PASSED')
//        - `totalSpent`: ยอดซื้อจริง (ผลรวมราคาของรายการที่ decisionStatus === 'BOUGHT')
//        - `skippedCount`: จำนวนรายการที่กดข้ามเวลารอ (skipped === true)
// 4. [ ] จัดเตรียมข้อมูลสำหรับส่งให้กราฟ `chartData`:
//        ```javascript
//        const chartData = [
//          { name: 'ซื้อจริง (Bought)', count: boughtCount },
//          { name: 'เปลี่ยนใจ (Passed)', count: passedCount },
//          { name: 'ข้ามไปเลย (Skipped)', count: skippedCount },
//        ]
//        ```
// 5. [ ] ออกแบบ 3 Metric Cards และกรอบครอบกราฟตาม genesis-DESIGN.md:
//        - Cards: `rounded-[12px] border border-[#E8E8EC] bg-white p-6`
//        - ตัวเลขสถิติ: `text-3xl font-bold text-[#0A0A0A]`
//        - วางคอมโพเนนต์ `<HistoryChart data={chartData} />`
// ============================================================================

import { cookies } from 'next/headers'
import { supabase } from '@/lib/supabase'
import HistoryChart from '@/components/HistoryChart'

export const dynamic = 'force-dynamic'

export default async function HistoryPage() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('pause-session-id')?.value || ''

  // TODO (กิต): ดึงข้อมูลจากตาราง DecisionLog (กรองด้วย sessionId) และคำนวณตัวเลขสถิติ
  const totalSaved = 0
  const totalSpent = 0
  const chartData = []

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#0A0A0A]">สถิติและข้อมูลเชิงลึก (Insights)</h1>
        <p className="text-xs text-[#6B6B6B]">
          วิเคราะห์พฤติกรรม Impulse Buying และยอดเงินที่คุณประหยัดได้จากระบบ Pause
        </p>
      </div>

      {/* 
        TODO (กิต): 
        1. ออกแบบ 3 Metric Cards (ยอดเงินประหยัดได้, ยอดซื้อจริง, รายการข้ามเวลา)
        2. วางคอมโพเนนต์ <HistoryChart data={chartData} />
      */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* เขียน 3 Metric Cards ที่นี่ */}
      </div>

      <div className="rounded-[12px] border border-[#E8E8EC] bg-white p-6">
        <h2 className="text-base font-bold text-[#0A0A0A] mb-4">สัดส่วนการตัดสินใจ</h2>
        <HistoryChart data={chartData} />
      </div>
    </div>
  )
}
