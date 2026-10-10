'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import CartBadge from './CartBadge'
import ThemePicker from './ThemePicker'

import { usePauseCart } from '@/context/PauseCartContext'

export default function Nav() {
  const pathname = usePathname()
  const { readyItems = [] } = usePauseCart() || {}
  const readyCount = readyItems.length

  const links = [
    { href: '/products', label: '1. เลือกดูสินค้า' },
    { href: '/cart', label: '2. ตะกร้าพักคิด' },
    { href: '/ready', label: '3. พร้อมตัดสินใจ', badge: readyCount },
    { href: '/history', label: 'สรุปการตัดสินใจ' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-[#E8E8EC] bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-[56px] max-w-[1280px] items-center justify-between gap-2 px-3 sm:gap-6 sm:px-8">
        <Link href="/" aria-label="Pause หน้าแรก" className="flex shrink-0 items-center gap-2.5">
          <span aria-hidden="true" className="flex size-8 items-center justify-center gap-[4px] rounded-[8px] bg-[#202124]">
            <span className="h-3.5 w-[3px] rounded-[1px] bg-white" /><span className="h-3.5 w-[3px] rounded-[1px] bg-white" />
          </span>
          <span className="font-display text-[25px] font-semibold tracking-[-.07em]">pause<span className="text-[#85858d]">.</span></span>
        </Link>
        <nav aria-label="เมนูหลัก" className="hidden h-full items-center gap-7 md:flex">
          {links.map(({ href, label, badge }) => (
            <Link key={href} href={href} aria-current={pathname.startsWith(href) ? 'page' : undefined}
              className={'inline-flex h-full items-center gap-1.5 border-b-2 text-[13px] font-medium transition-colors ' + (pathname.startsWith(href) ? 'border-[#6366F1] text-[#4F46E5]' : 'border-transparent text-[#6B6B6B] hover:text-[#0A0A0A]')}>
              <span>{label}</span>
              {Boolean(badge) && (
                <span className="inline-flex size-4 items-center justify-center rounded-full bg-emerald-600 text-[9px] font-bold text-white">
                  {badge}
                </span>
              )}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <ThemePicker />
          <Link href="/cart" aria-label="ตะกร้าพัก" aria-current={pathname === '/cart' ? 'page' : undefined} className="flex min-h-10 items-center gap-2.5 rounded-[6px] border border-[#E8E8EC] bg-white px-2.5 text-xs font-medium transition hover:border-[#bfc0ca] sm:px-3.5">
            <svg aria-hidden="true" width="16" height="18" viewBox="0 0 20 22" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3 7h14l1 13H2L3 7Z" /><path d="M6 8V5a4 4 0 0 1 8 0v3" /></svg>
            <span className="hidden sm:inline">ตะกร้าพัก</span> <CartBadge />
          </Link>
        </div>
      </div>
      <nav aria-label="เมนูบนมือถือ" className="flex justify-start gap-5 overflow-x-auto border-t border-[#E8E8EC] px-4 sm:justify-center md:hidden">
        {links.map(({ href, label, badge }) => (
          <Link key={href} href={href} aria-current={pathname.startsWith(href) ? 'page' : undefined} className={'inline-flex shrink-0 items-center gap-1 border-b-2 py-3 text-[11px] font-medium ' + (pathname.startsWith(href) ? 'border-[#6366F1] text-[#4F46E5]' : 'border-transparent text-[#6B6B6B]')}>
            <span>{label}</span>
            {Boolean(badge) && (
              <span className="inline-flex size-3.5 items-center justify-center rounded-full bg-emerald-600 text-[8px] font-bold text-white">
                {badge}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </header>
  )
}
