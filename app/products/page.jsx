import Link from 'next/link'
import SearchFilter from '@/components/SearchFilter'
import ProductCard from '@/components/ProductCard'
import { getProductCategories, getProducts } from '@/lib/products'
import { getCategoryLabel } from '@/lib/presentation'

export const metadata = { title: 'เลือกดูสินค้า — Pause' }
const PAGE_SIZE = 24

export default async function ProductsPage({ searchParams }) {
  const resolvedParams = await searchParams
  const q = typeof resolvedParams?.q === 'string' ? resolvedParams.q : ''
  const category = typeof resolvedParams?.category === 'string' ? resolvedParams.category : ''
  const sort = typeof resolvedParams?.sort === 'string' ? resolvedParams.sort : ''

  const [products, categories] = await Promise.all([getProducts({ q, category }), getProductCategories()])
  const sortedProducts = [...products]
  if (sort === 'price-asc') sortedProducts.sort((a, b) => a.price - b.price)
  if (sort === 'price-desc') sortedProducts.sort((a, b) => b.price - a.price)
  if (sort === 'name') sortedProducts.sort((a, b) => a.name.localeCompare(b.name, 'th'))
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / PAGE_SIZE))
  const requestedPage = Number(resolvedParams?.page) || 1
  const page = Math.min(totalPages, Math.max(1, Math.floor(requestedPage)))
  const visibleProducts = sortedProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function pageHref(nextPage) {
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (category) params.set('category', category)
    if (sort) params.set('sort', sort)
    if (nextPage > 1) params.set('page', String(nextPage))
    return `/products${params.size ? `?${params.toString()}` : ''}`
  }

  const paginationPages = [...new Set([1, page - 1, page, page + 1, totalPages])].filter((item) => item >= 1 && item <= totalPages).sort((a, b) => a - b)

  return (
    <div className="space-y-8 pb-8 sm:space-y-10">
      <header className="flex flex-col justify-between gap-6 border-b border-[#E8E8EC] pb-8 pt-3 sm:flex-row sm:items-end sm:pb-10">
        <div>
          <p className="eyebrow mb-4">THE CONSIDERED COLLECTION</p>
          <h1 className="page-heading">เลือกสิ่งที่ใช่<br /><span className="text-[#77796F]">ในจังหวะของคุณ</span></h1>
        </div>
        <p className="max-w-xs text-sm leading-7 text-[#6B6B6B]">ของที่ชอบ อาจไม่ต้องซื้อทันที<br />เลือกดู เก็บไว้ แล้วให้เวลาช่วยตัดสินใจ</p>
      </header>

      <section aria-label="แคตตาล็อกสินค้า" className="space-y-6">
        <SearchFilter categories={categories} />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p role="status" className="text-sm text-[#6B6B6B]"><span className="font-medium text-[#20211F]">{q ? `ผลการค้นหา “${q}”` : category ? getCategoryLabel(category) : 'สินค้าทั้งหมด'}</span><span className="mx-2.5 text-[#C7C8C1]">/</span>{products.length.toLocaleString('th-TH')} รายการ</p>
          {products.length > 0 && <p className="text-xs text-[#77796F]">แสดง {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, products.length)}</p>}
        </div>
        {visibleProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {visibleProducts.map((product, index) => <ProductCard key={product.id} product={product} priority={index < 4} />)}
          </div>
        ) : (
          <div className="empty-state py-20 text-center">
            <div aria-hidden="true" className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#F0F1ED] text-[#77796F]"><svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4.5 4.5" /></svg></div>
            <h2 className="text-xl font-semibold text-[#20211F]">ยังไม่เจอสิ่งที่คุณมองหา</h2>
            <p className="mb-6 mt-2 text-sm text-[#6B6B6B]">ลองใช้คำค้นที่สั้นลง หรือเลือกดูหมวดหมู่อื่น</p>
            <Link href="/products" className="button-secondary">ดูสินค้าทั้งหมด</Link>
          </div>
        )}

        {totalPages > 1 && <nav aria-label="หน้ารายการสินค้า" className="flex items-center justify-center gap-2 border-t border-[#E8E8EC] pt-8">
          {page > 1 ? <Link href={pageHref(page - 1)} aria-label="หน้าก่อนหน้า" className="flex h-10 w-10 items-center justify-center rounded-[6px] border border-[#E8E8EC] bg-white text-[#6B6B6B] hover:border-[#6366F1]">←</Link> : <span aria-hidden="true" className="h-10 w-10" />}
          <p className="px-4 text-sm text-[#6B6B6B] sm:hidden">หน้า {page} จาก {totalPages}</p>
          {paginationPages.map((item, index) => <span key={item} className="hidden items-center gap-2 sm:flex">{index > 0 && item - paginationPages[index - 1] > 1 && <span aria-hidden="true" className="px-1 text-[#9C9C9C]">…</span>}<Link href={pageHref(item)} aria-current={page === item ? 'page' : undefined} aria-label={`หน้า ${item}`} className={`flex h-10 min-w-10 items-center justify-center rounded-[6px] border px-2 text-sm transition ${page === item ? 'border-[#6366F1] bg-[#6366F1] text-white' : 'border-[#E8E8EC] bg-white text-[#6B6B6B] hover:border-[#6366F1]'}`}>{item}</Link></span>)}
          {page < totalPages ? <Link href={pageHref(page + 1)} aria-label="หน้าถัดไป" className="flex h-10 w-10 items-center justify-center rounded-[6px] border border-[#E8E8EC] bg-white text-[#6B6B6B] hover:border-[#6366F1]">→</Link> : <span aria-hidden="true" className="h-10 w-10" />}
        </nav>}
      </section>
      <aside className="flex flex-col justify-between gap-3 border-t border-[#E8E8EC] pt-6 text-xs text-[#6B6B6B] sm:flex-row"><p>เลือกได้เต็มที่ ตัดสินใจเมื่อพร้อม</p><p>Pause · A little time. A better choice.</p></aside>
    </div>
  )
}
