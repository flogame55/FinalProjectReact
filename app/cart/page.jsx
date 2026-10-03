'use client'

// ============================================================================
// 👤 โฟ — app/cart/page.jsx
// ============================================================================
// หน้าที่: หน้าแสดงตะกร้าพัก (Cooling-off Cart) พร้อม Countdown Timer ของแต่ละชิ้น
//
// 📋 TODO สำหรับโฟ:
// 1. [ ] เรียกใช้ `usePauseCart()` เพื่อดึง `items`, `removeItem`, `skipItem`, `devFastForward`, `setDevFastForward`
// 2. [ ] จัดการกรณี Empty State หากไม่มีสินค้าในตะกร้า (`items.length === 0`)
// 3. [ ] แสดงรายการสินค้าที่กำลังพัก:
//        - วางคอมโพเนนต์ `<Countdown />` สำหรับนับถอยหลังแต่ละชิ้น
//        - ปุ่ม "ยกเลิกออกจากตะกร้า" (`removeItem`)
// 4. [ ] ทำสวิตช์ toggle เปิด/ปิด `devFastForward` เพื่อสาธิตการย่นเวลาในการ Demo
// 5. [ ] วางลิงก์เพื่อไปหน้า `/ready` (รายการพร้อมตัดสินใจ)
// 6. [ ] ออกแบบตาม genesis-DESIGN.md:
//        - Cards: surface #FFFFFF, border 1px #E8E8EC, radius 12px
//        - Buttons: radius 6px
// ============================================================================

import { usePauseCart } from '@/context/PauseCartContext'
import Countdown from '@/components/Countdown'
import Link from 'next/link'

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

        {/* TODO (โฟ): ออกแบบสวิตช์เปิด/ปิด Dev Mode เร่งเวลานับถอยหลัง */}
        <div className="text-xs flex items-center gap-2">
          <span>Dev FastForward:</span>
          <button
            onClick={() => setDevFastForward && setDevFastForward(!devFastForward)}
            className="rounded-[6px] border border-[#E8E8EC] px-2 py-1 text-xs font-medium"
          >
            {devFastForward ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      {/* TODO (โฟ): แสดง Empty State ถ้าไม่มีสินค้า หรือแสดงรายการสินค้าที่พักอยู่ */}
      {items.length === 0 ? (
        <div className="rounded-[12px] border border-dashed border-[#E8E8EC] p-8 text-center text-[#6B6B6B]">
          <p>ตะกร้าพักของคุณยังว่างเปล่า</p>
          <div className="mt-4">
            <Link href="/products" className="text-xs text-[#6366F1] underline">
              ไปเลือกสินค้าใส่ตะกร้าพัก →
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.productId}
              className="rounded-[12px] border border-[#E8E8EC] bg-white p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-sm text-[#0A0A0A]">
                  รหัสสินค้า #{item.productId}
                </p>
                {/* TODO (โฟ): แสดง Countdown */}
                <div className="mt-2">
                  <Countdown
                    readyAt={item.readyAt}
                    onSkip={() => skipItem && skipItem(item.productId)}
                    isFastForward={devFastForward}
                  />
                </div>
              </div>

              {/* TODO (โฟ): ปุ่มลบสินค้าออกจากตะกร้าพัก */}
              <button
                onClick={() => removeItem && removeItem(item.productId)}
                className="text-xs text-[#9C9C9C] hover:text-[#EF4444] transition"
              >
                ลบ
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
