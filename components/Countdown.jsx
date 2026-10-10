'use client'

import { useEffect, useState } from 'react'

function formatDuration(milliseconds) {
  const totalSeconds = Math.max(0, Math.ceil(milliseconds / 1000))
  const days = Math.floor(totalSeconds / 86400)
  const clock = [Math.floor(totalSeconds % 86400 / 3600), Math.floor(totalSeconds % 3600 / 60), totalSeconds % 60]
    .map((part) => String(part).padStart(2, '0')).join(':')
  return days ? days + ' วัน ' + clock : clock
}

export default function Countdown({ startedAt, readyAt, durationMs, onSkip, isFastForward = false }) {
  const [timeLeft, setTimeLeft] = useState(null)

  useEffect(() => {
    const update = () => {
      setTimeLeft(Math.max(0, Number(readyAt) - Date.now()))
    }
    update()
    const timer = setInterval(update, isFastForward ? 250 : 1000)
    return () => clearInterval(timer)
  }, [readyAt, isFastForward])

  const isReady = timeLeft !== null && timeLeft <= 0
  const totalDuration = Number(durationMs) || Number(readyAt) - Number(startedAt)
  const progress = timeLeft === null || !Number.isFinite(totalDuration) || totalDuration <= 0
    ? 0
    : Math.round(Math.min(100, Math.max(0, ((totalDuration - timeLeft) / totalDuration) * 100)))

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-xs text-[#6B6B6B]">เหลือเวลาคิด</span>
          <span role="timer" aria-live="off" className="rounded-[6px] bg-[#F3F3F6] px-3 py-2 font-mono text-xs text-[#33333d]">
            {timeLeft === null ? '—:—:—' : formatDuration(timeLeft)}
          </span>
        </div>
        {!isReady && onSkip ? <button type="button" onClick={onSkip} className="min-h-10 rounded-[6px] px-2 text-xs text-[#6B6B6B] underline underline-offset-4 hover:text-[#4F46E5]">ข้ามเวลารอ →</button> : null}
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[10px] text-[#85858d]">
          <span>ความคืบหน้าเวลาพักคิด</span>
          <span>{progress}% ผ่านไป</span>
        </div>
        <div
          role="progressbar"
          aria-label="ความคืบหน้าเวลาพักคิด"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          aria-valuetext={`ผ่านไป ${progress}%`}
          className="h-1.5 overflow-hidden rounded-full bg-[#ECECF1]"
        >
          <div className="h-full rounded-full bg-[#6366F1] transition-[width] duration-1000 ease-linear" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}
