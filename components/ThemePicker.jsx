'use client'

import { useEffect, useState } from 'react'

const themes = [
  { id: 'bold', label: 'เท่', icon: '✦' },
  { id: 'luxury', label: 'หรู', icon: '◇' },
  { id: 'minimal', label: 'มินิมอล', icon: '○' },
]

export default function ThemePicker() {
  const [activeTheme, setActiveTheme] = useState('minimal')

  useEffect(() => {
    const saved = window.localStorage.getItem('pause-theme')
    const nextTheme = themes.some((theme) => theme.id === saved) ? saved : 'minimal'
    setActiveTheme(nextTheme)
    document.documentElement.dataset.theme = nextTheme
  }, [])

  function chooseTheme(theme) {
    setActiveTheme(theme)
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('pause-theme', theme)
  }

  return (
    <div className="theme-switcher" role="group" aria-label="เลือกรูปแบบเว็บไซต์">
      {themes.map((theme) => (
        <button
          key={theme.id}
          type="button"
          aria-pressed={activeTheme === theme.id}
          aria-label={`ใช้ดีไซน์${theme.label}`}
          title={`ดีไซน์${theme.label}`}
          onClick={() => chooseTheme(theme.id)}
          className="theme-switcher-option"
        >
          <span aria-hidden="true">{theme.icon}</span>
          <span>{theme.label}</span>
        </button>
      ))}
    </div>
  )
}
