import { SAMPLE_PRODUCTS } from './sample-products.mjs'
import { convertUsdToThb, getUsdToThbRate } from './currency'

const API_BASE_URL = (process.env.DUMMYJSON_BASE_URL || 'https://dummyjson.com').replace(/\/$/, '')

// แคตตาล็อกสำรองสำหรับกรณี API ไม่พร้อมใช้งาน
export const FALLBACK_PRODUCTS = SAMPLE_PRODUCTS

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
  try {
    // limit=0 ขอข้อมูลทั้งหมด; แคตตาล็อกมีขนาดเล็กพอสำหรับการกรองฝั่งเซิร์ฟเวอร์
    const result = await fetchDummyJson('/products?limit=0')
    if (!Array.isArray(result.products)) throw new Error('รูปแบบข้อมูล Products จาก DummyJSON ไม่ถูกต้อง')

    const term = q.trim().toLocaleLowerCase('th')
    const exchange = await getUsdToThbRate()
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

  try {
    const [product, exchange] = await Promise.all([
      fetchDummyJson(`/products/${productId}`),
      getUsdToThbRate(),
    ])
    return toAppProduct(product, exchange)
  } catch (error) {
    if (error?.status === 404) return null
    console.error('โหลดรายละเอียดสินค้าจาก DummyJSON ไม่สำเร็จ:', error?.message || error)
    return FALLBACK_PRODUCTS.find((product) => product.id === productId) || null
  }
}
