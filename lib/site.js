// URL เต็มของเว็บ — sitemap/robots/openGraph ต้องใช้ URL เต็ม (มี https://โดเมน) ไม่ใช่ path เปล่า
// รองรับทั้ง SITE_URL (แนะนำบน Vercel), NEXT_PUBLIC_SITE_URL และ Vercel System Env Vars อัตโนมัติ
export const SITE_URL =
  process.env.SITE_URL ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined) ??
  'https://final-project-react-ivory.vercel.app'
