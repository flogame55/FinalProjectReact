export default function Loading() {
  return (
    <div className="space-y-10 py-6" role="status" aria-label="กำลังโหลดข้อมูล">
      <span className="sr-only">กำลังเตรียมข้อมูลให้คุณ กรุณารอสักครู่</span>
      <div className="space-y-4 motion-safe:animate-pulse" aria-hidden="true">
        <div className="h-3 w-36 rounded bg-[#E8E8EC]" />
        <div className="h-10 w-3/4 max-w-md rounded bg-[#E8E8EC]" />
        <div className="h-4 w-1/2 max-w-sm rounded bg-[#E8E8EC]" />
      </div>
      <div className="grid grid-cols-2 gap-5 motion-safe:animate-pulse lg:grid-cols-4" aria-hidden="true">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="overflow-hidden rounded-[12px] border border-[#E8E8EC] bg-white">
            <div className="aspect-square bg-[#F0F0F2]" />
            <div className="space-y-3 p-5">
              <div className="h-3 w-1/3 rounded bg-[#E8E8EC]" />
              <div className="h-4 w-5/6 rounded bg-[#E8E8EC]" />
              <div className="h-4 w-1/2 rounded bg-[#E8E8EC]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}