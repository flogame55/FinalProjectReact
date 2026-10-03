// ============================================================================
// 👤 พี — lib/schemas/checkout.js
// ============================================================================
// หน้าที่: Zod Schema สำหรับตรวจสอบความถูกต้องของฟอร์มสั่งซื้อในหน้า /ready
//
// 📋 TODO สำหรับพี:
// 1. [ ] นำเข้า `z` จาก 'zod'
// 2. [ ] กำหนด Validation สำหรับ 4 ฟิลด์:
//        - `fullName`: string, min 2 ตัวอักษร, ข้อความแจ้งเตือนภาษาไทย
//        - `address`: string, min 10 ตัวอักษร
//        - `phone`: regex ตัวเลข 9-10 หลัก (/^[0-9]{9,10}$/)
//        - `paymentMethod`: enum ('promptpay', 'credit_card', 'cod')
// 3. [ ] export const checkoutSchema
// ============================================================================

import { z } from 'zod'

// TODO (พี): เขียนเงื่อนไข validation ด้วย z.object({...})
export const checkoutSchema = z.object({
  fullName: z.string().min(1, 'กรุณากรอกชื่อ-นามสกุล'),
  address: z.string().min(1, 'กรุณากรอกที่อยู่'),
  phone: z.string().min(1, 'กรุณากรอกเบอร์โทรศัพท์'),
  paymentMethod: z.string().min(1, 'กรุณาเลือกวิธีชำระเงิน'),
})
