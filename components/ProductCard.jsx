import Image from 'next/image'
import Link from 'next/link'
import { formatPrice, getCategoryLabel } from '@/lib/presentation'
import ExchangeRateCaption from '@/components/ExchangeRateCaption'

export default function ProductCard({ product, priority = false }) {
  if (!product) return null
  const { id, name, price, category, imageUrl, brand, rating } = product

  return (
    <article className="product-card group flex h-full flex-col overflow-hidden rounded-[12px] border border-[#E8E8EC] bg-white transition duration-200">
      <Link href={`/products/${id}`} className="product-card-media relative block aspect-[1/1.05] overflow-hidden bg-[#F3F3F0]" aria-label={`ดูรายละเอียด ${name}`}>
        {imageUrl ? (
          <Image src={imageUrl} alt={name} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-contain p-5 mix-blend-multiply transition-transform duration-500 group-hover:scale-105 sm:p-7" unoptimized priority={priority} />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-xs text-[#6B6B6B]">ไม่มีรูปสินค้า</span>
        )}
        <span aria-hidden="true" className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/80 bg-white/80 text-[#575753] transition group-hover:bg-white group-hover:text-[#4F46E5]">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 18 18 6M6 6h12v12" /></svg>
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-3.5 sm:p-5">
        <div className="mb-2 flex items-center justify-between gap-2 text-[10px] text-[#6B6B6B] sm:text-[11px]">
          <span className="truncate">{getCategoryLabel(category)}</span>
          {Number.isFinite(rating) && <span className="flex shrink-0 items-center gap-1" aria-label={`คะแนน ${rating.toFixed(1)} จาก 5`}><svg aria-hidden="true" width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.2L5.8 21 7 14.2 2 9.3l6.9-1z" /></svg>{rating.toFixed(1)}</span>}
        </div>
        <h2 className="min-h-10 text-[13px] font-medium leading-5 text-[#20211F] sm:text-sm">
          <Link href={`/products/${id}`} className="line-clamp-2 transition hover:text-[#4F46E5]" title={name}>{name}</Link>
        </h2>
        {brand && <p className="mt-1 truncate text-[11px] text-[#797A75]">{brand}</p>}
        <div className="mt-auto flex items-end justify-between gap-2 pt-4">
          <div><p className="text-base font-semibold tracking-tight text-[#20211F] sm:text-lg">{formatPrice(price)}</p><ExchangeRateCaption product={product} className="mt-1 text-[9px] leading-4 text-[#85858d] sm:text-[10px]" /></div>
          <span className="hidden pb-0.5 text-[10px] text-[#797A75] sm:inline">ค่อย ๆ เลือกได้</span>
        </div>
      </div>
    </article>
  )
}
