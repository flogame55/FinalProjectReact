'use client'

// ============================================================================
// 👤 พี — components/CheckoutForm.jsx
// ============================================================================
// หน้าที่: ฟอร์มกรอกข้อมูลสั่งซื้อในหน้า /ready ด้วย react-hook-form + zod
//
// 📋 TODO สำหรับพี:
// 1. [ ] ใช้ `useForm` พร้อม `zodResolver(checkoutSchema)`
// 2. [ ] มีฟิลด์กรอก 4 ช่อง: fullName, address, phone, paymentMethod
// 3. [ ] แสดง Error Message สีแดง (#EF4444) ใต้ช่องที่กรอกไม่ผ่านเกณฑ์
// 4. [ ] จัดการสถานะขณะส่งฟอร์ม (Submitting / Loading state) ป้องกันการกดซ้ำ
// 5. [ ] ส่ง formData กลับผ่าน callback `onConfirm(formData)`
// 6. [ ] ออกแบบ UI ตาม genesis-DESIGN.md:
//        - Inputs: radius 6px, border 1px #E8E8EC, focus ring 3px indigo
//        - ปุ่มยืนยัน: Success (#10B981) หรือ Indigo (#6366F1), radius 6px
//        - ปุ่มยกเลิก: Secondary border
// ============================================================================

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { checkoutSchema } from '@/lib/schemas/checkout'

export default function CheckoutForm({ item, onConfirm, onCancel }) {
  // TODO (พี): ตั้งค่า react-hook-form พร้อม zodResolver
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
    // TODO (พี): เรียก onConfirm พร้อมข้อมูลฟอร์ม
    if (onConfirm) await onConfirm(formData)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* TODO (พี): เขียนฟิลด์กรอกข้อมูล fullName, address, phone, paymentMethod ตาม genesis-DESIGN.md */}
      <div>
        <label className="block text-xs font-semibold text-[#0A0A0A] mb-1">
          ชื่อ-นามสกุล ผู้รับ
        </label>
        <input
          type="text"
          {...register('fullName')}
          className="w-full rounded-[6px] border border-[#E8E8EC] p-2 text-sm text-[#0A0A0A]"
          placeholder="สมชาย ใจดี"
        />
        {errors.fullName && (
          <p className="text-xs text-[#EF4444] mt-1">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#0A0A0A] mb-1">
          ที่อยู่จัดส่ง
        </label>
        <textarea
          {...register('address')}
          rows={3}
          className="w-full rounded-[6px] border border-[#E8E8EC] p-2 text-sm text-[#0A0A0A]"
          placeholder="บ้านเลขที่ ถนน แขวง/ตำบล เขต/อำเภอ จังหวัด รหัสไปรษณีย์"
        />
        {errors.address && (
          <p className="text-xs text-[#EF4444] mt-1">{errors.address.message}</p>
        )}
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#0A0A0A] mb-1">
          เบอร์โทรศัพท์
        </label>
        <input
          type="tel"
          {...register('phone')}
          className="w-full rounded-[6px] border border-[#E8E8EC] p-2 text-sm text-[#0A0A0A]"
          placeholder="0812345678"
        />
        {errors.phone && (
          <p className="text-xs text-[#EF4444] mt-1">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#0A0A0A] mb-1">
          ช่องทางชำระเงิน
        </label>
        <select
          {...register('paymentMethod')}
          className="w-full rounded-[6px] border border-[#E8E8EC] p-2 text-sm text-[#0A0A0A]"
        >
          <option value="promptpay">พร้อมเพย์ (PromptPay)</option>
          <option value="credit_card">บัตรเครดิต / เดบิต</option>
          <option value="cod">เก็บเงินปลายทาง (COD)</option>
        </select>
      </div>

      {/* TODO (พี): ออกแบบปุ่มยืนยันและยกเลิกตาม genesis-DESIGN.md */}
      <div className="flex gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-[6px] border border-[#E8E8EC] p-2 text-sm font-medium text-[#6B6B6B] hover:bg-slate-50 transition"
        >
          ยกเลิก
        </button>
        <button
          type="submit"
          className="flex-1 rounded-[6px] bg-[#10B981] p-2 text-sm font-medium text-white hover:bg-[#059669] transition"
        >
          ยืนยันการสั่งซื้อ
        </button>
      </div>
    </form>
  )
}
