// 👤 พี — lib/schemas/checkout.js (Zod Schema สำหรับตรวจสอบความถูกต้องของฟอร์มชำระเงินใน /ready)
import { z } from 'zod'

export const checkoutSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'ชื่อ-นามสกุลต้องมีอย่างน้อย 2 ตัวอักษร'),
  address: z
    .string()
    .trim()
    .min(10, 'กรุณาระบุที่อยู่จัดส่งให้ชัดเจน (อย่างน้อย 10 ตัวอักษร)'),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9]{9,10}$/, 'เบอร์โทรศัพท์ต้องเป็นตัวเลข 9–10 หลัก'),
  paymentMethod: z
    .enum(['promptpay', 'credit_card', 'cod'], {
      errorMap: () => ({ message: 'กรุณาเลือกช่องทางการชำระเงิน' }),
    }),
})
