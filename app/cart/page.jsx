'use client'

// ============================================================================
// 📌 Client Component: app/cart/page.jsx (Cart & Cooling-off Space)
// - เหตุผลที่เป็น Client Component: ต้องเข้าถึง Web Browser Storage (localStorage)
//   เพื่ออ่าน/เขียนตะกร้าสินค้าของผู้ใช้คนนั้น และเชื่อมต่อกับ React Context (usePauseCart)
//   รวมถึงควบคุมสวิตช์ toggle เร่งเวลา devFastForward แบบ Interactive
// ============================================================================

import Image from 'next/image'
import Link from 'next/link'
import { usePauseCart } from '@/context/PauseCartContext'
import Countdown from '@/components/Countdown'
import { formatPrice } from '@/lib/presentation'
import UiIcon from '@/components/UiIcon'

export default function CartPage() {
  const { items, readyItems, removeItem, skipItem, hydrated, now, devFastForward, setDevFastForward } = usePauseCart()
  const total = items.reduce((sum, item) => sum + Number(item.product?.price || 0), 0)

  return (
    <div className="space-y-8 pb-12 sm:space-y-10">
      <div className="page-intro flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Your pause space</p>
          <h1 className="page-heading mt-3">ตะกร้าพัก<span className="ml-3 align-top text-lg text-[#9C9C9C]">{items.length.toString().padStart(2, '0')}</span></h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#6B6B6B] sm:text-base">สิ่งที่ชอบยังอยู่ตรงนี้ ให้เวลาตัวเองก่อนตัดสินใจ<br className="hidden sm:block" /> คุณกลับมาเลือกได้เสมอเมื่อพร้อม</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setDevFastForward((prev) => !prev)}
            className={`inline-flex items-center gap-2 rounded-[8px] px-3.5 py-2 text-xs font-medium transition ${
              devFastForward
                ? 'border border-amber-300 bg-amber-100 text-amber-900 ring-2 ring-amber-300/40'
                : 'bg-[#F3F3F5] text-[#55555E] hover:bg-[#E8E8EC]'
            }`}
            title="สำหรับพรีเซนต์: เร่งเวลาคิดให้เดินเร็วขึ้น 3,600 เท่า (1 วินาที = 1 ชั่วโมง)"
          >
            <UiIcon name="bolt" size={14} className={devFastForward ? 'animate-pulse' : ''} />
            <span>{devFastForward ? 'กำลังเร่งเวลา (1 วิ = 1 ชม.)' : 'เร่งเวลา (Dev Mode)'}</span>
          </button>
          <Link href="/products" className="button-secondary">เลือกดูสินค้าต่อ <span aria-hidden="true">↗</span></Link>
        </div>
      </div>

      {!hydrated ? (
        <div className="surface p-10 text-center text-sm text-[#6B6B6B]" role="status">กำลังเปิดตะกร้าพักของคุณ…</div>
      ) : items.length === 0 ? (
        <div className="empty-state surface mx-auto flex min-h-[390px] flex-col items-center justify-center px-6 py-16 text-center">
          <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-slate-400">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true"><path d="M5 7h14l1 13H4L5 7Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
          </div>
          <p className="eyebrow">Good things can wait</p>
          <h2 className="mt-3 text-2xl font-medium tracking-tight">พื้นที่สำหรับสิ่งที่คุณกำลังคิดถึง</h2>
          <p className="mt-3 max-w-sm text-sm leading-7 text-[#6B6B6B]">เจอสินค้าที่ชอบแล้วกด “พักคิดก่อน”<br />เพื่อเก็บไว้ที่นี่ แล้วค่อยกลับมาดูอีกครั้ง</p>
          <Link href="/products" className="button-primary mt-7">ค้นหาสิ่งที่ใช่ <span aria-hidden="true">→</span></Link>
        </div>
      ) : (
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-4">
            {items.map((item) => {
              const product = item.product
              const isReady = item.skipped || item.readyAt <= now
              return (
                <article key={item.productId} className="surface overflow-hidden p-4 sm:p-6">
                  <div className="flex gap-4 sm:gap-6">
                    <Link href={`/products/${item.productId}`} className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#F6F6F7] sm:h-32 sm:w-32" aria-label={`ดู ${product?.name || 'รายละเอียดสินค้า'}`}>
                      {product?.imageUrl ? <Image src={product.imageUrl} alt={product.name} fill sizes="128px" className="object-contain p-3" /> : <span className="text-xs text-[#9C9C9C]">ไม่มีภาพ</span>}
                    </Link>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[11px] uppercase tracking-widest text-[#6B6B6B]">{product?.category || 'สินค้าในตะกร้า'}</p>
                          <h2 className="mt-2 text-sm font-medium leading-6 sm:text-base"><Link href={`/products/${item.productId}`} className="hover:text-[#6366F1]">{product?.name || `สินค้า #${item.productId}`}</Link></h2>
                        </div>
                        <button type="button" onClick={() => removeItem(item.productId)} className="-mr-2 -mt-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] text-[#9C9C9C] hover:bg-rose-50 hover:text-red-600" aria-label={`นำ ${product?.name || 'สินค้า'} ออกจากตะกร้าพัก`}>
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 10v7M14 10v7" /></svg>
                        </button>
                      </div>
                      <p className="mt-2 text-base font-medium">{product ? formatPrice(product.price) : 'ดูราคาที่หน้าสินค้า'}</p>
                      <p className="mt-3 text-xs text-[#6B6B6B]">เริ่มพัก {new Date(item.addedAt).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })}</p>
                    </div>
                  </div>
                  <div className="mt-5 border-t border-[#E8E8EC] pt-4">
                    {isReady ? (
                      <div className="flex flex-wrap items-center justify-between gap-3 rounded-[8px] border border-emerald-200 bg-emerald-50/60 p-3.5">
                        <span className="inline-flex items-center gap-2 text-xs font-medium text-emerald-800">
                          <span className="h-2 w-2 rounded-full bg-emerald-500" />
                          {item.skipped ? 'ข้ามเวลาพักแล้ว · พร้อมตัดสินใจ' : 'ครบเวลาพักคิดแล้ว'}
                        </span>
                        <Link href="/ready" className="button-primary text-xs !py-1.5 !px-3 font-medium">
                          ไปตัดสินใจ (ซื้อหรือผ่าน) <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    ) : <Countdown startedAt={item.addedAt} readyAt={item.readyAt} durationMs={item.durationMs} onSkip={() => skipItem(item.productId, product)} isFastForward={devFastForward} />}
                  </div>
                </article>
              )
            })}
          </div>

          <aside className="surface p-6 lg:sticky lg:top-28">
            <p className="eyebrow">A moment to reflect</p>
            <h2 className="mt-3 text-xl font-medium tracking-tight">ให้เวลาความต้องการ</h2>
            <p className="mt-3 text-sm leading-7 text-[#6B6B6B]">เมื่อเวลาผ่านไป ลองถามตัวเองอีกครั้งว่า “สิ่งนี้ยังเหมาะกับชีวิตของฉันไหม?”</p>
            <dl className="my-6 space-y-4 border-y border-[#E8E8EC] py-5 text-sm">
              <div className="flex justify-between"><dt className="text-[#6B6B6B]">เก็บไว้ทั้งหมด</dt><dd>{items.length} รายการ</dd></div>
              <div className="flex justify-between"><dt className="text-[#6B6B6B]">พร้อมตัดสินใจ</dt><dd className="font-semibold text-emerald-700">{readyItems.length} รายการ</dd></div>
              <div className="flex justify-between"><dt className="text-[#6B6B6B]">มูลค่าสินค้า</dt><dd className="font-medium">{formatPrice(total)}</dd></div>
            </dl>
            <Link href="/ready" className="button-primary w-full text-center">
              {readyItems.length > 0 ? `ไปหน้าตัดสินใจ (${readyItems.length} ชิ้นพร้อมแล้ว) →` : 'ดูรายการที่พร้อมตัดสินใจ →'}
            </Link>
            <p className="mt-4 text-center text-xs leading-5 text-[#6B6B6B]">ตะกร้านี้ยังไม่ใช่คำสั่งซื้อ</p>
          </aside>
        </div>
      )}
    </div>
  )
}
