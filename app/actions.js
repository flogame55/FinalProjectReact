'use server'

// ============================================================================
// 👤 พี — app/actions.js
// ============================================================================
// หน้าที่: Server Actions สำหรับบันทึกประวัติการตัดสินใจลงตาราง DecisionLog ใน Supabase
//
// 📋 TODO สำหรับพี:
// 1. [ ] ฟังก์ชัน `confirmPurchaseAction({ productId, price, skipped = false, form = {} })`:
//        - สั่ง insert ลงตาราง 'DecisionLog':
//          ```javascript
//          const { error } = await supabase.from('DecisionLog').insert([{
//            productId: Number(productId),
//            price: Number(price),
//            decisionStatus: 'BOUGHT',
//            skipped: Boolean(skipped),
//            timestamp: new Date().toISOString()
//          }])
//          ```
//        - เรียก `revalidatePath('/history')` เพื่อให้หน้าสถิติอัปเดตข้อมูลล่าสุดทันที
//        - return `{ ok: true }` หรือ `{ ok: false, error: error.message }`
//
// 2. [ ] ฟังก์ชัน `passItemAction({ productId, price, skipped = false })`:
//        - สั่ง insert ลงตาราง 'DecisionLog' ด้วย `decisionStatus: 'PASSED'`
//        - เรียก `revalidatePath('/history')`
//        - return `{ ok: true }`
// ============================================================================

import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function confirmPurchaseAction({ productId, price, skipped = false, form = {} }) {
  // TODO (พี): เขียนคำสั่งบันทึกการตัดสินใจซื้อจริง (BOUGHT) ลง Supabase
  try {
    // ใส่คำสั่ง supabase.from('DecisionLog').insert(...)
    revalidatePath('/history')
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err.message }
  }
}

export async function passItemAction({ productId, price, skipped = false }) {
  // TODO (พี): เขียนคำสั่งบันทึกการเปลี่ยนใจไม่ซื้อ (PASSED) ลง Supabase
  try {
    // ใส่คำสั่ง supabase.from('DecisionLog').insert(...)
    revalidatePath('/history')
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err.message }
  }
}
