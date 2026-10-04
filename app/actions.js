'use server'

// ============================================================================
// 👤 พี + โฟ — app/actions.js
// ============================================================================
// หน้าที่: Server Actions สำหรับบันทึกประวัติการตัดสินใจลงตาราง DecisionLog ใน Supabase
// ============================================================================

import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function confirmPurchaseAction({ sessionId, productId, price, skipped = false, form = {} }) {
  try {
    const { error } = await supabase.from('DecisionLog').insert([{
      sessionId: String(sessionId || 'anonymous'),
      productId: Number(productId),
      price: Number(price),
      decisionStatus: 'BOUGHT',
      skipped: Boolean(skipped),
      timestamp: new Date().toISOString(),
    }])

    if (error) {
      console.error('Supabase DecisionLog insert error:', error.message)
      return { ok: false, error: error.message }
    }

    revalidatePath('/history')
    return { ok: true }
  } catch (err) {
    console.error('confirmPurchaseAction error:', err.message)
    return { ok: false, error: err.message }
  }
}

export async function passItemAction({ sessionId, productId, price, skipped = false }) {
  try {
    const { error } = await supabase.from('DecisionLog').insert([{
      sessionId: String(sessionId || 'anonymous'),
      productId: Number(productId),
      price: Number(price),
      decisionStatus: 'PASSED',
      skipped: Boolean(skipped),
      timestamp: new Date().toISOString(),
    }])

    if (error) {
      console.error('Supabase DecisionLog insert error:', error.message)
      return { ok: false, error: error.message }
    }

    revalidatePath('/history')
    return { ok: true }
  } catch (err) {
    console.error('passItemAction error:', err.message)
    return { ok: false, error: err.message }
  }
}
