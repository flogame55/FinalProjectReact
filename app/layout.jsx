// 👤 พี — RootLayout (Layout หลักของทั้งระบบ ครอบ PauseCartProvider + Nav + Footer)
import './globals.css'
import Nav from '@/components/Nav'
import { PauseCartProvider } from '@/context/PauseCartContext'

export const metadata = {
  title: 'Pause — ตะกร้าที่บังคับให้คิดก่อนซื้อ',
  description: 'เว็บแอปช้อปปิ้งเพื่อลด Impulse Buying ด้วยระบบตะกร้าพักและนับถอยหลัง',
}

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body className="min-h-screen flex flex-col antialiased">
        <PauseCartProvider>
          <Nav />
          <main className="flex-1 max-w-5xl mx-auto w-full p-4 sm:p-6">
            {children}
          </main>
          <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
            © 2026 Pause — Final Project (DII CAMT) · โฟ · กิต · พี
          </footer>
        </PauseCartProvider>
      </body>
    </html>
  )
}
