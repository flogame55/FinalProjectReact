import Link from 'next/link'
import { cookies } from 'next/headers'
import { supabase } from '@/lib/supabase'
import HistoryChart from '@/components/HistoryChart'
import { formatPrice } from '@/lib/presentation'

export const dynamic = 'force-dynamic'
const dateFormatter = new Intl.DateTimeFormat('th-TH', {
  day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Bangkok',
})

export default async function HistoryPage() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('pause-session-id')?.value || ''
  const hasDatabase = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  let logs = []
  let loadFailed = Boolean(sessionId && !hasDatabase)

  // A missing session must never expose another visitor's decision history.
  if (sessionId && hasDatabase) {
    try {
      const { data, error } = await supabase
        .from('DecisionLog')
        .select('price, decisionStatus, skipped, timestamp')
        .eq('sessionId', sessionId)
        .order('timestamp', { ascending: false })
      if (error) {
        loadFailed = true
        console.error('Failed to load decision history:', error.message)
      } else {
        logs = data || []
      }
    } catch (error) {
      loadFailed = true
      console.error('Failed to load decision history:', error)
    }
  }

  const boughtLogs = logs.filter((log) => log.decisionStatus === 'BOUGHT')
  const passedLogs = logs.filter((log) => log.decisionStatus === 'PASSED')
  const priceOf = (log) => Number.isFinite(Number(log.price)) ? Number(log.price) : 0
  const totalSaved = passedLogs.reduce((total, log) => total + priceOf(log), 0)
  const totalSpent = boughtLogs.reduce((total, log) => total + priceOf(log), 0)
  const skippedCount = logs.filter((log) => log.skipped).length
  const decisionCount = boughtLogs.length + passedLogs.length
  const chartData = [
    { name: 'ซื้อจริง', count: boughtLogs.length, color: '#10B981' },
    { name: 'เปลี่ยนใจ', count: passedLogs.length, color: '#6366F1' },
    { name: 'ข้ามเวลา', count: skippedCount, color: '#EF4444' },
  ]

  return (
    <div className="space-y-10 pb-8 sm:space-y-12">
      <header className="page-intro flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">YOUR PAUSE, YOUR PERSPECTIVE</p>
          <h1 className="page-heading">ทุกการตัดสินใจ<br className="sm:hidden" /> มีความหมาย.</h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#6B6B6B] sm:text-base">
            ค่อย ๆ รู้จักการใช้จ่ายของตัวเอง ผ่านสิ่งที่คุณเลือกซื้อและสิ่งที่คุณปล่อยผ่าน
          </p>
        </div>
        <Link href="/products" className="button-secondary shrink-0 self-start sm:self-auto">
          เลือกดูสินค้า <span aria-hidden="true">↗</span>
        </Link>
      </header>

      {loadFailed ? (
        <section className="surface flex flex-col items-start gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8" role="alert">
          <div>
            <p className="font-medium text-[#0A0A0A]">{hasDatabase ? 'ยังโหลดประวัติของคุณไม่ได้' : 'ประวัติการตัดสินใจยังไม่พร้อมใช้งาน'}</p>
            <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">{hasDatabase ? 'ลองใหม่อีกครั้งเพื่อดูยอดและการตัดสินใจล่าสุดของคุณ' : 'หน้านี้จะแสดงยอดและการตัดสินใจของคุณ หลังเชื่อมต่อฐานข้อมูล Supabase'}</p>
          </div>
          {hasDatabase ? <a href="/history" className="button-secondary shrink-0">โหลดอีกครั้ง</a> : <span className="eyebrow shrink-0">COMING SOON</span>}
        </section>
      ) : null}

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard number="01" label="เงินที่ยังอยู่กับคุณ" value={loadFailed ? '—' : formatPrice(totalSaved)} detail="มูลค่ารายการที่คุณเลือกเปลี่ยนใจ" positive />
        <MetricCard number="02" label="ยอดที่เลือกซื้อ" value={loadFailed ? '—' : formatPrice(totalSpent)} detail="มูลค่ารายการที่คุณตัดสินใจซื้อ" />
        <MetricCard number="03" label="ข้ามช่วงพักคิด" value={loadFailed ? '—' : skippedCount.toLocaleString('th-TH')} unit={loadFailed ? undefined : 'รายการ'} detail="นับรวมอยู่ในรายการซื้อและเปลี่ยนใจแล้ว" />
      </div>

      {!loadFailed && decisionCount === 0 ? (
        <section className="surface empty-state px-6 py-14 text-center sm:py-20">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#F3F3F5] text-[#6B6B6B]" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 20V11M12 20V4M19 20V8" strokeLinecap="round" /></svg>
          </div>
          <p className="eyebrow mb-3">A LITTLE TIME. A CLEARER CHOICE.</p>
          <h2 className="text-xl font-medium tracking-tight text-[#0A0A0A] sm:text-2xl">เรื่องราวการช้อปของคุณเริ่มได้จากการพัก</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#6B6B6B]">เมื่อคุณตัดสินใจซื้อหรือเปลี่ยนใจหลังพักสินค้า เราจะรวบรวมภาพรวมการใช้จ่ายของคุณไว้ที่นี่</p>
          <Link href="/products" className="button-primary mt-7 inline-flex">ค้นหาสิ่งที่ใช่ <span aria-hidden="true">↗</span></Link>
        </section>
      ) : !loadFailed ? (
        <>
          <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
            <section className="surface p-6 sm:p-8" aria-labelledby="decisions-heading">
              <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
                <h2 id="decisions-heading" className="text-lg font-medium tracking-tight text-[#0A0A0A]">ภาพรวมการตัดสินใจ</h2>
                <span className="rounded-full bg-[#F5F5F6] px-3 py-1 text-xs text-[#6B6B6B]">{decisionCount.toLocaleString('th-TH')} รายการ</span>
              </div>
              <HistoryChart data={chartData} />
            </section>
            <aside className="flex flex-col justify-between rounded-[12px] border border-[#E8E8EC] bg-[#F3F3EF] p-6 sm:p-8">
              <p className="eyebrow">A NOTE TO YOURSELF</p>
              <div className="py-7">
                <p className="max-w-xs text-2xl font-medium leading-relaxed tracking-tight text-[#0A0A0A]">ซื้อเพราะใช่<br />ก็รู้สึกดีกว่าเสมอ.</p>
                <p className="mt-4 text-sm leading-7 text-[#6B6B6B]">การพักช่วยให้คุณมีเวลาถามตัวเองว่า สิ่งนี้เหมาะกับชีวิตและงบประมาณของคุณในตอนนี้หรือเปล่า</p>
              </div>
              <Link href="/cart" className="inline-flex items-center gap-2 self-start text-sm font-medium text-[#4F46E5] hover:underline">กลับไปดูตะกร้าพัก <span aria-hidden="true">→</span></Link>
            </aside>
          </div>

          <section className="surface overflow-hidden" aria-labelledby="recent-heading">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E8E8EC] px-6 py-5 sm:px-8">
              <h2 id="recent-heading" className="text-lg font-medium tracking-tight text-[#0A0A0A]">การตัดสินใจล่าสุด</h2>
              <span className="text-xs text-[#6B6B6B]">{Math.min(logs.length, 6)} รายการล่าสุด</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-sm">
                <caption className="sr-only">รายการตัดสินใจล่าสุดของคุณ แสดงวันที่ ผลการตัดสินใจ มูลค่า และการข้ามช่วงพัก</caption>
                <thead className="bg-[#FAFAFA] text-xs text-[#6B6B6B]">
                  <tr><th scope="col" className="px-6 py-4 font-medium sm:pl-8">วันที่</th><th scope="col" className="px-4 py-4 font-medium">การตัดสินใจ</th><th scope="col" className="px-4 py-4 text-right font-medium">มูลค่า</th><th scope="col" className="px-6 py-4 text-right font-medium sm:pr-8">ช่วงพัก</th></tr>
                </thead>
                <tbody className="divide-y divide-[#E8E8EC]">
                  {logs.slice(0, 6).map((log, index) => {
                    const passed = log.decisionStatus === 'PASSED'
                    const date = new Date(log.timestamp)
                    return (
                      <tr key={`${log.timestamp}-${index}`}>
                        <td className="px-6 py-5 text-[#6B6B6B] sm:pl-8">{Number.isNaN(date.getTime()) ? '—' : dateFormatter.format(date)}</td>
                        <td className="px-4 py-5"><span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs ${passed ? 'bg-[#EDF7F1] text-[#246344]' : 'bg-[#F3F3F5] text-[#4B4B4B]'}`}><span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${passed ? 'bg-[#3A805A]' : 'bg-[#737373]'}`} />{passed ? 'เปลี่ยนใจ' : log.decisionStatus === 'BOUGHT' ? 'เลือกซื้อ' : 'ยังไม่ระบุ'}</span></td>
                        <td className="px-4 py-5 text-right font-medium tabular-nums">{formatPrice(priceOf(log))}</td>
                        <td className="px-6 py-5 text-right text-xs text-[#6B6B6B] sm:pr-8">{log.skipped ? 'ข้ามเวลารอ' : 'พักครบเวลา'}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </>
      ) : null}

      <p className="text-center text-xs leading-6 text-[#6B6B6B]">พื้นที่เล็ก ๆ สำหรับทบทวนการใช้จ่าย โดยไม่มีคำตอบที่ถูกหรือผิด</p>
    </div>
  )
}

function MetricCard({ number, label, value, unit, detail, positive = false }) {
  return (
    <section className="surface p-6 sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm text-[#6B6B6B]">{label}</h2>
        <span className="text-[11px] tabular-nums text-[#929292]" aria-hidden="true">{number}</span>
      </div>
      <p className={`mt-7 flex flex-wrap items-baseline gap-2 text-4xl font-medium tracking-tight tabular-nums ${positive ? 'text-[#246344]' : 'text-[#0A0A0A]'}`}>{value}{unit ? <span className="text-sm font-normal tracking-normal text-[#6B6B6B]">{unit}</span> : null}</p>
      <p className="mt-3 text-xs leading-6 text-[#6B6B6B]">{detail}</p>
    </section>
  )
}
