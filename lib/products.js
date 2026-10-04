import { supabase } from './supabase.js'
import { SAMPLE_PRODUCTS } from './sample-products.mjs'
import { convertUsdToThb, getUsdToThbRate } from './currency.js'

const API_BASE_URL = (process.env.DUMMYJSON_BASE_URL || 'https://dummyjson.com').replace(/\/$/, '')
const hasDatabase = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

// แคตตาล็อกสำรองสำหรับกรณี API หรือ Database ไม่พร้อมใช้งาน
export const FALLBACK_PRODUCTS = SAMPLE_PRODUCTS

function toAppProductFromDb(product, exchange = null) {
  const price = Number(product.price || 0)
  const rate = exchange?.rate || null
  const priceUsd = (rate && price) ? Number((price / rate).toFixed(2)) : null
  return {
    id: Number(product.id),
    name: product.name || 'สินค้าไม่มีชื่อ',
    price,
    priceUsd,
    usdToThbRate: rate,
    exchangeRateDate: exchange?.date ?? null,
    exchangeRateSource: exchange?.source ?? null,
    category: product.category || 'อื่น ๆ',
    imageUrl: product.imageUrl || '',
    description: product.description || '',
    images: product.imageUrl ? [product.imageUrl] : [],
    brand: product.brand || '',
    rating: Number.isFinite(product.rating) ? product.rating : 4.5,
    stock: Number.isFinite(product.stock) ? product.stock : 10,
    shippingInformation: product.shippingInformation || 'จัดส่งภายใน 2-3 วันทำการ',
    warrantyInformation: product.warrantyInformation || 'รับประกันความพึงพอใจ 7 วัน',
    returnPolicy: product.returnPolicy || 'คืนสินค้าได้ภายใน 7 วัน',
  }
}

function toAppProduct(product, exchange = null) {
  const priceUsd = Number(product.price || 0)
  return {
    id: Number(product.id),
    name: product.title || product.name || 'สินค้าไม่มีชื่อ',
    price: exchange ? convertUsdToThb(priceUsd, exchange.rate) : priceUsd,
    priceUsd: exchange ? priceUsd : null,
    usdToThbRate: exchange?.rate ?? null,
    exchangeRateDate: exchange?.date ?? null,
    exchangeRateSource: exchange?.source ?? null,
    category: product.category || 'อื่น ๆ',
    imageUrl: product.thumbnail || product.images?.[0] || product.imageUrl || '',
    description: product.description || '',
    images: Array.isArray(product.images) ? product.images : [],
    brand: product.brand || '',
    rating: Number.isFinite(product.rating) ? product.rating : null,
    stock: Number.isFinite(product.stock) ? product.stock : null,
    shippingInformation: product.shippingInformation || '',
    warrantyInformation: product.warrantyInformation || '',
    returnPolicy: product.returnPolicy || '',
  }
}

async function fetchDummyJson(path) {
  const response = await fetch(`${API_BASE_URL}${path}`, { next: { revalidate: 60 } })
  if (!response.ok) {
    const error = new Error(`DummyJSON ตอบกลับ ${response.status}`)
    error.status = response.status
    throw error
  }
  return response.json()
}

export async function getProducts({ q = '', category = '' } = {}) {
  const exchange = await getUsdToThbRate()

  // 1. ดึงสินค้าจาก Supabase Database เป็นหลัก
  if (hasDatabase) {
    try {
      let query = supabase.from('Product').select('*').order('id', { ascending: true })
      if (category) {
        query = query.eq('category', category)
      }
      if (q.trim()) {
        query = query.ilike('name', `%${q.trim()}%`)
      }

      const { data, error } = await query
      if (!error && Array.isArray(data) && data.length > 0) {
        return data.map((product) => toAppProductFromDb(product, exchange))
      }
      if (error) {
        console.error('ดึงสินค้าจาก Supabase ไม่สำเร็จ:', error.message)
      }
    } catch (dbError) {
      console.error('เกิดข้อผิดพลาดในการเชื่อมต่อ Supabase:', dbError)
    }
  }

  // 2. สำรอง: หาก Supabase ล้มเหลวหรือยังไม่มีตาราง ให้ดึงจาก DummyJSON API
  try {
    const result = await fetchDummyJson('/products?limit=0')
    if (!Array.isArray(result.products)) throw new Error('รูปแบบข้อมูล Products จาก DummyJSON ไม่ถูกต้อง')

    const term = q.trim().toLocaleLowerCase('th')
    return result.products
      .map((product) => toAppProduct(product, exchange))
      .filter((product) => (!category || product.category === category)
        && (!term || product.name.toLocaleLowerCase('th').includes(term)))
  } catch (error) {
    console.error('โหลดสินค้าจาก DummyJSON ไม่สำเร็จ ใช้ข้อมูลสำรองแทน:', error?.message || error)
    const term = q.trim().toLocaleLowerCase('th')
    return FALLBACK_PRODUCTS.filter((product) => (!category || product.category === category)
      && (!term || product.name.toLocaleLowerCase('th').includes(term)))
  }
}

export async function getProductCategories() {
  // 1. ดึงหมวดหมู่จาก Supabase Database เป็นหลัก
  if (hasDatabase) {
    try {
      const { data, error } = await supabase.from('Product').select('category')
      if (!error && Array.isArray(data) && data.length > 0) {
        const uniqueCategories = [...new Set(data.map((row) => row.category).filter(Boolean))].sort()
        return uniqueCategories.map((slug) => ({ slug, name: slug }))
      }
    } catch (err) {
      console.error('ดึงหมวดหมู่จาก Supabase ไม่สำเร็จ:', err)
    }
  }

  // 2. สำรอง: หาก Supabase ไม่พร้อมใช้งาน ให้ดึงจาก DummyJSON API
  try {
    const categories = await fetchDummyJson('/products/categories')
    if (Array.isArray(categories) && categories.length) {
      return categories.map((category) => ({ slug: category.slug, name: category.name || category.slug }))
    }
    return []
  } catch (error) {
    console.error('โหลดหมวดหมู่จาก DummyJSON ไม่สำเร็จ:', error?.message || error)
    return [...new Set(FALLBACK_PRODUCTS.map((product) => product.category))]
      .map((slug) => ({ slug, name: slug }))
  }
}

export async function getProductById(id) {
  const productId = Number(id)
  if (!Number.isInteger(productId) || productId < 1) return null

  const exchange = await getUsdToThbRate()

  // 1. ดึงข้อมูลสินค้าจาก Supabase Database เป็นหลัก
  if (hasDatabase) {
    try {
      const { data, error } = await supabase
        .from('Product')
        .select('*')
        .eq('id', productId)
        .maybeSingle()

      if (!error && data) {
        return toAppProductFromDb(data, exchange)
      }
    } catch (err) {
      console.error('ดึงรายละเอียดสินค้าจาก Supabase ไม่สำเร็จ:', err)
    }
  }

  // 2. สำรอง: หาก Supabase ไม่พบหรือไม่พร้อมใช้งาน ให้ดึงจาก DummyJSON API
  try {
    const product = await fetchDummyJson(`/products/${productId}`)
    return toAppProduct(product, exchange)
  } catch (error) {
    if (error?.status === 404) return null
    console.error('โหลดรายละเอียดสินค้าจาก DummyJSON ไม่สำเร็จ:', error?.message || error)
    return FALLBACK_PRODUCTS.find((product) => product.id === productId) || null
  }
}
