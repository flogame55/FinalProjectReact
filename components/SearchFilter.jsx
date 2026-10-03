'use client'

// 👤 กิต — SearchFilter (ช่องค้นหาและตัวกรองหมวดหมู่ ซิงก์ค่าลง Query String บน URL ด้วย useSearchParams)
import { useRouter, useSearchParams } from 'next/navigation'

const CATEGORIES = [
  { value: '', label: 'ทุกหมวดหมู่' },
  { value: 'electronics', label: 'อุปกรณ์อิเล็กทรอนิกส์' },
  { value: 'fashion', label: 'แฟชั่น & เครื่องแต่งกาย' },
  { value: 'lifestyle', label: 'ของใช้ & ไลฟ์สไตล์' },
]

export default function SearchFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const q = searchParams.get('q') || ''
  const category = searchParams.get('category') || ''

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/products?${params.toString()}`)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs mb-6">
      <div className="relative flex-1">
        <input
          type="text"
          defaultValue={q}
          onChange={(e) => updateParam('q', e.target.value)}
          placeholder="ค้นหาชื่อสินค้า..."
          className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-slate-900 focus:outline-none"
        />
      </div>

      <div className="w-full sm:w-56">
        <select
          value={category}
          onChange={(e) => updateParam('category', e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
