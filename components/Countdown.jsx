'use client'

// 👤 โฟ — Countdown (ตัวนับเวลาถอยหลังแบบ Real-time ของแต่ละชิ้นใน /cart + ปุ่มข้าม)
import { useState, useEffect } from 'react'

export default function Countdown({ readyAt, onSkip, isFastForward }) {
  const [timeLeft, setTimeLeft] = useState(0)

  useEffect(() => {
    const calculateTime = () => {
      const now = Date.now()
      const diff = readyAt - now
      setTimeLeft(diff > 0 ? diff : 0)
    }

    calculateTime()
    const timer = setInterval(calculateTime, 1000)

    return () => clearInterval(timer)
  }, [readyAt])

  if (timeLeft <= 0) {
    return (
      <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
        ✅ ครบกำหนดเวลาแล้ว! พร้อมตัดสินใจ
      </span>
    )
  }

  const seconds = Math.floor((timeLeft / 1000) % 60)
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60)
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24)
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-slate-500">เหลือเวลาคิด:</span>
        <div className="flex gap-1 text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
          {days > 0 && <span>{days}d</span>}
          <span>{String(hours).padStart(2, '0')}h</span>
          <span>:</span>
          <span>{String(minutes).padStart(2, '0')}m</span>
          <span>:</span>
          <span>{String(seconds).padStart(2, '0')}s</span>
        </div>
      </div>

      <button
        onClick={onSkip}
        className="text-xs font-semibold text-rose-600 hover:text-rose-800 underline self-start sm:self-auto"
      >
        ข้ามเวลารอ →
      </button>
    </div>
  )
}
