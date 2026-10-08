// ============================================================================
// 👤 พี — app/products/loading.jsx
// ============================================================================
// หน้าที่: Visual Loading State (Instant Feedback) ขณะโหลดหรือเปลี่ยนหน้าแคตตาล็อก
// ตามข้อกำหนดใน TEAM_GUIDE.md (หัวข้อ ⚡ งานปรับปรุงความเร็วระบบ)
// ============================================================================

export default function ProductsLoading() {
  return (
    <div className="space-y-8 pb-8 sm:space-y-10" aria-busy="true" aria-label="กำลังโหลดรายการสินค้า">
      {/* Top Header skeleton */}
      <header className="flex flex-col justify-between gap-6 border-b border-[#E8E8EC] pb-8 pt-3 sm:flex-row sm:items-end sm:pb-10">
        <div>
          <div className="h-3 w-44 animate-pulse rounded bg-[#E8E8EC]" />
          <div className="mt-4 h-10 w-72 animate-pulse rounded bg-[#E8E8EC]" />
        </div>
        <div className="h-10 w-48 animate-pulse rounded bg-[#E8E8EC]" />
      </header>

      {/* Filter skeleton */}
      <div className="space-y-4 border-b border-[#E8E8EC] pb-6">
        <div className="h-12 w-full animate-pulse rounded-[6px] bg-[#E8E8EC]" />
        <div className="flex gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-8 w-20 animate-pulse rounded-full bg-[#E8E8EC]" />
          ))}
        </div>
      </div>

      {/* Count line skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-4 w-36 animate-pulse rounded bg-[#E8E8EC]" />
        <div className="h-4 w-24 animate-pulse rounded bg-[#E8E8EC]" />
      </div>

      {/* Product cards grid skeleton */}
      <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="flex flex-col overflow-hidden rounded-[12px] border border-[#E8E8EC] bg-white"
          >
            <div className="aspect-[1/1.05] animate-pulse bg-[#F3F3F0]" />
            <div className="flex flex-1 flex-col p-4 sm:p-5 space-y-3">
              <div className="h-3 w-16 animate-pulse rounded bg-[#E8E8EC]" />
              <div className="h-4 w-full animate-pulse rounded bg-[#E8E8EC]" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-[#E8E8EC]" />
              <div className="mt-auto pt-4 flex items-center justify-between">
                <div className="h-5 w-20 animate-pulse rounded bg-[#E8E8EC]" />
                <div className="h-3 w-14 animate-pulse rounded bg-[#E8E8EC]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
