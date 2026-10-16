// URL เต็มของเว็บ — sitemap/robots/openGraph ต้องใช้ URL เต็ม (มี https://โดเมน) ไม่ใช่ path เปล่า
// บน Vercel ตั้ง NEXT_PUBLIC_SITE_URL=https://final-project-react-ivory.vercel.app ใน Project Settings → Environment Variables
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://final-project-react-ivory.vercel.app'
