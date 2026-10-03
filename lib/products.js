// ============================================================================
// 👤 โฟ — lib/products.js (งาน Supabase Data Layer)
// ============================================================================
// หน้าที่: ฟังก์ชันดึงข้อมูลสินค้าจาก Supabase สำหรับ Server Components
//
// 📋 TODO สำหรับโฟ (แนวทางการเขียนคำสั่ง Supabase):
// 1. [ ] ฟังก์ชัน `getProducts({ q = '', category = '' })`:
//        - เริ่มต้น query: `let query = supabase.from('Product').select('*')`
//        - กรองหมวดหมู่ (ถ้ามีค่า category): `query = query.eq('category', category)`
//        - ค้นหาชื่อสินค้า (ถ้ามีค่า q): `query = query.ilike('name', `%${q}%`)`
//        - ดึงข้อมูล: `const { data, error } = await query`
//        - จัดการ Error / Fallback: ถ้า error หรือไม่มีข้อมูล ให้ fallback ไปใช้ FALLBACK_PRODUCTS
//
// 2. [ ] ฟังก์ชัน `getProductById(id)`:
//        - ดึงสินค้ารายชิ้น:
//          `const { data, error } = await supabase.from('Product').select('*').eq('id', Number(id)).single()`
//        - ถ้าพบข้อมูลให้ return data ถ้าไม่พบให้ค้นจาก FALLBACK_PRODUCTS หรือ return null
// ============================================================================

import { supabase } from './supabase'

// ข้อมูลจำลองสำหรับทดสอบ (Fallback เมื่อยังไม่ได้รัน seed หรือยังไม่ต่อเน็ต)
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
  // TODO (โฟ): เขียนคำสั่ง query ตาราง 'Product' จาก Supabase ตามคำแนะนำด้านบน
  // 💡 คำใบ้:
  // try {
  //   let query = supabase.from('Product').select('*')
  //   if (category) query = query.eq('category', category)
  //   if (q) query = query.ilike('name', `%${q}%`)
  //   const { data, error } = await query
  //   if (error || !data) return FALLBACK_PRODUCTS
  //   return data
  // } catch (err) {
  //   return FALLBACK_PRODUCTS
  // }

  return FALLBACK_PRODUCTS
}

export async function getProductById(id) {
  // TODO (โฟ): เขียนคำสั่งดึงสินค้าตาม id จาก Supabase
  // 💡 คำใบ้:
  // const { data, error } = await supabase.from('Product').select('*').eq('id', Number(id)).single()
  // if (error || !data) return FALLBACK_PRODUCTS.find((p) => p.id === Number(id)) || null
  // return data

  return FALLBACK_PRODUCTS.find((p) => p.id === Number(id)) || null
}
