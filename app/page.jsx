// 👤 กิต — app/page.jsx (หน้าแรก Landing & Showcase สินค้าไฮไลต์)
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { getProducts } from '@/lib/products'

export default async function HomePage() {
  const products = await getProducts()
  const featured = products.slice(0, 3)

  return (
    <div className="space-y-12 py-4">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-8 sm:p-12 text-white shadow-xl">
        <div className="max-w-2xl space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-400/20">
            ⏳ Friction is friend · ซื้อของอย่างมีสติ
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Pause — ตะกร้าที่บังคับให้คิดก่อนซื้อ
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            ตัดปุ่ม "ซื้อทันที" เพื่อลด Impulse Buying
            เลือกสินค้าเข้าตะกร้าพักและกำหนดเวลานับถอยหลัง
            เมื่อครบเวลาค่อยถามใจตัวเองอีกครั้งว่ายังอยากได้อยู่จริงไหม
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-amber-400 shadow-md"
            >
              เลือกดูสินค้าทั้งหมด →
            </Link>
            <Link
              href="/cart"
              className="rounded-xl bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-xs transition hover:bg-white/20"
            >
              ดูตะกร้าพักของคุณ
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">สินค้าแนะนำ</h2>
            <p className="text-xs text-slate-500">
              ทดลองเลือกสินค้าเพื่อเริ่มประสบการณ์ "หยุดคิดก่อนซื้อ"
            </p>
          </div>
          <Link
            href="/products"
            className="text-xs font-bold text-slate-700 hover:text-slate-900 underline"
          >
            ดูทั้งหมด ({products.length}) →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  )
}
