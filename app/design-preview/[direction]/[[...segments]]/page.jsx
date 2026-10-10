import { notFound } from 'next/navigation'
import { getProductById, getProductCategories, getProducts } from '@/lib/products'
import DesignPreviewApp from '@/components/design-preview/DesignPreviewApp'

export const dynamic = 'force-dynamic'

const validDirections = new Set(['digital', 'luxury', 'calm'])
const pageSize = 18

export default async function DesignDirectionPage({ params, searchParams }) {
  const [{ direction, segments = [] }, query] = await Promise.all([params, searchParams])
  if (!validDirections.has(direction)) notFound()

  const page = segments[0] || 'home'
  const basePath = `/design-preview/${direction}`
  let data = {}

  if (page === 'home') {
    const products = await getProducts({ limit: 12 })
    data = { products: Array.isArray(products) ? products : products.products || [] }
  } else if (page === 'products' && segments[1]) {
    const product = await getProductById(segments[1])
    if (!product) notFound()
    const relatedProducts = (await getProducts({ category: product.category, limit: 5 })).filter((item) => item.id !== product.id)
    data = { product, relatedProducts }
  } else if (page === 'products') {
    const requestedPage = Math.max(1, Math.floor(Number(query?.page) || 1))
    const [result, categories] = await Promise.all([
      getProducts({ q: typeof query?.q === 'string' ? query.q : '', category: typeof query?.category === 'string' ? query.category : '', sort: typeof query?.sort === 'string' ? query.sort : '', page: requestedPage, pageSize }),
      getProductCategories(),
    ])
    data = { ...result, categories, query: { q: query?.q || '', category: query?.category || '', sort: query?.sort || '', page: requestedPage } }
  } else if (page === 'cart' || page === 'ready') {
    // Client state is read from the existing PauseCartContext.
  } else if (page === 'history') {
    // Prototype decisions are isolated in localStorage by concept, not written to production history.
  } else {
    notFound()
  }
  return <DesignPreviewApp direction={direction} page={page} basePath={basePath} data={data} />
}

export async function generateMetadata({ params }) {
  const { direction } = await params
  const names = { digital: 'Future / Digital', luxury: 'Luxury Editorial', calm: 'Calm Minimal' }
  return { title: `${names[direction] || 'Design'} preview — Pause` }
}
