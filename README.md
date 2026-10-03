# ⏸️ Pause — ตะกร้าที่บังคับให้คิดก่อนซื้อ

เว็บแอปพลิเคชันช้อปปิ้งเพื่อลดพฤติกรรม Impulse Buying ด้วยกลไก "ตะกร้าพัก" (Cooling-off Cart)

**กลุ่มสมาชิก:**
1. โฟว์วิล — จิรายุ พรมยวน (682110165)
2. พี — ศุภวิชญ์ อ้ายเสาร์ (682110196)
3. กิต — อุกฤษฏ์ ตันติศุภรักษ์ (682110201)

---

## 🛠️ Tech Stack
- **Framework:** Next.js 15 (App Router) + React 19
- **Styling:** Tailwind CSS v4
- **Database & Storage:** Supabase (PostgreSQL + Storage bucket `product-images`)
- **Forms & Validation:** `react-hook-form` + `zod`
- **Charts:** `recharts`

---

## 🚀 วิธีติดตั้งและรันโปรเจกต์

1. **ติดตั้ง Dependencies:**
   ```bash
   npm install
   ```

2. **ตั้งค่า Environment Variables:**
   คัดลอกไฟล์ `.env.example` เป็น `.env.local` แล้วกรอกค่า URL และ Key ของ Supabase:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

3. **เตรียมฐานข้อมูล Supabase:**
   - นำคำสั่ง SQL ใน `supabase/schema.sql` ไปรันใน SQL Editor ของ Supabase
   - สร้าง Bucket `product-images` ใน Supabase Storage และตั้งค่าเป็น Public

4. **Seed ข้อมูลเริ่มต้น (ทำครั้งเดียว):**
   ```bash
   node scripts/seed.js
   ```

5. **รัน Dev Server:**
   ```bash
   npm run dev
   ```
   เปิดใช้งานที่ [http://localhost:3000](http://localhost:3000)

---

## 👥 การแบ่งไฟล์และความรับผิดชอบ

### 👤 โฟ:
- `context/PauseCartContext.jsx` — State ตะกร้าพัก + sync localStorage + countdown + skip + dev fast-forward
- `components/Countdown.jsx` — ตัวนับเวลาถอยหลังแบบ Real-time
- `components/HistoryChart.jsx` — กราฟสถิติด้วย Recharts
- `app/cart/page.jsx` — หน้าตะกร้าพัก (Cooling-off Cart)
- `app/history/page.jsx` — หน้าสถิติและประวัติการตัดสินใจ

### 👤 กิต:
- `supabase/schema.sql` & `scripts/seed.js` — โครงสร้างตารางและสคริปต์ seed ข้อมูลสินค้า/รูป
- `lib/products.js` — ฟังก์ชัน query สินค้าจาก Supabase (รองรับ search และ category)
- `components/ProductCard.jsx` — การ์ดแสดงสินค้า
- `components/SearchFilter.jsx` — ช่องค้นหาและตัวกรองหมวดหมู่ผ่าน URL Search Params
- `app/page.jsx` — หน้าแรก (Landing & Showcase)
- `app/products/page.jsx` — หน้ารายการสินค้าทั้งหมด

### 👤 พี:
- `app/layout.jsx` & `components/Nav.jsx` & `components/CartBadge.jsx` — โครงสร้าง Layout และแถบนำทาง
- `components/PauseButton.jsx` — ตัวเลือกเวลาพักคิด (preset + กำหนดเอง) + ปุ่มหยุดคิดก่อน / ข้ามไปเลย
- `components/CheckoutForm.jsx` & `lib/schemas/checkout.js` — ฟอร์ม Checkout และ Zod Schema
- `app/products/[id]/page.jsx` — หน้ารายละเอียดสินค้า
- `app/ready/page.jsx` — หน้ารายการพร้อมตัดสินใจ (ซื้อจริง / ผ่าน)
- `app/actions.js` — Server Actions บันทึกการตัดสินใจ (`confirmPurchaseAction` / `passItemAction`)
- `app/not-found.jsx` & `app/error.jsx` — หน้า 404 และ Error Boundary
