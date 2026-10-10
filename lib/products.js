import { supabase } from './supabase.js'
const hasDatabase = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

function requireDatabase() {
  if (!hasDatabase) throw new Error('ยังไม่ได้ตั้งค่า Supabase สำหรับแคตตาล็อกสินค้า')
}

function toAppProductFromDb(product) {
  const price = Number(product.price || 0)
  const priceUsd = product.priceUsd == null ? null : Number(product.priceUsd)
  const rate = product.usdToThbRate == null ? null : Number(product.usdToThbRate)
  return {
    id: Number(product.id),
    name: product.name || 'สินค้าไม่มีชื่อ',
    price,
    priceUsd,
    usdToThbRate: rate,
    exchangeRateDate: product.exchangeRateDate || null,
    exchangeRateSource: product.exchangeRateSource || null,
    category: product.category || 'อื่น ๆ',
    imageUrl: product.imageUrl || '',
    description: product.description || '',
    images: product.imageUrl ? [product.imageUrl] : [],
    brand: product.brand || '',
    rating: product.rating != null && Number.isFinite(Number(product.rating)) ? Number(product.rating) : null,
    stock: product.stock != null && Number.isFinite(Number(product.stock)) ? Number(product.stock) : null,
    shippingInformation: product.shippingInformation || '',
    warrantyInformation: product.warrantyInformation || '',
    returnPolicy: product.returnPolicy || '',
  }
}

export async function getProducts({
  q = '',
  category = '',
  limit = 0,
  page = null,
  pageSize = 24,
  sort = '',
} = {}) {
  requireDatabase()
  const isPaginated = page !== null && page !== undefined

  // 1. ดึงสินค้าจาก Supabase Database เป็นหลัก (Pure Database Query)
  if (hasDatabase) {
    try {
      // Selective Column Projection ตาม TEAM_GUIDE:
      // ดึงเฉพาะคอลัมน์ที่จำเป็นต่อการ์ด ไม่ดึง description ขนาดยาว เพื่อประหยัด Bandwidth
      const selectColumns = isPaginated
        ? 'id, name, price, category, imageUrl, rating'
        : '*'

      let query = supabase.from('Product').select(selectColumns, { count: 'exact' })

      if (category) {
        query = query.eq('category', category)
      }
      if (q.trim()) {
        query = query.ilike('name', `%${q.trim()}%`)
      }

      // เรียงลำดับที่ระดับฐานข้อมูล
      if (sort === 'price-asc') {
        query = query.order('price', { ascending: true })
      } else if (sort === 'price-desc') {
        query = query.order('price', { ascending: false })
      } else if (sort === 'name') {
        query = query.order('name', { ascending: true })
      } else {
        query = query.order('id', { ascending: true })
      }

      // Database-level Pagination ด้วยคำสั่ง .range(from, to)
      if (isPaginated) {
        const currentPage = Math.max(1, Math.floor(Number(page) || 1))
        const from = (currentPage - 1) * pageSize
        const to = from + pageSize - 1
        query = query.range(from, to)

        const { data, count, error } = await query
        if (error) {
          console.error('ดึงสินค้าแบบ Pagination จาก Supabase ไม่สำเร็จ:', error.message)
          throw new Error('โหลดแคตตาลอกจาก Supabase ไม่สำเร็จ')
        }
        return {
          products: (data || []).map(toAppProductFromDb),
          total: count ?? data?.length ?? 0,
          page: currentPage,
          pageSize,
        }
      } else {
        if (Number.isInteger(limit) && limit > 0) {
          query = query.limit(limit)
        }
        const { data, error } = await query
        if (error) {
          console.error('ดึงสินค้าจาก Supabase ไม่สำเร็จ:', error.message)
          throw new Error('โหลดแคตตาลอกจาก Supabase ไม่สำเร็จ')
        }
        return (data || []).map(toAppProductFromDb)
      }
    } catch (dbError) {
      console.error('เกิดข้อผิดพลาดในการเชื่อมต่อ Supabase:', dbError)
      throw new Error('โหลดแคตตาลอกจาก Supabase ไม่สำเร็จ')
    }
  }

}

export async function getProductCategories() {
  requireDatabase()
  const { data, error } = await supabase.from('Product').select('category')
  if (error) {
    console.error('ดึงหมวดหมู่จาก Supabase ไม่สำเร็จ:', error.message)
    throw new Error('โหลดหมวดหมู่จาก Supabase ไม่สำเร็จ')
  }
  const uniqueCategories = [...new Set((data || []).map((row) => row.category).filter(Boolean))].sort()
  return uniqueCategories.map((slug) => ({ slug, name: slug }))
}

export async function getProductById(id) {
  requireDatabase()
  const productId = Number(id)
  if (!Number.isInteger(productId) || productId < 1) return null

  const { data, error } = await supabase
    .from('Product')
    .select('*')
    .eq('id', productId)
    .maybeSingle()

  if (error) {
    console.error('ดึงรายละเอียดสินค้าจาก Supabase ไม่สำเร็จ:', error.message)
    throw new Error('โหลดรายละเอียดสินค้าจาก Supabase ไม่สำเร็จ')
  }
  return data ? toAppProductFromDb(data) : null
}
