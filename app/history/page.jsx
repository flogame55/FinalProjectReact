// 👤 โฟ — app/history/page.jsx (หน้าสถิติและประวัติส่วนตัว Insights แดชบอร์ดสรุปผลการตัดสินใจ)
import { supabase } from '@/lib/supabase'
import HistoryChart from '@/components/HistoryChart'

export const dynamic = 'force-dynamic'

export default async function HistoryPage() {
  let logs = []

  try {
    const { data, error } = await supabase
      .from('DecisionLog')
      .select('*, Product(name, category)')
      .order('timestamp', { ascending: false })

    if (!error && data) {
      logs = data
    }
  } catch (err) {
    console.warn('Could not fetch DecisionLog, using demo data', err.message)
  }

  // ตัวอย่างข้อมูลแสดงผลถ้ายังไม่มีข้อมูลใน DB
  if (logs.length === 0) {
    logs = [
      { id: 1, price: 4990, decisionStatus: 'PASSED', skipped: false },
      { id: 2, price: 1890, decisionStatus: 'BOUGHT', skipped: false },
      { id: 3, price: 650, decisionStatus: 'PASSED', skipped: true },
    ]
  }

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
        <h1 className="text-2xl font-bold text-slate-900">
          สถิติและข้อมูลเชิงลึก (Insights)
        </h1>
        <p className="text-xs text-slate-500">
          วิเคราะห์พฤติกรรม Impulse Buying และยอดเงินที่คุณประหยัดได้จากระบบ Pause
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-xs">
          <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
            💰 ประหยัดเงินไปได้
          </p>
          <p className="mt-2 text-3xl font-black text-emerald-950">
            ฿{totalSaved.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-emerald-700">
            จากการเปลี่ยนใจไม่ซื้อ {passedLogs.length} รายการ
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            🛍️ ยอดซื้อจริงหลังคิดรอบคอบ
          </p>
          <p className="mt-2 text-3xl font-black text-slate-900">
            ฿{totalSpent.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            จำนวน {boughtLogs.length} รายการ
          </p>
        </div>

        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 shadow-xs">
          <p className="text-xs font-bold text-rose-800 uppercase tracking-wider">
            ⚡ สินค้าที่ข้ามเวลารอ
          </p>
          <p className="mt-2 text-3xl font-black text-rose-950">
            {skippedLogs.length} ชิ้น
          </p>
          <p className="mt-1 text-xs text-rose-700">
            สินค้าที่ตัดสินใจซื้อทันทีโดยไม่พักคิด
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          สัดส่วนการตัดสินใจ (Decision Breakdown)
        </h2>
        <HistoryChart data={chartData} />
      </div>
    </div>
  )
}
