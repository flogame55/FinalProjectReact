'use client'

// ============================================================================
// 👤 โฟ — app/cart/page.jsx
// ============================================================================
// หน้าที่: หน้าแสดงตะกร้าพัก (Cooling-off Cart) พร้อม Countdown Timer ของแต่ละชิ้น
//
// 📋 TODO สำหรับโฟ:
// 1. [ ] เรียกใช้ `usePauseCart()` เพื่อดึง `items`, `removeItem`, `skipItem`, `devFastForward`, `setDevFastForward`
// 2. [ ] จัดการสถานะ Empty State: หาก `items.length === 0` ให้แสดงข้อความและปุ่มนำทางไป /products
// 3. [ ] แสดงรายการสินค้าที่กำลังพัก:
//        - รูปสินค้า, ชื่อสินค้า, ราคา, เวลาที่เริ่มพัก
//        - วางคอมโพเนนต์ `<Countdown />` สำหรับนับถอยหลังแต่ละชิ้น
//        - ปุ่ม "ยกเลิกออกจากตะกร้า" (`removeItem`)
// 4. [ ] ทำสวิตช์ toggle เปิด/ปิด `devFastForward` เพื่อสาธิตการย่นเวลาในการ Demo
// 5. [ ] วางลิงก์ด้านล่างเพื่อนำทางไปยังหน้า `/ready` (รายการพร้อมตัดสินใจ)
// 6. [ ] ออกแบบ UI ตาม genesis-DESIGN.md:
//        - Cards: surface #FFFFFF, border 1px #E8E8EC, radius 12px
//        - Buttons: radius 6px
// ============================================================================

import { usePauseCart } from '@/context/PauseCartContext'
import Countdown from '@/components/Countdown'
import Link from 'next/link'
import { FALLBACK_PRODUCTS } from '@/lib/products'

export default function CartPage() {
  const { items, removeItem, skipItem, devFastForward, setDevFastForward } = usePauseCart()

  // TODO (โฟ): ตกแต่งหน้า Empty State เมื่อไม่มีสินค้าในตะกร้าพัก
  if (items.length === 0) {
    return (
      <div className="rounded-[12px] border border-dashed border-[#E8E8EC] bg-white p-12 text-center space-y-4">
        <p className="text-4xl">🛒</p>
        <h2 className="text-xl font-bold text-[#0A0A0A]">ตะกร้าพักของคุณว่างเปล่า</h2>
        <p className="text-xs text-[#6B6B6B] max-w-sm mx-auto">
          ยังไม่มีสินค้าที่กำลังรอพักคิด ลองเลือกสินค้าที่คุณอยากได้มาใส่ตะกร้าพักไว้ก่อน
        </p>
        <Link
          href="/products"
          className="inline-block rounded-[6px] bg-[#6366F1] px-5 py-2.5 text-xs font-medium text-white transition hover:bg-[#4F46E5]"
        >
          เลือกสินค้าเข้าตะกร้าพัก →
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E8E8EC]">
        <div>
          <h1 className="text-2xl font-bold text-[#0A0A0A]">ตะกร้าพัก (Cooling-off Cart)</h1>
          <p className="text-xs text-[#6B6B6B]">
            สินค้าที่กำลังอยู่ในระยะเวลาหน่วงความคิด ({items.length} รายการ)
          </p>
        </div>

        {/* TODO (โฟ): ออกแบบ UI สวิตช์ Dev Mode เร่งเวลา */}
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-[6px] text-xs">
          <span className="font-bold text-amber-800">🛠️ Dev Mode:</span>
          <button
            onClick={() => setDevFastForward(!devFastForward)}
            className={`px-2 py-0.5 rounded-[4px] font-bold transition cursor-pointer ${
              devFastForward
                ? 'bg-amber-600 text-white'
                : 'bg-white text-slate-700 border border-slate-300'
            }`}
          >
            {devFastForward ? 'ON (เร่งเวลา)' : 'OFF (เวลาจริง)'}
          </button>
        </div>
      </div>

      {/* TODO (โฟ): แสดงรายการสินค้าในตะกร้าพัก */}
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
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-[12px] border border-[#E8E8EC] bg-white p-4"
            >
              <div className="flex items-center gap-4">
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-16 w-16 rounded-[8px] object-cover bg-slate-100 shrink-0"
                  />
                )}
                <div>
                  <h3 className="font-semibold text-[#0A0A0A] line-clamp-1">{product.name}</h3>
                  <p className="text-sm font-bold text-[#0A0A0A]">฿{product.price.toLocaleString()}</p>
                  <p className="text-xs text-[#9C9C9C]">
                    เริ่มพักเมื่อ: {new Date(item.addedAt).toLocaleTimeString('th-TH')}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:items-end gap-3 pt-2 sm:pt-0 border-t sm:border-0 border-[#E8E8EC]">
                <Countdown
                  readyAt={item.readyAt}
                  onSkip={() => skipItem(item.productId)}
                  isFastForward={devFastForward}
                />
                <button
                  onClick={() => removeItem(item.productId)}
                  className="text-xs text-[#9C9C9C] hover:text-[#EF4444] transition self-start sm:self-auto cursor-pointer"
                >
                  ยกเลิกออกจากตะกร้า
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="rounded-[8px] bg-white border border-[#E8E8EC] p-4 flex items-center justify-between text-xs text-[#6B6B6B]">
        <span>มีสินค้าที่ครบกำหนดแล้วหรือต้องการตัดสินใจทันที?</span>
        <Link href="/ready" className="font-semibold text-[#6366F1] underline hover:text-[#4F46E5]">
          ไปที่หน้ารายการพร้อมตัดสินใจ →
        </Link>
      </div>
    </div>
  )
}
