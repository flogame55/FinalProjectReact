# ⏸️ Pause — ตะกร้าที่บังคับให้คิดก่อนซื้อ

เว็บแอปพลิเคชันช้อปปิ้งเพื่อลดพฤติกรรม Impulse Buying ด้วยกลไก "ตะกร้าพัก" (Cooling-off Cart)

**กลุ่มสมาชิก:**
1. โฟว์วิล — จิรายุ พรมยวน (682110165)
2. พี — ศุภวิชญ์ อ้ายเสาร์ (682110196)
3. กิต — อุกฤษฏ์ ตันติศุภรักษ์ (682110201)

---

## 📌 เอกสารสำคัญสำหรับทีม
- 📖 [**TEAM_GUIDE.md**](./TEAM_GUIDE.md) — แผนงานอย่างละเอียด, Checklist สิ่งที่แต่ละคนต้องทำ (TODO List), และข้อตกลงร่วม
- 🎨 [**genesis-DESIGN.md**](./genesis-DESIGN.md) — มาตรฐานการออกแบบ UI ประจำโปรเจกต์ (โทนสี, ฟอนต์, ขอบมน, Do's & Don'ts)

---

## 🛠️ Tech Stack
- **Framework:** Next.js 15 (App Router) + React 19
- **Styling:** Tailwind CSS v4 + Genesis Design System tokens
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

## 👥 โครงสร้างไฟล์และความรับผิดชอบ (ทุกคนมี TODO ในไฟล์ตัวเอง)

* **👤 โฟ:**
  - `context/PauseCartContext.jsx`
  - `components/Countdown.jsx`
  - `components/HistoryChart.jsx`
  - `app/cart/page.jsx`
  - `app/history/page.jsx`

* **👤 กิต:**
  - `supabase/schema.sql` & `scripts/seed.js`
  - `lib/products.js`
  - `components/ProductCard.jsx`
  - `components/SearchFilter.jsx`
  - `app/page.jsx`
  - `app/products/page.jsx`

* **👤 พี:**
  - `app/layout.jsx`, `components/Nav.jsx`, `components/CartBadge.jsx`
  - `components/PauseButton.jsx`
  - `components/CheckoutForm.jsx` & `lib/schemas/checkout.js`
  - `app/products/[id]/page.jsx`
  - `app/ready/page.jsx`
  - `app/actions.js`
  - `app/not-found.jsx` & `app/error.jsx`
