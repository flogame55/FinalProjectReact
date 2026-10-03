'use client'

// 👤 โฟ — app/cart/page.jsx (หน้าตะกร้าพัก Cooling-off Cart + Countdown Timer + Dev Fast-forward)
import { usePauseCart } from '@/context/PauseCartContext'
import Countdown from '@/components/Countdown'
import Link from 'next/link'
import { FALLBACK_PRODUCTS } from '@/lib/products'

export default function CartPage() {
  const { items, removeItem, skipItem, devFastForward, setDevFastForward } = usePauseCart()

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center space-y-4">
        <p className="text-4xl">🛒</p>
        <h2 className="text-xl font-bold text-slate-900">ตะกร้าพักของคุณว่างเปล่า</h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          ยังไม่มีสินค้าที่กำลังรอพักคิด ลองเลือกสินค้าที่คุณอยากได้มาใส่ตะกร้าพักไว้ก่อน
        </p>
        <Link
          href="/products"
          className="inline-block rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
        >
          เลือกสินค้าเข้าตะกร้าพัก →
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            ตะกร้าพัก (Cooling-off Cart)
          </h1>
          <p className="text-xs text-slate-500">
            สินค้าที่กำลังอยู่ในระยะเวลาหน่วงความคิด ({items.length} รายการ)
          </p>
        </div>

        {/* Dev Mode Toggle */}
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg text-xs">
          <span className="font-bold text-amber-800">🛠️ โหมดพรีเซนต์ (Dev Mode):</span>
          <button
            onClick={() => setDevFastForward(!devFastForward)}
            className={`px-2 py-0.5 rounded font-bold transition ${
              devFastForward
                ? 'bg-amber-600 text-white'
                : 'bg-white text-slate-700 border border-slate-300'
            }`}
          >
            {devFastForward ? 'ON (เร่งเวลา)' : 'OFF (เวลาจริง)'}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item) => {
          const product =
            FALLBACK_PRODUCTS.find((p) => p.id === item.productId) || {
              name: `สินค้า #${item.productId}`,
              price: 0,
              imageUrl: '',
            }

          return (
            <div
              key={item.productId}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-xs"
            >
              <div className="flex items-center gap-4">
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-16 w-16 rounded-lg object-cover bg-slate-100 shrink-0"
                  />
                )}
                <div>
                  <h3 className="font-semibold text-slate-900 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm font-bold text-slate-900">
                    ฿{product.price.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-400">
                    เริ่มพักเมื่อ: {new Date(item.addedAt).toLocaleTimeString('th-TH')}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:items-end gap-3 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                <Countdown
                  readyAt={item.readyAt}
                  onSkip={() => skipItem(item.productId)}
                  isFastForward={devFastForward}
                />
                <button
                  onClick={() => removeItem(item.productId)}
                  className="text-xs text-slate-400 hover:text-rose-600 transition self-start sm:self-auto"
                >
                  ยกเลิกออกจากตะกร้า
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="rounded-xl bg-slate-100 p-4 flex items-center justify-between text-xs text-slate-600">
        <span>มีสินค้าที่ครบกำหนดแล้วหรือต้องการตัดสินใจทันที?</span>
        <Link
          href="/ready"
          className="font-bold text-slate-900 underline hover:text-amber-600"
        >
          ไปที่หน้ารายการพร้อมตัดสินใจ →
        </Link>
      </div>
    </div>
  )
}
