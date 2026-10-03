'use client'

// ============================================================================
// 👤 พี — app/ready/page.jsx
// ============================================================================
// หน้าที่: หน้ารายการพร้อมตัดสินใจ (Decision Gate) เมื่อสินค้าพ้นระยะพักหรือกดข้ามมา
//
// 📋 TODO สำหรับพี:
// 1. [ ] ดึง `readyItems` และ `removeItem` จาก `usePauseCart()`
// 2. [ ] แสดง Empty State หากไม่มีสินค้าที่พร้อมตัดสินใจ
// 3. [ ] สำหรับสินค้าแต่ละชิ้น มี 2 ทางเลือก:
//        - "ซื้อจริง": เปิดฟอร์ม `<CheckoutForm />` เพื่อกรอกข้อมูล เมื่อส่งสำเร็จให้เรียก `confirmPurchaseAction`
//        - "เปลี่ยนใจ (ผ่าน)": เรียก `passItemAction` และตัดสินค้าออกจากตะกร้าพัก
// 4. [ ] แสดงผล Badge แจ้งว่าสินค้านี้มาจากการพักครบเวลา หรือข้ามเวลามา (`item.skipped`)
// 5. [ ] ออกแบบ UI ตาม genesis-DESIGN.md:
//        - การ์ด: surface #FFFFFF, border 1px #E8E8EC, radius 12px
//        - ปุ่มซื้อจริง: Success Green (#10B981) hover (#059669), radius 6px
//        - ปุ่มผ่าน: Secondary Border Button radius 6px
// ============================================================================

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

  // TODO (พี): จัดการเมื่อผู้ใช้กด "ผ่าน / ไม่เอาแล้ว"
  const handlePass = async (item, product) => {
    await passItemAction({
      productId: item.productId,
      price: product.price,
      skipped: item.skipped,
    })
    removeItem(item.productId)
    setNotification(`ประหยัดเงินไปได้ ฿${product.price.toLocaleString()} จากการไม่ซื้อ "${product.name}" 🎉`)
  }

  // TODO (พี): จัดการเมื่อผู้ใช้กรอกฟอร์มและกดยืนยัน "ซื้อจริง"
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

  // Empty State
  if (readyItems.length === 0 && !selectedForCheckout) {
    return (
      <div className="rounded-[12px] border border-dashed border-[#E8E8EC] bg-white p-12 text-center space-y-4">
        <p className="text-4xl">⏳</p>
        <h2 className="text-xl font-bold text-[#0A0A0A]">
          ยังไม่มีสินค้าที่ครบกำหนดตัดสินใจ
        </h2>
        <p className="text-xs text-[#6B6B6B] max-w-sm mx-auto">
          สินค้าที่อยู่ในตะกร้าพักจะปรากฏที่นี่เมื่อนับถอยหลังครบเวลา หรือเมื่อคุณกดข้ามเวลารอ
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <Link
            href="/cart"
            className="rounded-[6px] border border-[#E8E8EC] bg-white px-4 py-2 text-xs font-medium text-[#0A0A0A] hover:bg-slate-50"
          >
            ดูตะกร้าพัก
          </Link>
          <Link
            href="/products"
            className="rounded-[6px] bg-[#6366F1] px-4 py-2 text-xs font-medium text-white hover:bg-[#4F46E5]"
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
        <h1 className="text-2xl font-bold text-[#0A0A0A]">
          รายการพร้อมตัดสินใจ (Decision Gate)
        </h1>
        <p className="text-xs text-[#6B6B6B]">
          สินค้าเหล่านี้ผ่านระยะเวลาคิดแล้ว คุณยังอยากได้อยู่จริงไหม?
        </p>
      </div>

      {notification && (
        <div className="rounded-[8px] bg-emerald-50 border border-emerald-200 p-4 text-xs font-semibold text-emerald-800 flex justify-between items-center">
          <span>{notification}</span>
          <button onClick={() => setNotification('')} className="text-[#9C9C9C] hover:text-[#0A0A0A] cursor-pointer">
            ✕
          </button>
        </div>
      )}

      {/* TODO (พี): แสดงฟอร์ม Checkout เมื่อกดซื้อ หรือแสดงรายการการ์ดสินค้าพร้อมตัดสินใจ */}
      {selectedForCheckout ? (
        <div className="rounded-[12px] border border-[#E8E8EC] bg-white p-6 space-y-4">
          <h2 className="text-lg font-bold text-[#0A0A0A]">
            ยืนยันการสั่งซื้อ: {selectedForCheckout.product.name}
          </h2>
          <p className="text-sm font-bold text-[#10B981]">
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
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-[12px] border border-[#E8E8EC] bg-white p-5"
              >
                <div className="flex items-center gap-4">
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-20 w-20 rounded-[8px] object-cover bg-slate-100 shrink-0"
                    />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-[#0A0A0A] line-clamp-1">{product.name}</h3>
                      {item.skipped && (
                        <span className="rounded-full bg-rose-50 border border-rose-200 px-2 py-0.5 text-xs font-semibold text-[#EF4444]">
                          ข้ามเวลามา
                        </span>
                      )}
                    </div>
                    <p className="text-base font-bold text-[#0A0A0A]">฿{product.price.toLocaleString()}</p>
                    <p className="text-xs text-[#9C9C9C] mt-1">
                      ครบเวลาเมื่อ: {new Date(item.readyAt).toLocaleString('th-TH')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 pt-3 sm:pt-0 border-t sm:border-0 border-[#E8E8EC]">
                  <button
                    onClick={() => setSelectedForCheckout({ item, product })}
                    className="flex-1 sm:flex-none rounded-[6px] bg-[#10B981] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#059669] cursor-pointer"
                  >
                    🛍️ ยังอยากได้ (ซื้อจริง)
                  </button>
                  <button
                    onClick={() => handlePass(item, product)}
                    className="flex-1 sm:flex-none rounded-[6px] border border-[#E8E8EC] bg-white px-4 py-2 text-xs font-medium text-[#0A0A0A] transition hover:bg-slate-50 cursor-pointer"
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
