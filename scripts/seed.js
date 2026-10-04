import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { SEED_PRODUCTS } from '../lib/sample-products.mjs'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('กรุณาตั้งค่า NEXT_PUBLIC_SUPABASE_URL และ SUPABASE_SERVICE_ROLE_KEY ใน .env.local ก่อนรัน seed')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function seed() {
  console.log(`กำลังเตรียมสินค้า ${SEED_PRODUCTS.length} รายการ...`)

  const { data: existingProducts, error: readError } = await supabase.from('Product').select('name')
  if (readError) {
    console.error('อ่านสินค้าเดิมไม่สำเร็จ:', readError.message)
    process.exitCode = 1
    return
  }

  const existingNames = new Set((existingProducts || []).map((product) => product.name))
  const newProducts = SEED_PRODUCTS.filter((product) => !existingNames.has(product.name))
  if (!newProducts.length) {
    console.log('มีสินค้าตัวอย่างครบแล้ว ไม่มีรายการใหม่ที่ต้องเพิ่ม')
    return
  }

  let insertedCount = 0
  for (let index = 0; index < newProducts.length; index += 100) {
    const batch = newProducts.slice(index, index + 100)
    const { data, error } = await supabase.from('Product').insert(batch).select('id')
    if (error) {
      console.error(`เพิ่มสินค้าชุดที่ ${Math.floor(index / 100) + 1} ไม่สำเร็จ:`, error.message)
      process.exitCode = 1
      return
    }
    insertedCount += data?.length || batch.length
    console.log(`เพิ่มแล้ว ${insertedCount}/${newProducts.length} รายการ`)
  }

  console.log(`เสร็จแล้ว เพิ่มสินค้าใหม่ ${insertedCount} รายการ (${SEED_PRODUCTS.length} รายการในชุดตัวอย่าง)`)
}

seed().catch((error) => {
  console.error('Seed ล้มเหลว:', error?.message || error)
  process.exitCode = 1
})
