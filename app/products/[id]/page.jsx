// 👤 พี — app/products/[id]/page.jsx (หน้ารายละเอียดสินค้า + เลือกเวลาพักคิด + ปุ่ม Pause/Skip)
import { getProductById } from '@/lib/products'
import { notFound } from 'next/navigation'
import PauseButton from '@/components/PauseButton'
import Link from 'next/link'

export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params
  const id = resolvedParams?.id
  const product = await getProductById(id)

  if (!product) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <Link
        href="/products"
        className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-slate-800"
      >
        ← กลับไปหน้ารายการสินค้า
      </Link>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square md:aspect-auto bg-slate-100 p-6 flex items-center justify-center">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="max-h-96 w-full object-contain rounded-xl"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-between p-6 sm:p-8 space-y-6">
            <div className="space-y-3">
              <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 uppercase tracking-wide">
                {product.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                {product.name}
              </h1>
              <p className="text-3xl font-extrabold text-slate-900">
                ฿{product.price.toLocaleString()}
              </p>
              <div className="pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  รายละเอียดสินค้า
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Action Box */}
            <div className="pt-4 border-t border-slate-100">
              <PauseButton productId={product.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
