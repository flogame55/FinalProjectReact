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

  async function handlePass(item) {
    removeItem(item.productId)
    const res = await passItemAction({
      sessionId,
      productId: item.productId,
      price: item.product?.price || 0,
      skipped: item.skipped,
    })
    if (res?.ok) {
      setNotice('นำสินค้าออกจากตะกร้าพักแล้ว และบันทึกการเปลี่ยนใจลงในประวัติเรียบร้อย 🎉')
    } else {
      setNotice('นำสินค้าออกจากตะกร้าพักแล้ว')
    }
  }

  async function handleConfirm(formData) {
    if (!selectedForCheckout) return { ok: false }
    const res = await confirmPurchaseAction({
      sessionId,
      productId: selectedForCheckout.productId,
      price: selectedForCheckout.product?.price || 0,
      skipped: selectedForCheckout.skipped,
      form: formData,
    })
    if (res?.ok) {
      removeItem(selectedForCheckout.productId)
      setSelectedForCheckout(null)
      setNotice('ยืนยันคำสั่งซื้อสำเร็จ! บันทึกผลลงในประวัติและสถิติเรียบร้อย 🛍️')
    }
    return res
  }

  return (
    <div className="space-y-8 pb-12 sm:space-y-10">
      <div className="page-intro flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">{selectedForCheckout ? 'STEP 02 · ORDER REVIEW' : 'Choose with intention'}</p>
          <h1 className="page-heading mt-3">{selectedForCheckout ? 'ทบทวนก่อนสั่งซื้อ' : 'พร้อมแล้ว ค่อยตัดสินใจ'}</h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#6B6B6B] sm:text-base">{selectedForCheckout ? 'ตรวจดูสินค้าและราคาอีกครั้ง ก่อนดำเนินการในขั้นตอนถัดไป' : <>ได้ให้เวลากับตัวเองแล้ว ตอนนี้คุณยังอยากได้อยู่ไหม?<br className="hidden sm:block" /> ทั้งการเลือกซื้อและการเปลี่ยนใจ เป็นการตัดสินใจที่ดีได้</>}</p>
        </div>
        <Link href="/cart" className="button-secondary"><span aria-hidden="true">←</span> {selectedForCheckout ? 'แก้ไขในตะกร้าพัก' : 'กลับไปตะกร้าพัก'}</Link>
      </div>

      {notice && <p role="status" className="rounded-[12px] border border-emerald-100 bg-emerald-50 px-5 py-4 text-sm leading-6 text-emerald-800">{notice}</p>}

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
          <p className="mt-3 max-w-sm text-sm leading-7 text-[#6B6B6B]">เมื่อครบเวลาพัก สินค้าของคุณจะมาอยู่ตรงนี้<br />ระหว่างนี้ ให้ตัวเองได้พักจากการเลือกซื้อสักนิด</p>
          <Link href="/cart" className="button-primary mt-7">ดูตะกร้าพัก <span aria-hidden="true">→</span></Link>
        </div>
      ) : (
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="space-y-4">
            <p className="mb-5 text-sm text-[#6B6B6B]">{readyItems.length} รายการที่พร้อมให้คุณทบทวน</p>
            {readyItems.map((item) => {
              const product = item.product
              return (
                <article key={item.productId} className="surface p-5 sm:p-6">
                  <div className="flex gap-4 sm:gap-6">
                    <Link href={`/products/${item.productId}`} className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-[#F6F6F7] sm:h-28 sm:w-28" aria-label={`ดู ${product?.name || 'รายละเอียดสินค้า'}`}>
                      {product?.imageUrl ? <Image src={product.imageUrl} alt={product.name} fill sizes="112px" className="object-contain p-3" /> : <span className="text-xs text-[#9C9C9C]">ไม่มีภาพ</span>}
                    </Link>
                    <div className="min-w-0 flex-1">
                      <span className="inline-flex items-center gap-2 text-xs text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />{item.skipped ? 'คุณเลือกข้ามเวลาพัก' : 'ครบเวลาพักแล้ว'}</span>
                      <h2 className="mt-2 text-base font-medium leading-6"><Link href={`/products/${item.productId}`} className="hover:text-[#6366F1]">{product?.name || `สินค้า #${item.productId}`}</Link></h2>
                      <p className="mt-3 font-medium">{product ? formatPrice(product.price) : 'ดูราคาที่หน้าสินค้า'}</p>
                      <ExchangeRateCaption product={product} className="mt-1 text-[10px] text-[#85858d]" />
                    </div>
                  </div>
                  <div className="mt-5 flex flex-col gap-3 border-t border-[#E8E8EC] pt-5 sm:flex-row">
                    {product ? <button type="button" onClick={() => { setNotice(''); setSelectedForCheckout(item) }} className="button-secondary flex-1">ทบทวนรายการ <span aria-hidden="true">→</span></button> : <Link href={`/products/${item.productId}`} className="button-secondary flex-1">ดูรายละเอียดสินค้า</Link>}
                    <button type="button" onClick={() => handlePass(item)} className="button-secondary flex-1">เปลี่ยนใจ · นำออกจากตะกร้า</button>
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
                <li className="flex gap-3"><span className="font-mono text-xs text-[#9C9C9C]">01</span><span>ฉันจะได้ใช้สิ่งนี้ในชีวิตประจำวันไหม?</span></li>
                <li className="flex gap-3"><span className="font-mono text-xs text-[#9C9C9C]">02</span><span>ฉันมีของที่ใช้แทนกันได้อยู่แล้วหรือเปล่า?</span></li>
                <li className="flex gap-3"><span className="font-mono text-xs text-[#9C9C9C]">03</span><span>ราคานี้อยู่ในงบที่ฉันตั้งใจไว้ไหม?</span></li>
              </ol>
            </div>
            <p className="mt-5 px-1 text-xs leading-6 text-[#6B6B6B]">ขณะนี้เปิดให้ทดลองเลือกสินค้าและพักคิด ส่วนการสั่งซื้อและชำระเงินจริงยังไม่เปิดให้บริการ</p>
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
