import Image from 'next/image'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import ParallaxLayer from '@/components/ParallaxLayer'
import ExchangeRateCaption from '@/components/ExchangeRateCaption'
import { getProducts } from '@/lib/products'
import { formatPrice, getCategoryLabel } from '@/lib/presentation'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const products = await getProducts()
  const heroProduct = products.find((product) => /chair/i.test(product.name)) || products.find((product) => product.category === 'home-decoration') || products[0]
  const categories = [...new Set(products.map((product) => product.category))]
  const chosenCategories = ['home-decoration', 'furniture', 'beauty', 'smartphones', 'home', 'electronics', 'fashion', 'lifestyle']
    .filter((category) => categories.includes(category)).slice(0, 4)
  for (const category of categories) {
    if (chosenCategories.length >= 4) break
    if (!chosenCategories.includes(category)) chosenCategories.push(category)
  }
  const featured = [...products]
  for (let index = featured.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    const currentProduct = featured[index]
    featured[index] = featured[randomIndex]
    featured[randomIndex] = currentProduct
  }
  featured.length = Math.min(4, featured.length)

  return (
    <div className="space-y-16 sm:space-y-24">
      <section className="grid items-stretch gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div className="flex flex-col justify-center py-3 sm:py-10">
          <p className="eyebrow hero-text-reveal mb-6 flex items-center gap-3" style={{ '--text-delay': '0.04s' }}><span className="h-px w-8 bg-[#9c9ca6]" /> A little pause. A better choice.</p>
          <h1 className="font-display text-[clamp(2.6rem,5.2vw,4.6rem)] font-semibold leading-[1.25] tracking-[-.045em]">
            <span className="hero-title-line"><span className="hero-text-reveal" style={{ '--text-delay': '0.12s' }}>ของที่ชอบ</span></span>
            <span className="hero-title-line"><span className="hero-text-reveal" style={{ '--text-delay': '0.25s' }}>กับเวลา</span><span className="hero-text-reveal font-normal text-[#81818a]" style={{ '--text-delay': '0.37s' }}>ที่ได้คิด.</span></span>
          </h1>
          <p className="hero-text-reveal mt-6 max-w-[400px] text-sm leading-7 text-[#6B6B6B]" style={{ '--text-delay': '0.48s' }}>ค้นพบสิ่งที่เข้ากับชีวิตคุณ เก็บไว้ในตะกร้าพัก<br className="hidden sm:block" /> แล้วค่อยกลับมาเลือก เมื่อมั่นใจว่าต้องการจริง ๆ</p>
          <div className="hero-text-reveal mt-8 flex flex-wrap items-center gap-4" style={{ '--text-delay': '0.58s' }}>
            <Link href="/products" className="button-primary">เริ่มเลือกดูสินค้า <span aria-hidden="true">↗</span></Link>
            <a href="#how-it-works" className="button-quiet">Pause ทำงานอย่างไร <span aria-hidden="true">↓</span></a>
          </div>
          <div className="hero-text-reveal mt-12 flex items-center gap-3 border-t border-[#E8E8EC] pt-5 text-xs text-[#6B6B6B]" style={{ '--text-delay': '0.68s' }}>
            <svg aria-hidden="true" className="shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
            <span>ไม่ต้องรีบตัดสินใจ ให้เวลากับสิ่งที่สำคัญ</span>
          </div>
        </div>
        {heroProduct ? (
          <Link href={'/products/' + heroProduct.id} className="editorial-card group relative flex min-h-[380px] flex-col overflow-hidden rounded-[12px] bg-[#EEEFEB] p-6 sm:min-h-[480px] sm:p-8">
            <div className="flex items-center justify-between text-[10px] tracking-[.14em] text-[#696a64]"><span>THE EVERYDAY EDIT</span><span>01 / PAUSE</span></div>
            <div className="parallax-window relative min-h-[260px] flex-1">
              <ParallaxLayer className="absolute inset-0" speed={0.08}>
                <div className="absolute inset-0">
                  <Image src={heroProduct.imageUrl} alt={heroProduct.name} fill unoptimized sizes="(max-width: 1024px) 90vw, 48vw" priority className="object-contain p-4 transition duration-500 group-hover:scale-[1.035]" />
                </div>
              </ParallaxLayer>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-[8px] bg-white/90 p-4 sm:p-5">
              <div className="min-w-0"><p className="eyebrow">{getCategoryLabel(heroProduct.category)}</p><h2 className="mt-1 truncate text-sm font-medium">{heroProduct.name}</h2><p className="mt-1 text-xs text-[#6B6B6B]">{formatPrice(heroProduct.price)}</p><ExchangeRateCaption product={heroProduct} className="mt-1 text-[9px] leading-4 text-[#85858d]" /></div>
              <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#E8E8EC] bg-white text-lg transition group-hover:border-[#6366F1] group-hover:text-[#6366F1]">↗</span>
            </div>
          </Link>
        ) : null}
      </section>

      <section aria-labelledby="categories-title">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div><p className="eyebrow mb-2">Find your everyday</p><h2 id="categories-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">เริ่มจากสิ่งที่คุณสนใจ</h2></div>
          <Link href="/products" className="text-xs font-medium text-[#6B6B6B] hover:text-[#4F46E5]">ทุกหมวดหมู่ <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 sm:gap-5">
          {chosenCategories.map((category, index) => {
            const representative = products.find((product) => product.category === category)
            return (
              <Link href={'/products?category=' + encodeURIComponent(category)} key={category} className="editorial-card group overflow-hidden rounded-[12px] border border-[#E8E8EC] bg-white transition">
                <div className="parallax-window relative h-32 bg-[#F2F2EF] sm:h-44">
                  <span className="absolute left-4 top-4 z-10 text-[10px] text-[#777780]">0{index + 1}</span>
                  {representative?.imageUrl ? <ParallaxLayer className="absolute inset-0" speed={0.035}><div className="absolute inset-0"><Image src={representative.imageUrl} alt="" fill unoptimized sizes="(max-width: 768px) 44vw, 22vw" className="object-contain p-5 transition duration-300 group-hover:scale-105" /></div></ParallaxLayer> : null}
                </div>
                <div className="flex items-center justify-between gap-2 p-4"><span className="text-xs font-medium sm:text-sm">{getCategoryLabel(category)}</span><span aria-hidden="true" className="text-[#92929d] group-hover:text-[#6366F1]">↗</span></div>
              </Link>
            )
          })}
        </div>
      </section>

      <section aria-labelledby="featured-title">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div><p className="eyebrow mb-2">Worth a closer look</p><h2 id="featured-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">อาจเป็นชิ้นที่ใช่สำหรับคุณ</h2></div>
          <Link href="/products" className="button-secondary">ดูสินค้าทั้งหมด <span aria-hidden="true">→</span></Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 sm:gap-x-6">
          {featured.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <section id="how-it-works" className="rounded-[12px] bg-[#242527] px-6 py-10 text-[#f4f4f0] sm:p-12">
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.5fr]">
          <div><p className="eyebrow !text-[#b0b1b6]">The pause philosophy</p><h2 className="mt-4 text-3xl font-medium leading-snug tracking-tight">ชอบได้<br />โดยไม่ต้องซื้อทันที</h2><p className="mt-5 max-w-xs text-xs leading-6 text-[#b0b1b6]">การพักคิดไม่ได้ทำให้คุณพลาดสิ่งที่ต้องการ แต่ช่วยให้รู้ว่าสิ่งไหนเหมาะกับคุณ</p></div>
          <div className="grid gap-8 sm:grid-cols-3 sm:gap-6">
            {[
              ['01', 'เลือกสิ่งที่ชอบ', 'เปิดดูรายละเอียดและทำความรู้จักสินค้าก่อนตัดสินใจ'],
              ['02', 'ให้เวลาตัวเอง', 'พักไว้ 1 ชั่วโมง หรือหลายวัน ในจังหวะที่สบายใจ'],
              ['03', 'กลับมาเลือกอีกครั้ง', 'ยังอยากได้ก็ไปต่อ เปลี่ยนใจก็เป็นการตัดสินใจที่ดี'],
            ].map(([number, title, description]) => (
              <div key={number} className="border-t border-[#535459] pt-5"><span className="font-mono text-xs text-[#b0b1b6]">{number}</span><h3 className="mt-6 text-sm font-medium">{title}</h3><p className="mt-3 text-xs leading-6 text-[#b0b1b6]">{description}</p></div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
