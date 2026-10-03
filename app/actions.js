'use server'

// ============================================================================
// 👤 พี + โฟ — app/actions.js
// ============================================================================
// หน้าที่: Server Actions สำหรับบันทึกประวัติการตัดสินใจ (Bought หรือ Passed) ลง Supabase
//
// 📋 TODO สำหรับพีและโฟ:
// 1. [ ] ฟังก์ชัน `confirmPurchaseAction({ productId, price, skipped, form })`:
//        - บันทึกแถวใหม่ลงตาราง `DecisionLog` ใน Supabase
//        - กำหนด decisionStatus = 'BOUGHT'
//        - บันทึก boolean `skipped` (ข้ามเวลามาหรือไม่)
//        - เรียก `revalidatePath('/history')` เพื่อให้หน้าสถิติอัปเดตทันที
// 2. [ ] ฟังก์ชัน `passItemAction({ productId, price, skipped })`:
//        - บันทึกแถวใหม่ลงตาราง `DecisionLog` ใน Supabase
//        - กำหนด decisionStatus = 'PASSED'
//        - บันทึก boolean `skipped`
//        - เรียก `revalidatePath('/history')`
// ============================================================================

import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function confirmPurchaseAction({ productId, price, skipped = false, form = {} }) {
  // TODO (พี + โฟ): เขียน Server Action ยืนยันการสั่งซื้อ
  try {
    const { data, error } = await supabase.from('DecisionLog').insert([
      {
        productId: Number(productId),
        price: Number(price),
        decisionStatus: 'BOUGHT',
        skipped: Boolean(skipped),
        timestamp: new Date().toISOString(),
      },
    ])

    if (error) {
      console.warn('TODO: จัดการ error บันทึก DecisionLog', error.message)
    }

    revalidatePath('/history')
    return { ok: true }
  } catch (err) {
    console.error('confirmPurchaseAction error:', err)
    return { ok: false, error: err.message }
  }
}

export async function passItemAction({ productId, price, skipped = false }) {
  // TODO (พี + โฟ): เขียน Server Action เมื่อผู้ใช้เปลี่ยนใจไม่ซื้อ
  try {
    const { data, error } = await supabase.from('DecisionLog').insert([
      {
        productId: Number(productId),
        price: Number(price),
        decisionStatus: 'PASSED',
        skipped: Boolean(skipped),
        timestamp: new Date().toISOString(),
      },
    ])

    if (error) {
      console.warn('TODO: จัดการ error บันทึก DecisionLog', error.message)
    }

    revalidatePath('/history')
    return { ok: true }
  } catch (err) {
    console.error('passItemAction error:', err)
    return { ok: false, error: err.message }
  }
}
