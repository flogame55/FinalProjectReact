'use server'

// ============================================================================
// 👤 พี + โฟ — app/actions.js
// ============================================================================
// หน้าที่: Server Actions สำหรับบันทึกประวัติการตัดสินใจ (Bought หรือ Passed) ลง Supabase
//
// 📋 TODO สำหรับพีและโฟ:
// 1. [ ] ฟังก์ชัน `confirmPurchaseAction({ productId, price, skipped, form })`:
//        - เชื่อมต่อ Supabase ตาราง 'DecisionLog'
//        - บันทึก record ด้วย decisionStatus = 'BOUGHT'
//        - เก็บค่า skipped (true/false) เพื่อนำไปวิเคราะห์ผล
//        - เรียก `revalidatePath('/history')` เพื่อรีเฟรชข้อมูลหน้าสถิติ
// 2. [ ] ฟังก์ชัน `passItemAction({ productId, price, skipped })`:
//        - บันทึก record ด้วย decisionStatus = 'PASSED'
//        - เก็บค่า skipped (true/false)
//        - เรียก `revalidatePath('/history')`
// ============================================================================

import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function confirmPurchaseAction({ productId, price, skipped = false, form = {} }) {
  // TODO (พี + โฟ): เขียนคำสั่ง insert ลงตาราง DecisionLog ใน Supabase
  try {
    // โค้ดของพี + โฟ
    revalidatePath('/history')
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err.message }
  }
}

export async function passItemAction({ productId, price, skipped = false }) {
  // TODO (พี + โฟ): เขียนคำสั่ง insert decisionStatus = 'PASSED'
  try {
    // โค้ดของพี + โฟ
    revalidatePath('/history')
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err.message }
  }
}
