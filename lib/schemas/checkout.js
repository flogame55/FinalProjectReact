// ============================================================================
// 👤 พี — lib/schemas/checkout.js
// ============================================================================
// หน้าที่: Zod Schema สำหรับตรวจสอบความถูกต้องของฟอร์มสั่งซื้อในหน้า /ready
//
// 📋 TODO สำหรับพี:
// 1. [ ] กำหนด Validation สำหรับ 4 ฟิลด์:
//        - `fullName`: string, min 2 chars
//        - `address`: string, min 10 chars
//        - `phone`: regex ตัวเลข 9-10 หลัก (/^[0-9]{9,10}$/)
//        - `paymentMethod`: enum ('promptpay', 'credit_card', 'cod')
// 2. [ ] กำหนดข้อความ Error ภาษาไทยที่อ่านเข้าใจง่าย
// ============================================================================

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
