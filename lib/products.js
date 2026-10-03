// 👤 กิต — lib/products.js (ฟังก์ชันดึงข้อมูลสินค้าจาก Supabase หรือ Fallback Mock Data)
import { supabase } from './supabase'

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
  try {
    let query = supabase.from('Product').select('*')

    if (category) {
      query = query.eq('category', category)
    }

    if (q) {
      query = query.ilike('name', `%${q}%`)
    }

    const { data, error } = await query

    if (error || !data || data.length === 0) {
      // Fallback สำหรับกรณีที่ยังไม่ได้สร้าง Supabase หรือยังไม่ได้ seed ข้อมูล
      let list = FALLBACK_PRODUCTS
      if (category) list = list.filter((p) => p.category === category)
      if (q) list = list.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()))
      return list
    }

    return data
  } catch (err) {
    console.warn('Could not fetch from Supabase, using fallback data:', err.message)
    return FALLBACK_PRODUCTS
  }
}

export async function getProductById(id) {
  try {
    const numId = Number(id)
    const { data, error } = await supabase
      .from('Product')
      .select('*')
      .eq('id', numId)
      .single()

    if (error || !data) {
      return FALLBACK_PRODUCTS.find((p) => p.id === numId) || null
    }

    return data
  } catch (err) {
    return FALLBACK_PRODUCTS.find((p) => p.id === Number(id)) || null
  }
}
