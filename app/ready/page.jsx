'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePauseCart } from '@/context/PauseCartContext'
import CheckoutForm from '@/components/CheckoutForm'
import ExchangeRateCaption from '@/components/ExchangeRateCaption'
import { confirmPurchaseAction, passItemAction } from '@/app/actions'

const formatPrice = (value) => new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', maximumFractionDigits: 2 }).format(Number(value) || 0)

export default function ReadyPage() {
  const { readyItems, removeItem, hydrated, sessionId } = usePauseCart()
  const [selectedForCheckout, setSelectedForCheckout] = useState(null)
  const [notice, setNotice] = useState('')
  const [decisionResult, setDecisionResult] = useState(null)

  async function handlePass(item) {
    removeItem(item.productId)
    const res = await passItemAction({
      sessionId,
      productId: item.productId,
      price: item.product?.price || 0,
      skipped: item.skipped,
    })
    if (res?.ok) {
      setDecisionResult({
        type: 'PASSED',
        productName: item.product?.name || `สินค้า #${item.productId}`,
        price: item.product?.price || 0,
      })
    } else {
      setNotice('นำสินค้าออกจากตะกร้าพักแล้ว')
    }
  }

  async function handleConfirm(formData) {
    if (!selectedForCheckout) return { ok: false }
    const currentItem = selectedForCheckout
    const res = await confirmPurchaseAction({
      sessionId,
      productId: currentItem.productId,
      price: currentItem.product?.price || 0,
      skipped: currentItem.skipped,
      form: formData,
    })
    if (res?.ok) {
      removeItem(currentItem.productId)
      setSelectedForCheckout(null)
      setDecisionResult({
        type: 'BOUGHT',
        productName: currentItem.product?.name || `สินค้า #${currentItem.productId}`,
        price: currentItem.product?.price || 0,
      })
    }
    return res
  }

  return (
    <div className="space-y-8 pb-12 sm:space-y-10">
      <div className="page-intro flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">{selectedForCheckout ? 'STEP 02 · ORDER REVIEW' : 'STEP 02 · CHOOSE WITH INTENTION'}</p>
          <h1 className="page-heading mt-3">{selectedForCheckout ? 'ทบทวนก่อนสั่งซื้อ' : 'พร้อมแล้ว ค่อยตัดสินใจ'}</h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#6B6B6B] sm:text-base">
            {selectedForCheckout
              ? 'ตรวจดูสินค้าและรายละเอียดอีกครั้ง ก่อนยืนยันคำสั่งซื้อ'
              : 'ได้ให้เวลากับตัวเองแล้ว ตอนนี้คุณยังอยากได้อยู่ไหม? ทั้งการเลือกซื้อและการเปลี่ยนใจ เป็นการตัดสินใจที่ดีทั้งคู่'}
          </p>
        </div>
        <Link href="/cart" className="button-secondary"><span aria-hidden="true">←</span> {selectedForCheckout ? 'แก้ไขในตะกร้าพัก' : 'กลับไปตะกร้าพัก'}</Link>
      </div>

      {notice && <p role="status" className="rounded-[12px] border border-emerald-100 bg-emerald-50 px-5 py-4 text-sm leading-6 text-emerald-800">{notice}</p>}

      {decisionResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="surface w-full max-w-md rounded-[12px] border border-[#E8E8EC] p-6 text-center shadow-xl sm:p-8">
            <div className={`mx-auto mb-5 flex size-14 items-center justify-center rounded-full ${decisionResult.type === 'PASSED' ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-[#6366F1]'}`}>
              {decisionResult.type === 'PASSED' ? (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
              ) : (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
              )}
            </div>

            <p className="eyebrow">
              {decisionResult.type === 'PASSED' ? 'SAVED · ตัดสินใจอย่างมีสติ' : 'CONFIRMED · สั่งซื้อสำเร็จ'}
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#0A0A0A]">
              {decisionResult.type === 'PASSED'
                ? `ยินดีด้วย! คุณประหยัดเงินไปได้ ${formatPrice(decisionResult.price)}`
                : 'สั่งซื้อสำเร็จ! บันทึกลงในสถิติแล้ว'}
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#6B6B6B]">
              {decisionResult.type === 'PASSED' ? (
                <>
                  คุณเลือกที่จะไม่ซื้อ <strong className="text-[#0A0A0A]">{decisionResult.productName}</strong><br />
                  การให้เวลาตัวเองคิดช่วยลดการซื้อด้วยอารมณ์ชั่ววูบได้จริง!
                </>
              ) : (
                <>
                  คุณได้ให้เวลาทบทวน และตัดสินใจซื้อ <strong className="text-[#0A0A0A]">{decisionResult.productName}</strong> อย่างมั่นใจ
                </>
              )}
            </p>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <Link href="/history" className="button-primary flex-1 text-center text-xs py-2.5 sm:text-sm">
                ดูสรุปเงินที่ประหยัดได้ <span aria-hidden="true">→</span>
              </Link>
              <button
                type="button"
                onClick={() => setDecisionResult(null)}
                className="button-secondary flex-1 text-xs py-2.5 sm:text-sm"
              >
                {readyItems.length > 0 ? 'ตัดสินใจรายการถัดไป' : 'เลือกดูสินค้าต่อ'}
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedForCheckout && <CheckoutProgress />}

      {!hydrated ? (
        <div className="surface p-10 text-center text-sm text-[#6B6B6B]" role="status">กำลังเปิดรายการของคุณ…</div>
      ) : selectedForCheckout ? (
        <CheckoutForm
          item={selectedForCheckout}
          checkoutAvailable={true}
          onConfirm={handleConfirm}
          onCancel={() => setSelectedForCheckout(null)}
        />
      ) : readyItems.length === 0 ? (
        <div className="empty-state surface flex min-h-[390px] flex-col items-center justify-center px-6 py-16 text-center">
          <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-slate-400">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true"><circle cx="12" cy="12" r="8" /><path d="M12 7v5l3 2" /></svg>
          </div>
          <p className="eyebrow">No need to rush</p>
          <h2 className="mt-3 text-2xl font-medium tracking-tight">ยังไม่มีรายการที่พร้อมตัดสินใจ</h2>
          <p className="mt-3 max-w-sm text-sm leading-7 text-[#6B6B6B]">เมื่อครบเวลาพัก สินค้าของคุณจะมาแสดงที่นี่<br />หรือหากต้องการทดสอบ ให้เปิดโหมดเร่งเวลาในหน้าตะกร้าพัก</p>
          <Link href="/cart" className="button-primary mt-7">ไปที่ตะกร้าพัก <span aria-hidden="true">→</span></Link>
        </div>
      ) : (
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="space-y-4">
            <p className="mb-5 text-sm text-[#6B6B6B]">{readyItems.length} รายการที่พร้อมให้คุณตัดสินใจ</p>
            {readyItems.map((item) => {
              const product = item.product
              return (
                <article key={item.productId} className="surface p-5 sm:p-6">
                  <div className="flex gap-4 sm:gap-6">
                    <Link href={`/products/${item.productId}`} className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-[#F6F6F7] sm:h-28 sm:w-28" aria-label={`ดู ${product?.name || 'รายละเอียดสินค้า'}`}>
                      {product?.imageUrl ? <Image src={product.imageUrl} alt={product.name} fill sizes="112px" className="object-contain p-3" /> : <span className="text-xs text-[#9C9C9C]">ไม่มีภาพ</span>}
                    </Link>
                    <div className="min-w-0 flex-1">
                      <span className="inline-flex items-center gap-2 text-xs text-emerald-700 font-medium">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        {item.skipped ? 'คุณเลือกข้ามเวลาพัก' : 'ครบเวลาพักคิดแล้ว'}
                      </span>
                      <h2 className="mt-2 text-base font-medium leading-6"><Link href={`/products/${item.productId}`} className="hover:text-[#6366F1]">{product?.name || `สินค้า #${item.productId}`}</Link></h2>
                      <p className="mt-3 font-medium">{product ? formatPrice(product.price) : 'ดูราคาที่หน้าสินค้า'}</p>
                      <ExchangeRateCaption product={product} className="mt-1 text-[10px] text-[#85858d]" />
                    </div>
                  </div>
                  <div className="mt-5 flex flex-col gap-3 border-t border-[#E8E8EC] pt-5 sm:flex-row">
                    {product ? (
                      <button
                        type="button"
                        onClick={() => { setNotice(''); setSelectedForCheckout(item) }}
                        className="button-primary flex-1 text-xs sm:text-sm"
                      >
                        ยังอยากได้ · ดำเนินการสั่งซื้อ 🛍️
                      </button>
                    ) : (
                      <Link href={`/products/${item.productId}`} className="button-primary flex-1 text-xs sm:text-sm">
                        ดูรายละเอียดสินค้า
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={() => handlePass(item)}
                      className="button-secondary flex-1 text-xs sm:text-sm border-emerald-200 bg-emerald-50/50 text-emerald-800 hover:bg-emerald-100/70"
                    >
                      เปลี่ยนใจแล้ว · ไม่ซื้อ (ประหยัดเงิน) 💚
                    </button>
                  </div>
                </article>
              )
            })}
          </div>

          <aside className="pt-0 lg:pt-10">
            <div className="rounded-[12px] bg-[#F1F2F4] p-6">
              <p className="eyebrow">A small check-in</p>
              <h2 className="mt-3 text-xl font-medium tracking-tight">ถามตัวเองอีกสักครั้ง</h2>
              <ol className="mt-5 space-y-5 text-sm leading-7 text-[#6B6B6B]">
                <li className="flex gap-3"><span className="font-mono text-xs text-[#9C9C9C]">01</span><span>ฉันจะได้ใช้สิ่งนี้ในชีวิตประจำวันจริงไหม?</span></li>
                <li className="flex gap-3"><span className="font-mono text-xs text-[#9C9C9C]">02</span><span>ฉันมีของที่ใช้แทนกันได้อยู่แล้วหรือเปล่า?</span></li>
                <li className="flex gap-3"><span className="font-mono text-xs text-[#9C9C9C]">03</span><span>ราคานี้อยู่ในงบที่ฉันตั้งใจไว้ไหม?</span></li>
              </ol>
            </div>
            <p className="mt-5 px-1 text-xs leading-6 text-[#6B6B6B]">นี่คือขั้นตอนจำลองการตัดสินใจ เพื่อบันทึกพฤติกรรมลงในประวัติสถิติของคุณ</p>
          </aside>
        </div>
      )}
    </div>
  )
}

function CheckoutProgress() {
  const steps = [
    { number: '01', label: 'พักสินค้า', status: 'complete' },
    { number: '02', label: 'ทบทวนรายการ', status: 'current' },
    { number: '03', label: 'ยืนยันคำสั่งซื้อ', status: 'upcoming' },
  ]

  return (
    <nav aria-label="ขั้นตอนการสั่งซื้อ" className="surface px-4 py-5 sm:px-7">
      <ol className="grid grid-cols-3 gap-3">
        {steps.map((step) => (
          <li key={step.number} aria-current={step.status === 'current' ? 'step' : undefined} className="relative flex items-center gap-2.5 sm:gap-3">
            <span className={`flex size-8 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${step.status === 'current' ? 'bg-[#6366F1] text-white' : step.status === 'complete' ? 'bg-[#E9F2EC] text-[#38644B]' : 'bg-[#F3F3F5] text-[#92929C]'}`}>{step.status === 'complete' ? '✓' : step.number}</span>
            <span className={`text-[10px] leading-4 sm:text-xs ${step.status === 'current' ? 'font-medium text-[#20211F]' : 'text-[#777780]'}`}>{step.label}</span>
            {step.number !== '03' && <span aria-hidden="true" className="absolute -right-2 hidden h-px w-4 bg-[#E8E8EC] sm:block" />}
          </li>
        ))}
      </ol>
    </nav>
  )
}
