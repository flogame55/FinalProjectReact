'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function ProductGallery({ product }) {
  const images = [...new Set([product.imageUrl, ...(product.images || [])].filter(Boolean))]
  const [selected, setSelected] = useState(0)

  return (
    <div className="space-y-3">
      <div className="relative aspect-square overflow-hidden rounded-[12px] border border-[#E8E8EC] bg-[#F3F3F0]">
        {images.length ? <Image src={images[selected]} alt={product.name} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain p-10 mix-blend-multiply sm:p-14" priority unoptimized /> : <span className="absolute inset-0 flex items-center justify-center text-sm text-[#6B6B6B]">ไม่มีรูปสินค้า</span>}
        <span className="absolute bottom-5 left-5 text-[10px] tracking-[0.18em] text-[#77796F]">TAKE A CLOSER LOOK</span>
        {images.length > 1 && <span className="absolute bottom-5 right-5 text-xs text-[#77796F]">{selected + 1} / {images.length}</span>}
      </div>
      {images.length > 1 && <div className="flex gap-3 overflow-x-auto pb-1" aria-label="เลือกรูปสินค้า">{images.map((src, index) => <button key={src} type="button" onClick={() => setSelected(index)} aria-label={`ดูรูปที่ ${index + 1}`} aria-pressed={selected === index} className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-[6px] border bg-[#F3F3F0] transition ${selected === index ? 'border-[#6366F1] ring-1 ring-[#6366F1]' : 'border-[#E8E8EC] hover:border-[#AAAAB6]'}`}><Image src={src} alt="" fill sizes="80px" className="object-contain p-2 mix-blend-multiply" unoptimized /></button>)}</div>}
    </div>
  )
}
