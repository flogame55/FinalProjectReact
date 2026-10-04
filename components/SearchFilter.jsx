'use client'

import { useEffect, useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getCategoryLabel } from '@/lib/presentation'

export default function SearchFilter({ categories = [] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const category = searchParams.get('category') || ''
  const sort = searchParams.get('sort') || 'featured'
  const [search, setSearch] = useState(query)
  const [isPending, startTransition] = useTransition()

  useEffect(() => setSearch(query), [query])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.trim() === query) return
      const params = new URLSearchParams(searchParams.toString())
      if (search.trim()) params.set('q', search.trim())
      else params.delete('q')
      params.delete('page')
      const suffix = params.toString()
      startTransition(() => router.replace(`/products${suffix ? `?${suffix}` : ''}`, { scroll: false }))
    }, 350)
    return () => clearTimeout(timer)
  }, [search, query, router, searchParams])

  function updateFilter(key, value) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set(key, value)
    else params.delete(key)
    if (search.trim()) params.set('q', search.trim())
    else params.delete('q')
    params.delete('page')
    const suffix = params.toString()
    startTransition(() => router.push(`/products${suffix ? `?${suffix}` : ''}`, { scroll: false }))
  }

  const featuredCategories = ['beauty', 'furniture', 'home-decoration', 'smartphones', 'womens-bags', 'electronics', 'fashion', 'home']
    .filter((slug) => categories.some((item) => item.slug === slug)).slice(0, 5)
  if (category && !featuredCategories.includes(category)) featuredCategories.push(category)

  return (
    <div aria-busy={isPending} className="space-y-5 border-b border-[#E8E8EC] pb-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end">
        <label className="relative flex-1">
          <span className="sr-only">ค้นหาสินค้า</span>
          <svg aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#6B6B6B]" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4.5 4.5" /></svg>
          <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="วันนี้กำลังมองหาอะไรอยู่?" className="h-12 w-full rounded-[6px] border border-[#E8E8EC] bg-white pl-12 pr-4 text-sm text-[#20211F] placeholder:text-[#85867F] focus:border-[#6366F1] focus:outline-none focus:ring-3 focus:ring-[#6366F1]/12" />
        </label>
        <div className="grid grid-cols-2 gap-3 md:w-auto md:min-w-[380px]">
          <label className="min-w-0">
            <span className="sr-only">เลือกหมวดหมู่</span>
            <select value={category} onChange={(event) => updateFilter('category', event.target.value)} className="h-12 w-full rounded-[6px] border border-[#E8E8EC] bg-white px-3 text-sm text-[#4F504C] focus:border-[#6366F1] focus:outline-none focus:ring-3 focus:ring-[#6366F1]/12">
              <option value="">ทุกหมวดหมู่</option>
              {categories.map(({ slug }) => <option key={slug} value={slug}>{getCategoryLabel(slug)}</option>)}
            </select>
          </label>
          <label className="min-w-0">
            <span className="sr-only">เรียงลำดับสินค้า</span>
            <select value={sort} onChange={(event) => updateFilter('sort', event.target.value === 'featured' ? '' : event.target.value)} className="h-12 w-full rounded-[6px] border border-[#E8E8EC] bg-white px-3 text-sm text-[#4F504C] focus:border-[#6366F1] focus:outline-none focus:ring-3 focus:ring-[#6366F1]/12">
              <option value="featured">เรียงตามค่าเริ่มต้น</option>
              <option value="price-asc">ราคา: น้อยไปมาก</option>
              <option value="price-desc">ราคา: มากไปน้อย</option>
              <option value="name">ชื่อสินค้า: A–Z</option>
            </select>
          </label>
        </div>
      </div>
      <div className="flex items-center gap-2 overflow-x-auto pb-1" aria-label="เลือกหมวดหมู่">
        {[{ slug: '', label: 'ทั้งหมด' }, ...featuredCategories.map((slug) => ({ slug, label: getCategoryLabel(slug) }))].map(({ slug, label }) => (
          <button key={slug} type="button" onClick={() => updateFilter('category', slug)} aria-pressed={category === slug} className={`shrink-0 rounded-full border px-4 py-2 text-xs transition ${category === slug ? 'border-[#6366F1] bg-[#6366F1] text-white' : 'border-[#E8E8EC] bg-white text-[#6B6B6B] hover:border-[#AAAAB6] hover:text-[#20211F]'}`}>{label}</button>
        ))}
        {(query || category) && <button type="button" onClick={() => { setSearch(''); startTransition(() => router.push('/products', { scroll: false })) }} className="ml-auto shrink-0 px-3 py-2 text-xs text-[#6B6B6B] underline underline-offset-4 hover:text-[#20211F]">ล้างตัวกรอง</button>}
      </div>
      {isPending && <span role="status" className="sr-only">กำลังอัปเดตสินค้า</span>}
    </div>
  )
}
