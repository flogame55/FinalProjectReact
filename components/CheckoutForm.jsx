'use client'

import { useId, useState } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { checkoutSchema } from '@/lib/schemas/checkout'
import { formatPrice } from '@/lib/presentation'
import UiIcon from '@/components/UiIcon'

export default function CheckoutForm({ item, onConfirm, onCancel, checkoutAvailable = false }) {
  const formId = useId()
  const [submitError, setSubmitError] = useState('')
  const product = item.product
  const { register, watch, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(checkoutSchema),
    mode: 'onTouched',
    defaultValues: { fullName: '', address: '', phone: '', paymentMethod: 'promptpay' },
  })
  const selectedPaymentMethod = watch('paymentMethod')
  const paymentMethods = [
    { value: 'promptpay', icon: 'QR', title: 'พร้อมเพย์', description: 'สแกน QR เพื่อชำระเงิน' },
    { value: 'credit_card', icon: '▤', title: 'บัตรเครดิต / เดบิต', description: 'ชำระด้วยบัตรจำลอง' },
    { value: 'cod', icon: '฿', title: 'เก็บเงินปลายทาง', description: 'ชำระเมื่อได้รับสินค้า' },
  ]

  async function onSubmit(formData) {
    if (!checkoutAvailable || !onConfirm) return
    setSubmitError('')
    try {
      const result = await onConfirm(formData)
      if (result?.ok === false) setSubmitError(result.error || 'ยังยืนยันรายการไม่ได้ กรุณาลองอีกครั้ง')
    } catch {
      setSubmitError('ยังยืนยันรายการไม่ได้ กรุณาลองอีกครั้ง')
    }
  }

  function inputProps(name) {
    return {
      id: `${formId}-${name}`,
      'aria-invalid': Boolean(errors[name]),
      'aria-describedby': errors[name] ? `${formId}-${name}-error` : undefined,
      ...register(name),
    }
  }

  function errorFor(name) {
    return errors[name] ? <p id={`${formId}-${name}-error`} className="mt-2 text-xs leading-5 text-red-600">{errors[name].message}</p> : null
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="space-y-5">
        <section className="surface overflow-hidden" aria-labelledby="review-product-heading">
          <div className="border-b border-[#E8E8EC] px-5 py-5 sm:px-7">
            <p className="eyebrow">YOUR PICK, ONE LAST LOOK</p>
            <h2 id="review-product-heading" className="mt-2 text-xl font-medium tracking-tight sm:text-2xl">รายการที่คุณเลือก</h2>
          </div>
          <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-7">
            <div className="relative mx-auto flex aspect-square w-full max-w-[190px] shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-[#F3F3F0] sm:mx-0 sm:size-36">
              {product?.imageUrl ? <Image src={product.imageUrl} alt={product.name} fill sizes="(max-width: 640px) 190px, 144px" className="object-contain p-5" /> : <span className="text-xs text-[#9C9C9C]">ไม่มีภาพ</span>}
            </div>
            <div className="min-w-0 flex-1 text-center sm:text-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#EDF5EF] px-3 py-1 text-[11px] font-medium text-[#38644B]"><span aria-hidden="true" className="size-1.5 rounded-full bg-[#5C8B68]" />{item.skipped ? 'คุณเลือกข้ามเวลาพัก' : 'ครบเวลาพักแล้ว'}</span>
              <h3 className="mt-3 text-lg font-medium leading-7 text-[#20211F] sm:text-xl">{product?.name || `สินค้า #${item.productId}`}</h3>
              <p className="mt-1 text-xs text-[#777780]">จำนวน 1 ชิ้น</p>
              <div className="mt-5 border-t border-[#E8E8EC] pt-4 sm:flex sm:items-end sm:justify-between sm:gap-4">
                <div><p className="text-xs text-[#777780]">ราคาสินค้า</p><p className="mt-1 text-2xl font-semibold tracking-tight text-[#20211F]">{formatPrice(product?.price)}</p></div>
                <p className="mt-4 text-[11px] text-[#777780] sm:mt-0">ค่าส่งคำนวณในขั้นตอนถัดไป</p>
              </div>
            </div>
          </div>
        </section>

        <section className="surface p-5 sm:p-7" aria-labelledby="delivery-heading">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div><p className="eyebrow">DELIVERY DETAILS</p><h2 id="delivery-heading" className="mt-2 text-xl font-medium tracking-tight">ข้อมูลสำหรับจัดส่ง</h2></div>
            <span className="rounded-[4px] bg-[#F3F3F5] px-3 py-1 text-[10px] font-medium text-[#74747F]">ขั้นตอนสาธิต</span>
          </div>
          {!checkoutAvailable && <div id={`${formId}-unavailable`} className="mt-5 flex gap-3 rounded-[8px] border border-[#E8E8EC] bg-[#F8F8F7] p-4" role="status"><span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-[#777780]">i</span><p className="text-xs leading-5 text-[#6B6B6B]">ยังไม่เปิดรับคำสั่งซื้อและยังไม่มีการส่งข้อมูลหรือเรียกเก็บเงิน ช่องด้านล่างมีไว้ดูตัวอย่างขั้นตอนเท่านั้น</p></div>}

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor={`${formId}-fullName`} className="mb-2 block text-xs font-medium text-[#39393E]">ชื่อ–นามสกุล</label>
              <input {...inputProps('fullName')} autoComplete="name" placeholder="ชื่อและนามสกุลผู้รับ" className="input-field w-full" />
              {errorFor('fullName')}
            </div>
            <div>
              <label htmlFor={`${formId}-phone`} className="mb-2 block text-xs font-medium text-[#39393E]">เบอร์โทรศัพท์</label>
              <input {...inputProps('phone')} type="tel" inputMode="numeric" autoComplete="tel" placeholder="08XXXXXXXX" className="input-field w-full" />
              {errorFor('phone')}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor={`${formId}-address`} className="mb-2 block text-xs font-medium text-[#39393E]">ที่อยู่จัดส่ง</label>
              <textarea {...inputProps('address')} autoComplete="street-address" rows={3} placeholder="บ้านเลขที่ ถนน ตำบล/แขวง อำเภอ/เขต จังหวัด และรหัสไปรษณีย์" className="input-field w-full resize-y leading-7" />
              {errorFor('address')}
            </div>
            <div className="sm:col-span-2">
              <fieldset>
                <legend className="mb-2 block text-xs font-medium text-[#39393E]">เลือกช่องทางชำระเงิน</legend>
                <div className="grid gap-3 sm:grid-cols-3">
                  {paymentMethods.map((method) => {
                    const selected = selectedPaymentMethod === method.value
                    return (
                      <label key={method.value} className={`relative flex cursor-pointer gap-3 rounded-[8px] border p-3.5 transition hover:-translate-y-0.5 hover:shadow-sm ${selected ? 'border-[#6366F1] bg-indigo-50/50 ring-1 ring-[#6366F1]' : 'border-[#E8E8EC] bg-white hover:border-[#bfc0ca]'}`}>
                        <input type="radio" value={method.value} {...register('paymentMethod')} className="sr-only" aria-label={method.title} />
                        <span aria-hidden="true" className={`flex size-9 shrink-0 items-center justify-center rounded-[6px] text-xs font-semibold ${selected ? 'bg-[#6366F1] text-white' : 'bg-[#F3F3F5] text-[#55555E]'}`}>{method.icon}</span>
                        <span className="min-w-0">
                          <span className="block text-xs font-semibold text-[#20211F]">{method.title}</span>
                          <span className="mt-1 block text-[10px] leading-4 text-[#777780]">{method.description}</span>
                        </span>
                        <span aria-hidden="true" className={`absolute right-2.5 top-2.5 size-3.5 rounded-full border ${selected ? 'border-[4px] border-[#6366F1]' : 'border-[#C9C9D0]'}`} />
                      </label>
                    )
                  })}
                </div>
                {errorFor('paymentMethod')}
                {selectedPaymentMethod === 'promptpay' && <DemoPromptPay amount={product?.price} />}
                {selectedPaymentMethod === 'credit_card' && <DemoCard />}
                {selectedPaymentMethod === 'cod' && <div className="mt-3 flex gap-3 rounded-[8px] border border-[#E8E8EC] bg-[#F8F8F7] p-4"><UiIcon name="bag" size={18} className="mt-0.5 shrink-0 text-[#6B6B6B]" /><p className="text-[11px] leading-5 text-[#6B6B6B]">ตัวอย่างคำสั่งซื้อเก็บเงินปลายทาง ระบบจะจำลองการยืนยันคำสั่งซื้อโดยไม่เรียกเก็บเงิน</p></div>}
                <p className="mt-3 rounded-[6px] bg-amber-50 px-3 py-2 text-[10px] leading-5 text-amber-900">โหมดสาธิตเท่านั้น: ไม่มีการตัดเงินจริง, QR นี้สแกนชำระไม่ได้ และไม่ต้องกรอกข้อมูลบัตรจริง</p>
              </fieldset>
            </div>
          </div>
        </section>
      </div>

      <aside className="surface p-5 sm:p-6 lg:sticky lg:top-28" aria-labelledby="summary-heading">
        <p className="eyebrow">ORDER SUMMARY</p>
        <h2 id="summary-heading" className="mt-2 text-xl font-medium tracking-tight">สรุปรายการ</h2>
        <div className="my-5 flex items-center gap-3 rounded-[8px] bg-[#F7F7F5] p-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-[#55555E]"><UiIcon name="check" size={15} /></span>
          <p className="text-xs leading-5 text-[#6B6B6B]">คุณได้ให้เวลากับตัวเองก่อนกลับมาทบทวนแล้ว</p>
        </div>
        <dl className="space-y-4 border-y border-[#E8E8EC] py-5 text-sm">
          <div className="flex justify-between gap-4"><dt className="text-[#6B6B6B]">สินค้า 1 ชิ้น</dt><dd className="font-medium tabular-nums">{formatPrice(product?.price)}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-[#6B6B6B]">ค่าจัดส่ง</dt><dd className="text-xs text-[#777780]">ยังไม่คำนวณ</dd></div>
        </dl>
        <div className="flex items-end justify-between gap-3 py-5"><span className="text-sm font-medium">ยอดสินค้า</span><span className="text-2xl font-semibold tracking-tight tabular-nums">{formatPrice(product?.price)}</span></div>
        <p className="mb-5 text-[11px] leading-5 text-[#777780]">ยอดนี้ยังไม่รวมค่าจัดส่ง และยังไม่ใช่ยอดเรียกเก็บจริง</p>
        {submitError && <p role="alert" className="mb-4 text-sm leading-6 text-red-600">{submitError}</p>}
        <button type="submit" disabled={!checkoutAvailable || !onConfirm || isSubmitting} aria-describedby={!checkoutAvailable ? `${formId}-unavailable` : undefined} className="button-primary w-full">{isSubmitting ? 'กำลังบันทึกรายการสาธิต…' : checkoutAvailable ? selectedPaymentMethod === 'cod' ? 'ยืนยันคำสั่งซื้อแบบสาธิต' : `จำลองชำระเงิน ${formatPrice(product?.price)}` : 'ยังไม่เปิดรับคำสั่งซื้อ'}</button>
        <button type="button" onClick={onCancel} disabled={isSubmitting} className="button-quiet mt-2 w-full">ยกเลิก · กลับไปคิดอีกครั้ง</button>
        <p className="mt-4 text-center text-[10px] leading-5 text-[#85858d]">คุณยังเปลี่ยนใจได้ก่อนยืนยันรายการ</p>
      </aside>
    </form>
  )
}

function DemoPromptPay({ amount }) {
  const size = 29
  const finderAt = [[1, 1], [1, size - 8], [size - 8, 1]]
  const cells = []

  for (let row = 0; row < size; row += 1) {
    for (let column = 0; column < size; column += 1) {
      const finder = finderAt.find(([top, left]) => row >= top && row < top + 7 && column >= left && column < left + 7)
      let filled
      if (finder) {
        const [top, left] = finder
        const x = column - left
        const y = row - top
        filled = x === 0 || x === 6 || y === 0 || y === 6 || (x >= 2 && x <= 4 && y >= 2 && y <= 4)
      } else {
        filled = (row * 13 + column * 7 + row * column * 3) % 11 < 5
      }
      if (filled) cells.push(<rect key={`${row}-${column}`} x={column} y={row} width="1" height="1" rx=".08" />)
    }
  }

  return (
    <div className="mt-3 flex flex-col items-center gap-3 rounded-[8px] border border-[#E8E8EC] bg-white p-4 sm:flex-row sm:items-center">
      <div className="relative size-36 shrink-0 rounded-[6px] border border-[#E8E8EC] bg-white p-2" aria-label="QR จำลอง ไม่สามารถสแกนชำระเงินจริงได้">
        <svg viewBox={`0 0 ${size} ${size}`} className="size-full text-[#20211F]" fill="currentColor" aria-hidden="true">{cells}</svg>
        <span className="absolute inset-x-0 bottom-3 mx-auto w-max rounded-[3px] bg-white px-1.5 py-0.5 text-[8px] font-bold tracking-widest text-[#6366F1]">DEMO</span>
      </div>
      <div className="text-center sm:text-left">
        <p className="text-sm font-semibold text-[#20211F]">พร้อมเพย์</p>
        <p className="mt-1 text-xs text-[#6B6B6B]">   {formatPrice(amount)}</p>
        <p className="mt-2 text-[10px] leading-5 text-[#85858d]">QR นี้สร้างเพื่อแสดงหน้าตาเท่านั้น ไม่สามารถใช้โอนเงินจริงได้</p>
      </div>
    </div>
  )
}

function DemoCard() {
  return (
    <div className="mt-3 rounded-[8px] border border-[#E8E8EC] bg-white p-4">
      <div className="flex items-center justify-between rounded-[8px] bg-[#252527] p-4 text-white">
        <span className="text-xs font-medium tracking-widest">PAUSE DEMO</span>
        <span aria-hidden="true" className="flex"><i className="size-5 rounded-full bg-red-500/90" /><i className="-ml-2 size-5 rounded-full bg-amber-400/90" /></span>
        <span className="sr-only">ตัวอย่างบัตรจำลอง</span>
      </div>
      <div className="mt-3 grid gap-2 text-[10px] text-[#777780] sm:grid-cols-[1fr_auto]">
        <div className="rounded-[6px] bg-[#F8F8F7] px-3 py-2.5"><span className="block text-[9px] uppercase tracking-wider">หมายเลขบัตรตัวอย่าง</span><span className="mt-1 block font-mono text-xs tracking-wider text-[#39393E]">•••• •••• •••• 4242</span></div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-[6px] bg-[#F8F8F7] px-3 py-2.5"><span className="block text-[9px] uppercase tracking-wider">หมดอายุ</span><span className="mt-1 block font-mono text-xs text-[#39393E]">MM / YY</span></div>
          <div className="rounded-[6px] bg-[#F8F8F7] px-3 py-2.5"><span className="block text-[9px] uppercase tracking-wider">รหัส</span><span className="mt-1 block font-mono text-xs text-[#39393E]">•••</span></div>
        </div>
      </div>
      <p className="mt-2 text-[10px] leading-5 text-[#85858d]">นี่คือข้อมูลตัวอย่าง ไม่มีช่องกรอกและไม่มีการบันทึกข้อมูลบัตร</p>
    </div>
  )
}
