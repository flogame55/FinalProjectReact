'use client'

// 👤 พี — app/ready/page.jsx (หน้ารายการพร้อมตัดสินใจ Decision Gate + ซื้อจริง/ผ่าน)
import { useState } from 'react'
import { usePauseCart } from '@/context/PauseCartContext'
import { FALLBACK_PRODUCTS } from '@/lib/products'
import CheckoutForm from '@/components/CheckoutForm'
import { confirmPurchaseAction, passItemAction } from '@/app/actions'
import Link from 'next/link'

export default function ReadyPage() {
  const { readyItems, removeItem } = usePauseCart()
  const [selectedForCheckout, setSelectedForCheckout] = useState(null)
  const [notification, setNotification] = useState('')

  const handlePass = async (item, product) => {
    await passItemAction({
      productId: item.productId,
      price: product.price,
      skipped: item.skipped,
    })
    removeItem(item.productId)
    setNotification(`ประหยัดเงินไปได้ ฿${product.price.toLocaleString()} จากการไม่ซื้อ "${product.name}" 🎉`)
  }

  const handleConfirmPurchase = async (formData) => {
    if (!selectedForCheckout) return
    const { item, product } = selectedForCheckout

    await confirmPurchaseAction({
      productId: item.productId,
      price: product.price,
      skipped: item.skipped,
      form: formData,
    })

    removeItem(item.productId)
    setSelectedForCheckout(null)
    setNotification(`บันทึกคำสั่งซื้อ "${product.name}" สำเร็จแล้ว 🛍️`)
  }

  if (readyItems.length === 0 && !selectedForCheckout) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center space-y-4">
        <p className="text-4xl">⏳</p>
        <h2 className="text-xl font-bold text-slate-900">
          ยังไม่มีสินค้าที่ครบกำหนดตัดสินใจ
        </h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          สินค้าที่อยู่ในตะกร้าพักจะปรากฏที่นี่เมื่อนับถอยหลังครบเวลา หรือเมื่อคุณกดข้ามเวลารอ
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <Link
            href="/cart"
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
          >
            ดูตะกร้าพัก
          </Link>
          <Link
            href="/products"
            className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800"
          >
            เลือกสินค้า
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          รายการพร้อมตัดสินใจ (Decision Gate)
        </h1>
        <p className="text-xs text-slate-500">
          สินค้าเหล่านี้ผ่านระยะเวลาคิดแล้ว คุณยังอยากได้อยู่จริงไหม?
        </p>
      </div>

      {notification && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-semibold text-emerald-800 flex justify-between items-center">
          <span>{notification}</span>
          <button onClick={() => setNotification('')} className="text-slate-400 hover:text-slate-600">
            ✕
          </button>
        </div>
      )}

      {selectedForCheckout ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900">
            ยืนยันการสั่งซื้อ: {selectedForCheckout.product.name}
          </h2>
          <p className="text-sm font-bold text-emerald-600">
            ยอดชำระ: ฿{selectedForCheckout.product.price.toLocaleString()}
          </p>
          <CheckoutForm
            item={selectedForCheckout.item}
            onConfirm={handleConfirmPurchase}
            onCancel={() => setSelectedForCheckout(null)}
          />
        </div>
      ) : (
        <div className="space-y-4">
          {readyItems.map((item) => {
            const product =
              FALLBACK_PRODUCTS.find((p) => p.id === item.productId) || {
                name: `สินค้า #${item.productId}`,
                price: 0,
                imageUrl: '',
              }

            return (
              <div
                key={item.productId}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-xs"
              >
                <div className="flex items-center gap-4">
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-20 w-20 rounded-lg object-cover bg-slate-100 shrink-0"
                    />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-900 line-clamp-1">
                        {product.name}
                      </h3>
                      {item.skipped && (
                        <span className="rounded-full bg-rose-100 px-2 py-0.5 text-3xs font-bold text-rose-700">
                          ข้ามเวลามา
                        </span>
                      )}
                    </div>
                    <p className="text-base font-bold text-slate-900">
                      ฿{product.price.toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      ครบเวลาเมื่อ: {new Date(item.readyAt).toLocaleString('th-TH')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 pt-3 sm:pt-0 border-t sm:border-0 border-slate-100">
                  <button
                    onClick={() => setSelectedForCheckout({ item, product })}
                    className="flex-1 sm:flex-none rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-emerald-700 shadow-xs"
                  >
                    🛍️ ยังอยากได้ (ซื้อจริง)
                  </button>
                  <button
                    onClick={() => handlePass(item, product)}
                    className="flex-1 sm:flex-none rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    🙅 เปลี่ยนใจ (ผ่าน)
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
