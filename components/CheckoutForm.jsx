'use client'

// 👤 พี — CheckoutForm (ฟอร์ม Checkout ยืนยันการซื้อด้วย react-hook-form + zod)
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { checkoutSchema } from '@/lib/schemas/checkout'
import { useState } from 'react'

export default function CheckoutForm({ item, onConfirm, onCancel }) {
  const [submitting, setSubmitting] = useState(false)

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
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          ชื่อ-นามสกุล ผู้รับ
        </label>
        <input
          type="text"
          {...register('fullName')}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
        />
        {errors.fullName && (
          <p className="mt-1 text-xs text-rose-600">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          ที่อยู่จัดส่ง
        </label>
        <textarea
          rows={2}
          {...register('address')}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
        />
        {errors.address && (
          <p className="mt-1 text-xs text-rose-600">{errors.address.message}</p>
        )}
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          เบอร์โทรศัพท์
        </label>
        <input
          type="tel"
          {...register('phone')}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-rose-600">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          ช่องทางชำระเงิน
        </label>
        <select
          {...register('paymentMethod')}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
        >
          <option value="promptpay">พร้อมเพย์ (QR Code)</option>
          <option value="credit_card">บัตรเครดิต / เดบิต</option>
          <option value="cod">เก็บเงินปลายทาง (COD)</option>
        </select>
        {errors.paymentMethod && (
          <p className="mt-1 text-xs text-rose-600">{errors.paymentMethod.message}</p>
        )}
      </div>

      <div className="flex gap-2.5 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:opacity-50"
        >
          {submitting ? 'กำลังบันทึก...' : 'ยืนยันการซื้อจริง 🛍️'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          ยกเลิก
        </button>
      </div>
    </form>
  )
}
