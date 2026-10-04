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
- **Product test data:** DummyJSON Products API (public; no API key required)
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
   แคตตาล็อกตัวอย่างมีสินค้า 500 รายการใน 10 หมวดหมู่ สคริปต์จะข้ามชื่อสินค้าที่มีอยู่แล้ว และเพิ่มเฉพาะรายการที่ยังไม่มี

หมายเหตุ: `scripts/seed.js` เป็น seed ข้อมูลตัวอย่างของโปรเจกต์ ไม่ใช่ตัวนำเข้าสินค้าจาก DummyJSON หากต้องการคัดลอกสินค้าจาก API เข้า Supabase ให้ดูหัวข้อ “นำสินค้า DummyJSON ขึ้น Supabase” ใน [TEAM_GUIDE.md](./TEAM_GUIDE.md) ก่อน เพราะ schema ปัจจุบันเก็บราคาเป็นจำนวนเต็มและมี foreign key จากประวัติการตัดสินใจ

หน้าแคตตาล็อกอ่านข้อมูลทดสอบจาก `https://dummyjson.com/products` โดยตรง ไม่ต้องใช้ API key; กำหนด `DUMMYJSON_BASE_URL` ใน `.env.local` ได้หากต้องการใช้ DummyJSON server อื่น ค่าเริ่มต้นจะใช้ public API และใช้ข้อมูลตัวอย่างในโปรเจกต์เมื่อ API ติดต่อไม่ได้

DummyJSON ส่งราคาเป็น USD; หน้าเว็บแปลงเป็น THB โดยใช้อัตรา USD/THB ล่าสุดจาก [Frankfurter API](https://frankfurter.dev/) และแคชอัตราไว้ 1 ชั่วโมง จากนั้นปัดราคาสินค้าเป็นจำนวนเต็มที่ลงท้ายด้วย 0 หรือ 9 (เลือกค่าที่ใกล้ยอดแปลงที่สุด) พร้อมแสดงเรตและวันที่อ้างอิงใต้ราคาเงินบาท หาก API อัตราแลกเปลี่ยนติดต่อไม่ได้ จะใช้อัตราสำรอง `USD_TO_THB_FALLBACK_RATE` (ค่าเริ่มต้น `33.62`) และระบุว่าเป็นเรตสำรอง สินค้าตัวอย่าง 500 รายการของโปรเจกต์ตั้งราคาเป็น THB อยู่แล้ว จึงไม่มีการแปลงซ้ำ อัตราที่แสดงเป็นราคาอ้างอิงสำหรับเว็บทดสอบ ไม่ใช่อัตรารับชำระเงินจริง

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
