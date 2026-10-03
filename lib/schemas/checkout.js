// ============================================================================
// 👤 พี — lib/schemas/checkout.js
// ============================================================================
// หน้าที่: Zod Schema สำหรับตรวจสอบความถูกต้องของฟอร์มสั่งซื้อในหน้า /ready
//
// 📋 TODO สำหรับพี:
// 1. [ ] กำหนด Validation สำหรับ 4 ฟิลด์ด้วย Zod:
//        - `fullName`: z.string().trim().min(2, 'ชื่อ-นามสกุลต้องมีอย่างน้อย 2 ตัวอักษร')
//        - `address`: z.string().trim().min(10, 'กรุณาระบุที่อยู่จัดส่งอย่างน้อย 10 ตัวอักษร')
//        - `phone`: z.string().trim().regex(/^[0-9]{9,10}$/, 'เบอร์โทรศัพท์ต้องเป็นตัวเลข 9–10 หลัก')
//        - `paymentMethod`: z.enum(['promptpay', 'credit_card', 'cod'], {
//            errorMap: () => ({ message: 'กรุณาเลือกช่องทางการชำระเงิน' })
//          })
// ============================================================================

import { z } from 'zod'

// TODO (พี): เขียน Zod Schema ให้ครบ 4 ฟิลด์ตามคำแนะนำด้านบน
export const checkoutSchema = z.object({
  fullName: z.string(),
  address: z.string(),
  phone: z.string(),
  paymentMethod: z.string(),
})
