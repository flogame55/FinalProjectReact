'use client'

// ============================================================================
// 👤 พี — app/ready/page.jsx
// ============================================================================
// หน้าที่: หน้ารายการพร้อมตัดสินใจ (Decision Gate) เมื่อสินค้าพ้นระยะพักหรือกดข้ามมา
//
// 📋 TODO สำหรับพี:
// 1. [ ] ดึง `readyItems`, `removeItem` และ `sessionId` จาก `usePauseCart()`:
//        `const { readyItems = [], removeItem, sessionId } = usePauseCart() || {}`
// 2. [ ] จัดการ Empty State: หากไม่มีสินค้าที่พร้อมตัดสินใจ ให้แสดงข้อความและปุ่มกลับไปเลือกสินค้า
// 3. [ ] สเตทสำหรับเลือกสินค้าเพื่อเปิดฟอร์ม Checkout:
//        `const [selectedForCheckout, setSelectedForCheckout] = useState(null)`
// 4. [ ] ฟังก์ชัน handleConfirmPurchase(formData):
//        - เรียก `confirmPurchaseAction({ sessionId, productId, price, skipped, form: formData })`
//        - ลบสินค้าออกจากตะกร้าพัก: `removeItem(productId)`
//        - ปิดฟอร์ม checkout
// 5. [ ] ฟังก์ชัน handlePass(item):
//        - เรียก `passItemAction({ sessionId, productId, price, skipped })`
//        - ลบสินค้าออกจากตะกร้าพัก: `removeItem(productId)`
// 6. [ ] ออกแบบ UI ตามมาตรฐาน genesis-DESIGN.md:
//        - การ์ดครอบ: `rounded-[12px] border border-[#E8E8EC] bg-white p-5`
//        - ปุ่มซื้อจริง: `rounded-[6px] bg-[#10B981] hover:bg-[#059669] text-white px-4 py-2 text-xs font-medium`
//        - ปุ่มผ่าน: `rounded-[6px] border border-[#E8E8EC] hover:bg-slate-50 text-[#0A0A0A] px-4 py-2 text-xs font-medium`
// ============================================================================

import { useState } from 'react'
import Link from 'next/link'
import { usePauseCart } from '@/context/PauseCartContext'
import CheckoutForm from '@/components/CheckoutForm'
import { confirmPurchaseAction, passItemAction } from '@/app/actions'
import { FALLBACK_PRODUCTS } from '@/lib/products'

export default function ReadyPage() {
  const { readyItems = [], removeItem, sessionId } = usePauseCart() || {}
  const [selectedForCheckout, setSelectedForCheckout] = useState(null)

  // TODO (พี): เขียนฟังก์ชัน handlePass และ handleConfirmPurchase (อย่าลืมส่ง sessionId ไปด้วย)

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

      {/* 
        TODO (พี): แสดงเนื้อหาตามเงื่อนไข
        1. ถ้ากำลังเลือกสินค้าเพื่อซื้อจริง (selectedForCheckout !== null):
           ให้แสดงคอมโพเนนต์ <CheckoutForm item={selectedForCheckout} onConfirm={...} onCancel={...} />
        2. ถ้าไม่มีสินค้าพร้อมตัดสินใจ (readyItems.length === 0):
           ให้แสดง Empty State
        3. ถ้ามีสินค้า:
           ให้ map แสดงการ์ดสินค้าพร้อมปุ่ม "ซื้อจริง" และปุ่ม "ผ่าน (ไม่ซื้อ)"
      */}
      <div className="rounded-[12px] border border-[#E8E8EC] bg-white p-6">
        {/* เขียนเงื่อนไขแสดงผลตาม TODO ด้านบน */}
      </div>
    </div>
  )
}
