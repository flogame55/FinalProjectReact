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
- **Product catalog:** Supabase `Product` table; DummyJSON is used only as the initial seed source
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
   - `schema.sql` สร้าง Bucket `product-images` เป็น Public ให้อัตโนมัติ ตรวจสอบว่ามี Bucket นี้หลังรัน schema

4. **Seed ข้อมูลเริ่มต้น (ทำครั้งเดียว):**
   ```bash
   node scripts/seed.js
   ```
   สคริปต์ดึงสินค้าจาก DummyJSON แปลงราคา USD เป็น THB แล้วเพิ่มลงตาราง `Product` ใน Supabase โดยไม่เขียนทับ ID ที่มีอยู่ หากพบ ID ซ้ำกับชื่อสินค้าอื่น สคริปต์จะหยุดเพื่อป้องกันการเปลี่ยนความหมายของประวัติเดิม

หมายเหตุ: ตั้งค่า `SUPABASE_SERVICE_ROLE_KEY` ใน `.env.local` สำหรับ seed เท่านั้น ห้ามส่งค่านี้ไปฝั่ง client หรือ commit ลง Git

หลัง seed แล้ว หน้าแรก หน้ารายการ หมวดหมู่ และหน้ารายละเอียดอ่านข้อมูลจาก Supabase เท่านั้น หาก Supabase ใช้งานไม่ได้ แอปจะแสดง error state แทนการสลับไปใช้ API หรือข้อมูลตัวอย่าง

DummyJSON ส่งราคาเป็น USD; สคริปต์ seed แปลงเป็น THB โดยใช้เรต USD/THB จาก [Frankfurter API](https://frankfurter.dev/) (แคชหนึ่งชั่วโมง) แล้วเก็บราคา USD เรต วันที่ และแหล่งที่มาไว้คู่กับราคา THB ใน Supabase ถ้าดึงเรตไม่ได้จะใช้ `USD_TO_THB_FALLBACK_RATE` (ค่าเริ่มต้น `33.62`) และระบุว่าเป็นเรตสำรอง ราคาที่แสดงเป็นราคาอ้างอิงสำหรับเว็บทดสอบ ไม่ใช่อัตรารับชำระเงินจริง

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
