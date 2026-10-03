'use client'

// ============================================================================
// 👤 พี — app/ready/page.jsx
// ============================================================================
// หน้าที่: หน้ารายการพร้อมตัดสินใจ (Decision Gate) เมื่อสินค้าพ้นระยะพักหรือกดข้ามมา
//
// 📋 TODO สำหรับพี:
// 1. [ ] ดึง `readyItems` และ `removeItem` จาก `usePauseCart()`
// 2. [ ] จัดการ Empty State เมื่อไม่มีสินค้าพร้อมตัดสินใจ
// 3. [ ] สำหรับสินค้าแต่ละชิ้น มี 2 ทางเลือก:
//        - "ซื้อจริง": เปิดฟอร์ม `<CheckoutForm />` กรอกข้อมูล แล้วเรียก action บันทึกผลสำเร็จ
//        - "เปลี่ยนใจ (ผ่าน)": ตัดสินค้าออกจากตะกร้า และเรียก action บันทึกผลว่าตัดสินใจไม่ซื้อ (ประหยัดเงิน)
// 4. [ ] แสดงผล Badge แจ้งเตือนหากสินค้านั้นมาจากการกดข้ามเวลา (`item.skipped`)
// 5. [ ] ออกแบบ UI ตาม genesis-DESIGN.md:
//        - การ์ดครอบ: surface #FFFFFF, border 1px #E8E8EC, radius 12px
//        - ปุ่มซื้อ: Success Green (#10B981) hover (#059669), radius 6px
//        - ปุ่มผ่าน: Secondary Border Button, radius 6px
// ============================================================================

import { useState } from 'react'
import { usePauseCart } from '@/context/PauseCartContext'
import CheckoutForm from '@/components/CheckoutForm'
import Link from 'next/link'

export default function ReadyPage() {
  const { readyItems = [], removeItem } = usePauseCart() || {}
  const [selectedForCheckout, setSelectedForCheckout] = useState(null)

  // TODO (พี): เขียนฟังก์ชันจัดการการตัดสินใจซื้อจริง และฟังก์ชันเปลี่ยนใจ (ผ่าน)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0A0A0A]">
          รายการพร้อมตัดสินใจ (Decision Gate)
        </h1>
        <p className="text-xs text-[#6B6B6B]">
          สินค้าที่พ้นระยะเวลาคิดแล้ว คุณยังอยากได้อยู่จริงไหม?
        </p>
      </div>

      {/* TODO (พี): แสดง Empty State ถ้าไม่มี readyItems */}
      {readyItems.length === 0 ? (
        <div className="rounded-[12px] border border-dashed border-[#E8E8EC] p-8 text-center">
          <p className="text-sm text-[#6B6B6B]">ยังไม่มีสินค้าที่ครบกำหนดตัดสินใจ</p>
          <div className="mt-4">
            <Link href="/products" className="text-xs text-[#6366F1] underline">
              ไปเลือกสินค้าเพิ่ม
            </Link>
          </div>
        </div>
      ) : (
        /* TODO (พี): วนลูป render รายการสินค้าที่พร้อมตัดสินใจ หรือแสดง CheckoutForm */
        <div className="space-y-4">
          {readyItems.map((item) => (
            <div
              key={item.productId}
              className="rounded-[12px] border border-[#E8E8EC] bg-white p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-sm text-[#0A0A0A]">
                  รหัสสินค้า #{item.productId}
                </p>
                {item.skipped && (
                  <span className="text-[10px] text-[#EF4444] font-medium">
                    (ข้ามเวลารอมา)
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                {/* TODO (พี): ปุ่มซื้อจริง และ ปุ่มผ่าน */}
                <button
                  onClick={() => setSelectedForCheckout(item)}
                  className="rounded-[6px] bg-[#10B981] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#059669] transition"
                >
                  ซื้อจริง
                </button>
                <button
                  onClick={() => removeItem && removeItem(item.productId)}
                  className="rounded-[6px] border border-[#E8E8EC] px-3 py-1.5 text-xs font-medium text-[#0A0A0A] hover:bg-slate-50 transition"
                >
                  ผ่าน (ไม่ซื้อ)
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
