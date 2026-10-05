// ============================================================================
// 👤 พี — lib/schemas/checkout.js
// ============================================================================
// หน้าที่: Zod Schema สำหรับตรวจสอบความถูกต้องของฟอร์มสั่งซื้อในหน้า /ready
// ใช้ร่วมกันทั้งฝั่ง Client (CheckoutForm ผ่าน zodResolver) และฝั่ง Server (app/actions.js)
// ============================================================================

import { z } from 'zod'

export const PAYMENT_METHODS = ['promptpay', 'credit_card', 'cod']

export const checkoutSchema = z.object({
  fullName: z.string().trim().min(2, 'ชื่อ-นามสกุลต้องมีอย่างน้อย 2 ตัวอักษร'),
  address: z.string().trim().min(10, 'กรุณาระบุที่อยู่จัดส่งอย่างน้อย 10 ตัวอักษร'),
  phone: z.string().trim().regex(/^[0-9]{9,10}$/, 'เบอร์โทรศัพท์ต้องเป็นตัวเลข 9–10 หลัก'),
  paymentMethod: z.enum(PAYMENT_METHODS, {
    errorMap: () => ({ message: 'กรุณาเลือกช่องทางการชำระเงิน' }),
  }),
})
