'use client'

import { useId, useState } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { checkoutSchema } from '@/lib/schemas/checkout'

const formatPrice = (value) => new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', maximumFractionDigits: 2 }).format(Number(value) || 0)

export default function CheckoutForm({ item, onConfirm, onCancel, checkoutAvailable = false }) {
  const formId = useId()
  const [submitError, setSubmitError] = useState('')
  const product = item.product
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(checkoutSchema),
    mode: 'onTouched',
    defaultValues: { fullName: '', address: '', phone: '', paymentMethod: 'promptpay' },
  })

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
            <span className="rounded-full bg-[#F3F3F5] px-3 py-1 text-[10px] font-medium text-[#74747F]">ตัวอย่างหน้าจอ</span>
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
              <label htmlFor={`${formId}-paymentMethod`} className="mb-2 block text-xs font-medium text-[#39393E]">ช่องทางชำระเงิน</label>
              <select {...inputProps('paymentMethod')} className="input-field w-full">
                <option value="promptpay">พร้อมเพย์</option>
                <option value="credit_card">บัตรเครดิต / เดบิต</option>
                <option value="cod">เก็บเงินปลายทาง</option>
              </select>
              {errorFor('paymentMethod')}
            </div>
          </div>
        </section>
      </div>

      <aside className="surface p-5 sm:p-6 lg:sticky lg:top-28" aria-labelledby="summary-heading">
        <p className="eyebrow">ORDER SUMMARY</p>
        <h2 id="summary-heading" className="mt-2 text-xl font-medium tracking-tight">สรุปรายการ</h2>
        <div className="my-5 flex items-center gap-3 rounded-[8px] bg-[#F7F7F5] p-3">
          <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-[#55555E]">✓</span>
          <p className="text-xs leading-5 text-[#6B6B6B]">คุณได้ให้เวลากับตัวเองก่อนกลับมาทบทวนแล้ว</p>
        </div>
        <dl className="space-y-4 border-y border-[#E8E8EC] py-5 text-sm">
          <div className="flex justify-between gap-4"><dt className="text-[#6B6B6B]">สินค้า 1 ชิ้น</dt><dd className="font-medium tabular-nums">{formatPrice(product?.price)}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-[#6B6B6B]">ค่าจัดส่ง</dt><dd className="text-xs text-[#777780]">ยังไม่คำนวณ</dd></div>
        </dl>
        <div className="flex items-end justify-between gap-3 py-5"><span className="text-sm font-medium">ยอดสินค้า</span><span className="text-2xl font-semibold tracking-tight tabular-nums">{formatPrice(product?.price)}</span></div>
        <p className="mb-5 text-[11px] leading-5 text-[#777780]">ยอดนี้ยังไม่รวมค่าจัดส่ง และยังไม่ใช่ยอดเรียกเก็บจริง</p>
        {submitError && <p role="alert" className="mb-4 text-sm leading-6 text-red-600">{submitError}</p>}
        <button type="submit" disabled={!checkoutAvailable || !onConfirm || isSubmitting} aria-describedby={!checkoutAvailable ? `${formId}-unavailable` : undefined} className="button-primary w-full">{isSubmitting ? 'กำลังบันทึกคำสั่งซื้อ…' : checkoutAvailable ? 'ยืนยันคำสั่งซื้อ (มั่นใจแล้ว) 🛍️' : 'ยังไม่เปิดรับคำสั่งซื้อ'}</button>
        <button type="button" onClick={onCancel} disabled={isSubmitting} className="button-quiet mt-2 w-full">ยกเลิก · กลับไปคิดอีกครั้ง</button>
        <p className="mt-4 text-center text-[10px] leading-5 text-[#85858d]">คุณยังเปลี่ยนใจได้ก่อนยืนยันรายการ</p>
      </aside>
    </form>
  )
}
