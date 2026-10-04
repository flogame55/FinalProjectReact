'use client'

import { useEffect, useState } from 'react'

function formatDuration(milliseconds) {
  const totalSeconds = Math.max(0, Math.ceil(milliseconds / 1000))
  const days = Math.floor(totalSeconds / 86400)
  const clock = [Math.floor(totalSeconds % 86400 / 3600), Math.floor(totalSeconds % 3600 / 60), totalSeconds % 60]
    .map((part) => String(part).padStart(2, '0')).join(':')
  return days ? days + ' วัน ' + clock : clock
}

export default function Countdown({ readyAt, onSkip, isFastForward = false }) {
  const [timeLeft, setTimeLeft] = useState(null)

  useEffect(() => {
    const started = Date.now()
    const deadline = Number(readyAt)
    const update = () => {
      const elapsed = (Date.now() - started) * (isFastForward ? 3600 : 1)
      setTimeLeft(Math.max(0, deadline - started - elapsed))
    }
    update()
    const timer = setInterval(update, 1000)
    return () => clearInterval(timer)
  }, [readyAt, isFastForward])

  const isReady = timeLeft !== null && timeLeft <= 0
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="text-xs text-[#6B6B6B]">{isReady ? 'สถานะ' : 'เหลือเวลาคิด'}</span>
        <span role="timer" aria-live="off" className={'rounded-[6px] px-3 py-2 font-mono text-xs ' + (isReady ? 'bg-emerald-50 text-emerald-700' : 'bg-[#F3F3F6] text-[#33333d]')}>
          {isReady ? 'พร้อมตัดสินใจแล้ว' : timeLeft === null ? '—:—:—' : formatDuration(timeLeft)}
        </span>
      </div>
      {!isReady && onSkip ? <button type="button" onClick={onSkip} className="min-h-10 rounded-[6px] px-2 text-xs text-[#6B6B6B] underline underline-offset-4 hover:text-[#4F46E5]">ข้ามเวลารอ →</button> : null}
    </div>
  )
}
