// ============================================================================
// 👤 กิต — lib/products.js
// ============================================================================
// หน้าที่: ฟังก์ชันดึงข้อมูลสินค้าจาก Supabase สำหรับ Server Components
//
// 📋 TODO สำหรับกิต:
// 1. [ ] ฟังก์ชัน `getProducts({ q, category })`:
//        - เขียนคำสั่ง query จาก Supabase ตาราง 'Product'
//        - กรองตามหมวดหมู่ถ้ามี `category`: `.eq('category', category)`
//        - ค้นหาตามชื่อสินค้าถ้ามี `q`: `.ilike('name', `%${q}%`)`
//        - หากยังไม่ได้ต่อ Supabase หรือ query error ให้ return `FALLBACK_PRODUCTS`
// 2. [ ] ฟังก์ชัน `getProductById(id)`:
//        - ดึงสินค้าชิ้นเดียวตาม id: `.eq('id', Number(id)).single()`
//        - หากไม่พบ ให้ค้นจาก FALLBACK_PRODUCTS หรือ return null
// ============================================================================

import { supabase } from './supabase'

// ข้อมูลจำลองสำหรับเริ่มต้น (Fallback Data)
export const FALLBACK_PRODUCTS = [
  {
    id: 1,
    name: 'หูฟังไร้สายตัดเสียงรบกวน Noise Cancelling',
    price: 4990,
    category: 'electronics',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60',
    description: 'หูฟังไร้สายระบบตัดเสียงรบกวนรอบข้าง แบตเตอรี่ใช้งานได้ยาวนาน 30 ชม.',
  },
  {
    id: 2,
    name: 'คีย์บอร์ดแมคคานิคอล RGB Wireless',
    price: 3290,
    category: 'electronics',
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=60',
    description: 'สัมผัสการพิมพ์ที่แม่นยำ พร้อมไฟ RGB ปรับแต่งได้ตามใจชอบ',
  },
  {
    id: 3,
    name: 'กระเป๋าเป้กันน้ำสำหรับเดินทาง 25L',
    price: 1890,
    category: 'fashion',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=60',
    description: 'กระเป๋าเป้น้ำหนักเบา กันน้ำ เหมาะสำหรับใส่แล็ปท็อปและเดินทางท่องเที่ยว',
  },
  {
    id: 4,
    name: 'แก้วกาแฟเก็บความเย็น/ร้อน สเตนเลส 500ml',
    price: 650,
    category: 'lifestyle',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=60',
    description: 'รักษาอุณหภูมิได้นานถึง 12 ชั่วโมง พกพาสะดวก ไม่รั่วซึม',
  },
]

export async function getProducts({ q = '', category = '' } = {}) {
  // TODO (กิต): เขียน query ดึงข้อมูลจาก Supabase ตาราง 'Product'
  // ตัวอย่างคำสั่ง:
  // let query = supabase.from('Product').select('*')
  // if (category) query = query.eq('category', category)
  // if (q) query = query.ilike('name', `%${q}%`)
  // const { data, error } = await query

  // เบื้องต้นใช้ FALLBACK_PRODUCTS กรองเบื้องต้น
  let list = FALLBACK_PRODUCTS
  if (category) list = list.filter((p) => p.category === category)
  if (q) list = list.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()))
  return list
}

export async function getProductById(id) {
  // TODO (กิต): เขียนคำสั่งดึงข้อมูลสินค้ารายชิ้นจาก Supabase ตาม id
  // ตัวอย่างคำสั่ง:
  // const { data, error } = await supabase.from('Product').select('*').eq('id', Number(id)).single()

  return FALLBACK_PRODUCTS.find((p) => p.id === Number(id)) || null
}
