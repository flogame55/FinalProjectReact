import { cache } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProductById, getProducts } from '@/lib/products'
import { formatPrice, getCategoryLabel } from '@/lib/presentation'
import ExchangeRateCaption from '@/components/ExchangeRateCaption'
import PauseButton from '@/components/PauseButton'
import ProductGallery from '@/components/ProductGallery'
import ProductCard from '@/components/ProductCard'

// generateMetadata และหน้าเพจใช้สินค้าตัวเดียวกัน — cache ไว้เพื่อ query ฐานข้อมูลครั้งเดียวต่อ request
const getProduct = cache(getProductById)

export async function generateMetadata({ params }) {
  const { id } = await params
  const product = await getProduct(id)
  if (!product) return { title: 'ไม่พบสินค้า' }
  return { title: product.name, description: product.description?.slice(0, 160) || undefined }
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params
  const product = await getProduct(id)
  if (!product) notFound()

  const relatedProducts = (await getProducts({ category: product.category, limit: 6 })).filter((item) => item.id !== product.id).slice(0, 4)
  const categoryLabel = getCategoryLabel(product.category)
  const details = [
    ['แบรนด์', product.brand],
    ['หมวดหมู่', categoryLabel],
    ['การจัดส่ง', product.shippingInformation],
    ['การรับประกัน', product.warrantyInformation],
    ['การคืนสินค้า', product.returnPolicy],
  ].filter(([, value]) => value)

  return (
    <div className="space-y-9 pb-8 sm:space-y-14">
      <nav aria-label="เส้นทางหน้าสินค้า" className="flex min-w-0 items-center gap-2.5 text-xs text-[#77796F] sm:gap-3"><Link href="/products" className="shrink-0 hover:text-[#4F46E5]">สินค้าทั้งหมด</Link><span aria-hidden="true">/</span><Link href={`/products?category=${encodeURIComponent(product.category)}`} className="shrink-0 hover:text-[#4F46E5]">{categoryLabel}</Link><span aria-hidden="true">/</span><span className="truncate text-[#20211F]" aria-current="page">{product.name}</span></nav>
      <section className="grid items-start gap-8 lg:grid-cols-2 lg:gap-16">
        <ProductGallery key={product.id} product={product} />
        <div className="space-y-7 lg:pt-3">
          <div>
            <p className="eyebrow mb-4">{product.brand || categoryLabel}</p>
            <h1 className="text-3xl font-semibold leading-[1.2] tracking-[-0.035em] text-[#20211F] sm:text-4xl">{product.name}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[#6B6B6B]">
              <span>{categoryLabel}</span>
              {Number.isFinite(product.rating) && <><span aria-hidden="true" className="text-[#CECEC8]">/</span><span className="flex items-center gap-1.5"><svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.2L5.8 21 7 14.2 2 9.3l6.9-1z" /></svg>{product.rating.toFixed(1)} / 5</span></>}
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 border-y border-[#E8E8EC] py-5">
            <div><p className="text-3xl font-semibold tracking-tight text-[#20211F]">{formatPrice(product.price)}</p><ExchangeRateCaption product={product} className="mt-1 text-xs text-[#85858d]" /></div>
            {Number.isFinite(product.stock) && <span className={`inline-flex items-center gap-2 text-xs ${product.stock > 0 ? 'text-[#526151]' : 'text-[#6B6B6B]'}`}><span className={`h-1.5 w-1.5 rounded-full ${product.stock > 0 ? 'bg-[#73836A]' : 'bg-[#A8A9A2]'}`} />{product.stock > 0 ? 'มีสินค้า' : 'สินค้าหมด'}</span>}
          </div>
          {product.description && <p className="text-sm leading-7 text-[#6B6B6B]">{product.description}</p>}

          <div className="rounded-[12px] border border-[#E1E3DC] bg-[#F1F3ED] p-5 sm:p-6">
            <div className="flex items-start gap-3"><span aria-hidden="true" className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#D9DED2] text-[#65725D]"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M8 5v14M16 5v14" /></svg></span><div><h2 className="text-sm font-semibold text-[#30382C]">ชอบได้ ยังไม่ต้องรีบซื้อ</h2><p className="mt-1 text-xs leading-6 text-[#66705F]">พักชิ้นนี้ไว้ในตะกร้า แล้วกลับมาตัดสินใจอีกครั้งเมื่อคุณพร้อม</p></div></div>
          </div>
          <div className="space-y-3">
            {product.stock === 0 ? <button type="button" disabled className="w-full cursor-not-allowed rounded-[6px] bg-[#E8E8EC] px-5 py-3 text-sm text-[#77796F]">สินค้าหมดชั่วคราว</button> : <PauseButton productId={product.id} product={product} />}
            <p className="text-center text-[11px] leading-5 text-[#77796F]">การพักสินค้าไว้ยังไม่มีค่าใช้จ่าย</p>
          </div>
          <details className="group border-t border-[#E8E8EC] pt-5" open>
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-[#20211F]">รายละเอียดเพิ่มเติม<span aria-hidden="true" className="text-lg font-normal text-[#77796F] group-open:rotate-45">+</span></summary>
            <dl className="mt-4 space-y-3">{details.map(([label, value]) => <div key={label} className="grid grid-cols-[110px_1fr] gap-4 text-xs leading-6"><dt className="text-[#77796F]">{label}</dt><dd className="text-[#4F504C]">{value}</dd></div>)}</dl>
          </details>
        </div>
      </section>
      {relatedProducts.length > 0 && <section className="space-y-6 border-t border-[#E8E8EC] pt-10 sm:pt-14"><div className="flex items-end justify-between gap-4"><div><p className="eyebrow mb-3">A LITTLE MORE TO EXPLORE</p><h2 className="text-2xl font-semibold tracking-tight text-[#20211F]">ลองดูชิ้นอื่น ๆ ด้วย</h2></div><Link href={`/products?category=${encodeURIComponent(product.category)}`} className="shrink-0 text-xs text-[#6B6B6B] underline decoration-[#C7C8C1] underline-offset-4 hover:text-[#4F46E5]">ดูในหมวดนี้ <span aria-hidden="true">↗</span></Link></div><div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">{relatedProducts.map((item) => <ProductCard key={item.id} product={item} />)}</div></section>}
    </div>
  )
}
