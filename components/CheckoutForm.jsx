'use client'

// ============================================================================
// 👤 พี — components/CheckoutForm.jsx
// ============================================================================
// หน้าที่: ฟอร์มกรอกข้อมูลสั่งซื้อในหน้า /ready ด้วย react-hook-form + zod
//
// 📋 TODO สำหรับพี:
// 1. [ ] ผูกฟอร์มด้วย `useForm` พร้อม `zodResolver(checkoutSchema)`:
//        const { register, handleSubmit, formState: { errors } } = useForm({
//          resolver: zodResolver(checkoutSchema),
//          defaultValues: { fullName: '', address: '', phone: '', paymentMethod: 'promptpay' }
//        })
// 2. [ ] สร้างฟิลด์กรอกข้อมูล 4 ช่อง:
//        - `fullName`: Input text พร้อม {...register('fullName')}
//        - `address`: Textarea พร้อม {...register('address')}
//        - `phone`: Input tel พร้อม {...register('phone')}
//        - `paymentMethod`: Select options ('promptpay', 'credit_card', 'cod')
// 3. [ ] แสดง Error Message สีแดง (`text-xs text-[#EF4444]`) ใต้ช่องที่กรอกผิด เช่น `{errors.fullName && <p>...}`
// 4. [ ] ฟังก์ชัน onSubmit: เรียก `await onConfirm(formData)`
// 5. [ ] ออกแบบ UI ตาม genesis-DESIGN.md:
//        - Inputs/Selects: `rounded-[6px] border border-[#E8E8EC] p-2 text-sm text-[#0A0A0A]`
//        - Focus ring: `focus:border-[#6366F1] focus:ring-3 focus:ring-[#6366F1]/12`
//        - ปุ่มยืนยัน: `rounded-[6px] bg-[#10B981] hover:bg-[#059669] text-white px-4 py-2 text-sm font-medium`
//        - ปุ่มยกเลิก: `rounded-[6px] border border-[#E8E8EC] text-[#6B6B6B] hover:bg-slate-50 px-4 py-2 text-sm`
// ============================================================================

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { checkoutSchema } from '@/lib/schemas/checkout'

export default function CheckoutForm({ item, onConfirm, onCancel }) {
  const [submitting, setSubmitting] = useState(false)

  // TODO (พี): ตั้งค่า react-hook-form ด้วย zodResolver(checkoutSchema)

  // TODO (พี): เขียนฟังก์ชัน onSubmit(formData) แล้วเรียก onConfirm(formData)

  return (
    <form className="space-y-4">
      {/* 
        TODO (พี): ออกแบบ 4 ช่องกรอกข้อมูล พร้อมแสดง errors ใต้ช่อง
        1. ชื่อ-นามสกุล (fullName)
        2. ที่อยู่จัดส่ง (address)
        3. เบอร์โทรศัพท์ (phone)
        4. ช่องทางชำระเงิน (paymentMethod)
      */}

      {/* 
        TODO (พี): ปุ่มยกเลิก (เรียก onCancel) และปุ่มยืนยันการสั่งซื้อ (type="submit")
      */}
      <div className="flex gap-2 pt-2">
        {/* เขียน <button> ทั้งสองที่นี่ */}
      </div>
    </form>
  )
}
