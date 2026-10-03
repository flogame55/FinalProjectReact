'use client'

// ============================================================================
// 👤 โฟ — app/cart/page.jsx
// ============================================================================
// หน้าที่: หน้าแสดงตะกร้าพัก (Cooling-off Cart) พร้อม Countdown Timer ของแต่ละชิ้น
//
// 📋 TODO สำหรับโฟ:
// 1. [ ] เรียกใช้ `usePauseCart()` เพื่อดึง:
//        `const { items, removeItem, skipItem, devFastForward, setDevFastForward } = usePauseCart()`
// 2. [ ] จัดการกรณี Empty State หากไม่มีสินค้าในตะกร้า (`items.length === 0`):
//        แสดงกล่อง `rounded-[12px] border border-dashed border-[#E8E8EC] p-8 text-center`
// 3. [ ] สวิตช์เปิด/ปิดโหมด Demo เร่งเวลา (Dev FastForward):
//        ปุ่มกดสลับค่า boolean: `setDevFastForward(!devFastForward)`
// 4. [ ] วนลูป map สินค้าใน `items`:
//        - แสดงชื่อสินค้า, ราคา, เวลาที่เริ่มพัก
//        - วางคอมโพเนนต์ `<Countdown readyAt={item.readyAt} onSkip={() => skipItem(item.productId)} isFastForward={devFastForward} />`
//        - ปุ่มลบออกจากตะกร้าพัก: `removeItem(item.productId)`
// 5. [ ] วางแถบลิงก์ด้านล่างเพื่อพาไปหน้า `/ready` (รายการพร้อมตัดสินใจ)
// 6. [ ] ออกแบบ UI ตาม genesis-DESIGN.md:
//        - การ์ดสินค้าแต่ละชิ้น: `rounded-[12px] border border-[#E8E8EC] bg-white p-4`
//        - ปุ่ม: `rounded-[6px]`
// ============================================================================

import Link from 'next/link'
import { usePauseCart } from '@/context/PauseCartContext'
import Countdown from '@/components/Countdown'
import { FALLBACK_PRODUCTS } from '@/lib/products'

export default function CartPage() {
  const { items = [], removeItem, skipItem, devFastForward, setDevFastForward } = usePauseCart() || {}

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-2 border-b border-[#E8E8EC]">
        <div>
          <h1 className="text-2xl font-bold text-[#0A0A0A]">
            ตะกร้าพัก (Cooling-off Cart)
          </h1>
          <p className="text-xs text-[#6B6B6B]">
            สินค้าที่กำลังอยู่ในระยะเวลาหน่วงความคิด
          </p>
        </div>

        {/* 
          TODO (โฟ): สวิตช์ toggle เปิด/ปิด Dev FastForward 
        */}
        <div className="text-xs flex items-center gap-2">
          <span>Dev FastForward:</span>
          <button
            onClick={() => setDevFastForward?.(!devFastForward)}
            className="rounded-[6px] border border-[#E8E8EC] px-2 py-1 text-xs"
          >
            {devFastForward ? 'ON (เร่งเวลา)' : 'OFF (เวลาจริง)'}
          </button>
        </div>
      </div>

      {/* 
        TODO (โฟ): 
        1. แสดง Empty State ถ้าไม่มีสินค้า (items.length === 0)
        2. แสดงรายการสินค้าที่กำลังพัก พร้อมคอมโพเนนต์ <Countdown /> และปุ่มลบ
        3. ลิงก์พาไปหน้า /ready
      */}
      <div className="rounded-[12px] border border-[#E8E8EC] bg-white p-6">
        {/* เขียนเงื่อนไขแสดงผลตาม TODO ด้านบน */}
      </div>
    </div>
  )
}
