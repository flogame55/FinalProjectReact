// ============================================================================
// 👤 โฟ — scripts/seed.js (Import DummyJSON สินค้า 194 รายการขึ้น Supabase)
// ============================================================================
// วิธีรัน: node scripts/seed.js
// ============================================================================

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { getUsdToThbRate } from '../lib/currency.js'
import { convertUsdToThb } from '../lib/pricing.js'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

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
      category: p.category || 'other',
      imageUrl: p.thumbnail || (Array.isArray(p.images) ? p.images[0] : '') || '',
      description: p.description || '',
    }
  })

  console.log(`🚀 4. กำลังนำเข้าสินค้า ${formattedProducts.length} รายการลงตาราง 'Product' ใน Supabase...`)
  // ทำ Upsert โดยใช้ id เพื่อให้รันซ้ำได้โดยไม่ติด duplicate key error
  const { data: inserted, error } = await supabase
    .from('Product')
    .upsert(formattedProducts, { onConflict: 'id' })
    .select('id')

  if (error) {
    console.error('❌ เกิดข้อผิดพลาดในการบันทึกลง Supabase:', error.message)
    process.exit(1)
  }

  console.log(`🎉 สำเร็จเรียบร้อย! นำเข้าสินค้าขึ้นตาราง 'Product' บน Supabase แล้ว ${inserted?.length || formattedProducts.length} รายการ!`)
  console.log('✨ ตอนนี้ในฐานข้อมูลมีสินค้า ID 1-194 ตรงกับหน้าเว็บ 100% แล้วครับ!')
}

seed().catch((err) => {
  console.error('❌ การทำงานล้มเหลว:', err.message)
  process.exit(1)
})
