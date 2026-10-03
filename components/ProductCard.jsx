// 👤 กิต — ProductCard (การ์ดแสดงสินค้า ใช้ซ้ำทั้งหน้า / และ /products)
import Link from 'next/link'

export default function ProductCard({ product }) {
  const { id, name, price, category, imageUrl, description } = product

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <span className="absolute top-2 left-2 rounded-full bg-slate-900/70 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-xs capitalize">
          {category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold text-slate-900 line-clamp-1 group-hover:text-amber-600 transition">
          {name}
        </h3>
        <p className="mt-1 text-xs text-slate-500 line-clamp-2">{description}</p>

        <div className="mt-4 flex items-center justify-between pt-2 border-t border-slate-100">
          <span className="text-lg font-bold text-slate-900">
            ฿{price.toLocaleString()}
          </span>
          <Link
            href={`/products/${id}`}
            className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-amber-600"
          >
            ดูรายละเอียด
          </Link>
        </div>
      </div>
    </div>
  )
}
