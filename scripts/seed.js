// ============================================================================
// 👤 โฟ — scripts/seed.js (Import DummyJSON catalog into Supabase)
// ============================================================================
// วิธีรัน: node scripts/seed.js
// ============================================================================

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { convertUsdToThb, getUsdToThbRate } from '../lib/currency.js'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ [โฟ] กรุณาตั้งค่า NEXT_PUBLIC_SUPABASE_URL และ SUPABASE_SERVICE_ROLE_KEY ใน .env.local ก่อนรัน seed')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function seed() {
  console.log('🔄 1. กำลังดึงอัตราแลกเปลี่ยน USD/THB ล่าสุด...')
  const exchange = await getUsdToThbRate()
  console.log(`💵 อัตราแลกเปลี่ยน: 1 USD = ${exchange.rate} THB (แหล่งที่มา: ${exchange.source})`)

  console.log('📦 2. กำลังดึงข้อมูลสินค้าทั้งหมดจาก DummyJSON API (limit=0)...')
  const res = await fetch('https://dummyjson.com/products?limit=0')
  if (!res.ok) {
    throw new Error(`ไม่สามารถดึงข้อมูลจาก DummyJSON ได้ (Status: ${res.status})`)
  }
  const data = await res.json()
  const rawProducts = data.products || []
  console.log(`✅ ดึงสินค้าจาก DummyJSON สำเร็จ: พบ ${rawProducts.length} รายการ`)

  console.log('⚙️ 3. กำลังแปลงข้อมูลเป็นฟอร์แมตเงินบาท (THB) สำหรับ Supabase...')
  const formattedProducts = rawProducts.map((p) => {
    const priceUsd = Number(p.price || 0)
    const priceThb = convertUsdToThb(priceUsd, exchange.rate)

    return {
      id: Number(p.id),
      name: p.title || 'สินค้าไม่มีชื่อ',
      price: priceThb,
      priceUsd,
      usdToThbRate: exchange.rate,
      exchangeRateDate: exchange.date,
      exchangeRateSource: exchange.source,
      category: p.category || 'other',
      imageUrl: p.thumbnail || (Array.isArray(p.images) ? p.images[0] : '') || '',
      description: p.description || '',
      rating: Number.isFinite(Number(p.rating)) ? Number(p.rating) : null,
    }
  })

  const { data: existingProducts, error: lookupError } = await supabase
    .from('Product')
    .select('id, name')

  if (lookupError) {
    throw new Error(`ตรวจสอบ ID สินค้าเดิมใน Supabase ไม่สำเร็จ: ${lookupError.message}`)
  }

  const existingById = new Map((existingProducts || []).map((product) => [Number(product.id), product.name]))
  const conflicts = formattedProducts.filter((product) => (
    existingById.has(product.id) && existingById.get(product.id) !== product.name
  ))
  if (conflicts.length) {
    throw new Error(`พบ Product ID ที่มีสินค้าอื่นใช้อยู่แล้ว (${conflicts.slice(0, 5).map((product) => product.id).join(', ')}). ยกเลิกเพื่อป้องกันการทับข้อมูลและประวัติเดิม`)
  }

  const productsToInsert = formattedProducts.filter((product) => !existingById.has(product.id))
  console.log(`🚀 4. กำลังนำเข้าสินค้าใหม่ ${productsToInsert.length} จาก ${formattedProducts.length} รายการลง Supabase...`)
  if (productsToInsert.length === 0) {
    console.log('ℹ️ สินค้าทั้งหมดมีอยู่ใน Supabase แล้ว ไม่มีการเขียนทับข้อมูลเดิม')
    return
  }

  // ใช้ insert กับเฉพาะ ID ที่ยังไม่มี เพื่อไม่เขียนทับ Product หรือ DecisionLog เดิม
  const { data: inserted, error } = await supabase
    .from('Product')
    .insert(productsToInsert)
    .select('id')

  if (error) {
    console.error('❌ เกิดข้อผิดพลาดในการบันทึกลง Supabase:', error.message)
    process.exit(1)
  }

  console.log(`🎉 สำเร็จ! เพิ่มสินค้า ${inserted?.length || 0} รายการลง Supabase`)
}

seed().catch((err) => {
  console.error('❌ การทำงานล้มเหลว:', err.message)
  process.exit(1)
})
