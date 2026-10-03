'use server'

// 👤 พี + โฟ — app/actions.js (Server Actions สำหรับบันทึกการตัดสินใจ ซื้อ หรือ ผ่าน ลง Supabase)
import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function confirmPurchaseAction({ productId, price, skipped = false, form = {} }) {
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
      console.warn('DB insert error (check Supabase setup):', error.message)
    }

    revalidatePath('/history')
    return { ok: true }
  } catch (err) {
    console.error('confirmPurchaseAction error:', err)
    return { ok: false, error: err.message }
  }
}

export async function passItemAction({ productId, price, skipped = false }) {
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
      console.warn('DB insert error (check Supabase setup):', error.message)
    }

    revalidatePath('/history')
    return { ok: true }
  } catch (err) {
    console.error('passItemAction error:', err)
    return { ok: false, error: err.message }
  }
}
