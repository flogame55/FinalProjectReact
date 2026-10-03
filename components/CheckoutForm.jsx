'use client'

// ============================================================================
// 👤 พี — components/CheckoutForm.jsx
// ============================================================================
// หน้าที่: ฟอร์มกรอกข้อมูลสั่งซื้อในหน้า /ready ด้วย react-hook-form + zod
//
// 📋 TODO สำหรับพี:
// 1. [ ] ผูกฟอร์มด้วย `useForm` พร้อม `zodResolver(checkoutSchema)`
// 2. [ ] กำหนด 4 ช่องกรอก: fullName, address, phone, paymentMethod
// 3. [ ] แสดงข้อความ Error สีแดง (#EF4444) ใต้ช่องที่กรอกผิด
// 4. [ ] ปุ่มยืนยันการซื้อ: แสดงสถานะ Loading เมื่อกำลังบันทึก (disabled + "กำลังบันทึก...")
// 5. [ ] ออกแบบ UI ตาม genesis-DESIGN.md:
//        - Inputs: radius 6px, border 1px #E8E8EC, focus ring 3px indigo
//        - Primary Button: Success Green (#10B981) หรือ Indigo (#6366F1), radius 6px
// ============================================================================

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { checkoutSchema } from '@/lib/schemas/checkout'
import { useState } from 'react'

export default function CheckoutForm({ item, onConfirm, onCancel }) {
  const [submitting, setSubmitting] = useState(false)

  // TODO (พี): ตั้งค่าฟอร์มด้วย react-hook-form + zodResolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: '',
      address: '',
      phone: '',
      paymentMethod: 'promptpay',
    },
  })

  const onSubmit = async (formData) => {
    setSubmitting(true)
    try {
      await onConfirm(formData)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* ชื่อ-นามสกุล */}
      <div>
        <label className="block text-xs font-semibold text-[#0A0A0A] mb-1">
          ชื่อ-นามสกุล ผู้รับ
        </label>
        <input
          type="text"
          {...register('fullName')}
          className="w-full rounded-[6px] border border-[#E8E8EC] px-3.5 py-2 text-sm text-[#0A0A0A] focus:border-[#6366F1] focus:ring-3 focus:ring-[#6366F1]/12 focus:outline-none"
        />
        {errors.fullName && (
          <p className="mt-1 text-xs text-[#EF4444]">{errors.fullName.message}</p>
        )}
      </div>

      {/* ที่อยู่ */}
      <div>
        <label className="block text-xs font-semibold text-[#0A0A0A] mb-1">
          ที่อยู่จัดส่ง
        </label>
        <textarea
          rows={2}
          {...register('address')}
          className="w-full rounded-[6px] border border-[#E8E8EC] px-3.5 py-2 text-sm text-[#0A0A0A] focus:border-[#6366F1] focus:ring-3 focus:ring-[#6366F1]/12 focus:outline-none"
        />
        {errors.address && (
          <p className="mt-1 text-xs text-[#EF4444]">{errors.address.message}</p>
        )}
      </div>

      {/* เบอร์โทร */}
      <div>
        <label className="block text-xs font-semibold text-[#0A0A0A] mb-1">
          เบอร์โทรศัพท์
        </label>
        <input
          type="tel"
          {...register('phone')}
          className="w-full rounded-[6px] border border-[#E8E8EC] px-3.5 py-2 text-sm text-[#0A0A0A] focus:border-[#6366F1] focus:ring-3 focus:ring-[#6366F1]/12 focus:outline-none"
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-[#EF4444]">{errors.phone.message}</p>
        )}
      </div>

      {/* ช่องทางชำระเงิน */}
      <div>
        <label className="block text-xs font-semibold text-[#0A0A0A] mb-1">
          ช่องทางชำระเงิน
        </label>
        <select
          {...register('paymentMethod')}
          className="w-full rounded-[6px] border border-[#E8E8EC] px-3.5 py-2 text-sm text-[#0A0A0A] focus:border-[#6366F1] focus:ring-3 focus:ring-[#6366F1]/12 focus:outline-none"
        >
          <option value="promptpay">พร้อมเพย์ (QR Code)</option>
          <option value="credit_card">บัตรเครดิต / เดบิต</option>
          <option value="cod">เก็บเงินปลายทาง (COD)</option>
        </select>
        {errors.paymentMethod && (
          <p className="mt-1 text-xs text-[#EF4444]">{errors.paymentMethod.message}</p>
        )}
      </div>

      {/* ปุ่มกด */}
      <div className="flex gap-2.5 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 rounded-[6px] bg-[#10B981] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#059669] disabled:opacity-50 cursor-pointer"
        >
          {submitting ? 'กำลังบันทึก...' : 'ยืนยันการซื้อจริง 🛍️'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="rounded-[6px] border border-[#E8E8EC] bg-white px-4 py-2.5 text-sm font-medium text-[#0A0A0A] hover:bg-slate-50 cursor-pointer"
        >
          ยกเลิก
        </button>
      </div>
    </form>
  )
}
