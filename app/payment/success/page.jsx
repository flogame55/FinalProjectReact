import Image from 'next/image'
import Link from 'next/link'
import { getProductById } from '@/lib/products'
import { formatPrice } from '@/lib/presentation'
import UiIcon from '@/components/UiIcon'

export const metadata = { title: 'ชำระเงินสำเร็จ · Pause' }
export const dynamic = 'force-dynamic'

const paymentLabels = {
  promptpay: 'พร้อมเพย์ (จำลอง)',
  credit_card: 'บัตรเครดิต / เดบิต (จำลอง)',
  cod: 'เก็บเงินปลายทาง (จำลอง)',
}

export default async function PaymentSuccessPage({ searchParams }) {
  const params = await searchParams
  const productId = Number(params?.productId)
  const method = paymentLabels[params?.method] ? params.method : 'promptpay'
  const product = Number.isInteger(productId) && productId > 0 ? await getProductById(productId) : null
  const isCod = method === 'cod'

  return (
    <div className="mx-auto max-w-2xl space-y-7 pb-12 sm:space-y-8">
      <section className="surface overflow-hidden text-center">
        <div className="bg-gradient-to-b from-emerald-50 to-white px-6 pb-8 pt-10 sm:px-12 sm:pt-14">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 ring-8 ring-white shadow-sm">
            <UiIcon name="check" size={28} />
          </div>
          <p className="eyebrow mt-7">DEMO CHECKOUT · สำเร็จ</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#20211F] sm:text-4xl">
            {isCod ? 'ยืนยันคำสั่งซื้อแล้ว' : 'ชำระเงินสำเร็จ'}
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#6B6B6B]">
            {isCod ? 'บันทึกตัวอย่างคำสั่งซื้อเก็บเงินปลายทางเรียบร้อยแล้ว' : 'บันทึกตัวอย่างการชำระเงินเรียบร้อยแล้ว'}
          </p>
        </div>

        <div className="px-5 pb-6 sm:px-10 sm:pb-10">
          <div role="note" className="mb-6 rounded-[8px] border border-amber-200 bg-amber-50 px-4 py-3 text-left text-xs leading-6 text-amber-900">
            โหมดสาธิตเท่านั้น ไม่มีการโอนหรือเรียกเก็บเงินจริง QR และข้อมูลบัตรก่อนหน้านี้เป็นตัวอย่าง และไม่มีข้อมูลบัตรถูกจัดเก็บ
          </div>

          <div className="rounded-[12px] border border-[#E8E8EC] bg-white p-4 text-left sm:p-5">
            <p className="eyebrow">รายการของคุณ</p>
            <div className="mt-4 flex items-center gap-4">
              <div className="relative size-20 shrink-0 overflow-hidden rounded-[8px] bg-[#F3F3F0] sm:size-24">
                {product?.imageUrl ? <Image src={product.imageUrl} alt={product.name} fill sizes="96px" className="object-contain p-2" /> : null}
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-sm font-medium text-[#20211F]">{product?.name || `สินค้า #${productId || '—'}`}</p>
                <p className="mt-1 text-xs text-[#777780]">{paymentLabels[method]}</p>
              </div>
              <p className="shrink-0 text-sm font-semibold tabular-nums text-[#20211F]">{product ? formatPrice(product.price) : '—'}</p>
            </div>
            {isCod && <p className="mt-4 border-t border-[#E8E8EC] pt-4 text-xs leading-6 text-[#6B6B6B]">ตัวอย่างนี้ยังไม่ใช่คำสั่งซื้อจริง และจะไม่มีพัสดุถูกจัดส่ง</p>}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/history" className="button-primary"><UiIcon name="history" size={16} />ดูประวัติการตัดสินใจ</Link>
            <Link href="/products" className="button-secondary">กลับไปเลือกดูสินค้า</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
