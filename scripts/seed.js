// ============================================================================
// 👤 โฟ — scripts/seed.js (งาน Seeding ข้อมูลสินค้าขึ้น Supabase)
// ============================================================================
// หน้าที่: สคริปต์สำหรับนำเข้าข้อมูลสินค้าเริ่มต้นและอัปโหลดรูปภาพลง Supabase
// วิธีรัน: node scripts/seed.js
//
// 📋 TODO สำหรับโฟ:
// 1. [ ] สร้าง Supabase Project และคัดลอก URL + Keys มาใส่ใน .env.local
// 2. [ ] รันคำสั่ง SQL ใน `supabase/schema.sql` บน Supabase SQL Editor
// 3. [ ] สร้าง Bucket 'product-images' ใน Supabase Storage และตั้งค่าเป็น Public
// 4. [ ] เพิ่มรายการสินค้าตัวอย่างใน SAMPLE_PRODUCTS ให้หลากหลาย
// 5. [ ] รันสคริปต์: `node scripts/seed.js` เพื่อ insert ข้อมูลลงตาราง 'Product'
// ============================================================================

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('⚠️ [โฟ] กรุณาระบุ NEXT_PUBLIC_SUPABASE_URL และ SUPABASE_SERVICE_ROLE_KEY ใน .env.local ก่อนรัน seed')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// TODO (โฟ): เพิ่มรายการสินค้าตัวอย่างให้ครบตามความต้องการ
export const SAMPLE_PRODUCTS = [
  {
    name: 'หูฟังไร้สายตัดเสียงรบกวน Noise Cancelling',
    price: 4990,
    category: 'electronics',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60',
    description: 'หูฟังไร้สายระบบตัดเสียงรบกวนรอบข้าง แบตเตอรี่ใช้งานได้ยาวนาน 30 ชม.',
  },
  {
    name: 'คีย์บอร์ดแมคคานิคอล RGB Wireless',
    price: 3290,
    category: 'electronics',
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=60',
    description: 'สัมผัสการพิมพ์ที่แม่นยำ พร้อมไฟ RGB ปรับแต่งได้ตามใจชอบ',
  },
  {
    name: 'กระเป๋าเป้กันน้ำสำหรับเดินทาง 25L',
    price: 1890,
    category: 'fashion',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=60',
    description: 'กระเป๋าเป้น้ำหนักเบา กันน้ำ เหมาะสำหรับใส่แล็ปท็อปและเดินทางท่องเที่ยว',
  },
  {
    name: 'แก้วกาแฟเก็บความเย็น/ร้อน สเตนเลส 500ml',
    price: 650,
    category: 'lifestyle',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=60',
    description: 'รักษาอุณหภูมิได้นานถึง 12 ชั่วโมง พกพาสะดวก ไม่รั่วซึม',
  },
]

async function seed() {
  console.log('🌱 กำลังเริ่มต้น Seed ข้อมูลสินค้าลง Supabase...')
  // TODO (โฟ): เขียนคำสั่ง insert ข้อมูลลงตาราง 'Product'
  const { data, error } = await supabase.from('Product').insert(SAMPLE_PRODUCTS).select()

  if (error) {
    console.error('❌ เกิดข้อผิดพลาดในการ seed:', error.message)
  } else {
    console.log(`✅ สำเร็จ! เพิ่มสินค้าแล้ว ${data?.length || 0} รายการ`)
  }
}

seed()
