'use server'

// ============================================================================
// 👤 พี + โฟ — app/actions.js
// ============================================================================
// หน้าที่: Server Actions สำหรับบันทึกประวัติการตัดสินใจลงตาราง DecisionLog ใน Supabase
// - ตรวจสอบข้อมูลที่ส่งมาจาก Client ซ้ำอีกชั้นด้วย Zod (Server Action เรียกตรงจากภายนอกได้)
// - confirmPurchaseAction ตรวจฟอร์มด้วย checkoutSchema ตัวเดียวกับ CheckoutForm
// ============================================================================

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { supabase } from '@/lib/supabase'
import { checkoutSchema } from '@/lib/schemas/checkout'

const hasDatabase = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

const decisionSchema = z.object({
  sessionId: z.string().trim().min(1).max(100),
  productId: z.coerce.number().int().positive(),
  price: z.coerce.number().finite().min(0).max(100_000_000),
  skipped: z.boolean().default(false),
})

async function logDecision(input, decisionStatus) {
  const parsed = decisionSchema.safeParse(input)
  if (!parsed.success) return { ok: false, error: 'ข้อมูลรายการไม่ถูกต้อง กรุณารีเฟรชหน้าแล้วลองอีกครั้ง' }
  if (!hasDatabase) return { ok: false, error: 'ยังไม่ได้เชื่อมต่อฐานข้อมูล จึงบันทึกการตัดสินใจไม่ได้' }

  const { sessionId, productId, price, skipped } = parsed.data
  try {
    const { error } = await supabase.from('DecisionLog').insert([{
      sessionId,
      productId,
      price,
      decisionStatus,
      skipped,
      timestamp: new Date().toISOString(),
    }])

    if (error) {
      console.error(`Supabase DecisionLog insert error (${decisionStatus}):`, error.message)
      // 23503 = foreign_key_violation: สินค้านี้ไม่มีอยู่ในตาราง Product
      return {
        ok: false,
        error: error.code === '23503'
          ? 'ไม่พบสินค้านี้ในฐานข้อมูล จึงบันทึกการตัดสินใจไม่ได้'
          : 'บันทึกการตัดสินใจไม่สำเร็จ กรุณาลองอีกครั้ง',
      }
    }
  } catch (err) {
    console.error(`logDecision (${decisionStatus}) error:`, err?.message || err)
    return { ok: false, error: 'เชื่อมต่อฐานข้อมูลไม่ได้ กรุณาลองอีกครั้ง' }
  }

  revalidatePath('/history')
  return { ok: true }
}

export async function confirmPurchaseAction({ form, ...decision } = {}) {
  const parsedForm = checkoutSchema.safeParse(form)
  if (!parsedForm.success) return { ok: false, error: 'กรุณากรอกข้อมูลจัดส่งให้ครบถ้วนและถูกต้อง' }
  return logDecision(decision, 'BOUGHT')
}

export async function passItemAction(decision = {}) {
  return logDecision(decision, 'PASSED')
}
