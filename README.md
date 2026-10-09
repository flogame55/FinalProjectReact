# ⏸️ Pause — ตะกร้าที่บังคับให้คิดก่อนซื้อ

เว็บแอปพลิเคชันช้อปปิ้งเพื่อลดพฤติกรรม Impulse Buying ด้วยกลไก "ตะกร้าพัก" (Cooling-off Cart)

**กลุ่มสมาชิก:**
1. โฟว์วิล — จิรายุ พรมยวน (682110165)
2. พี — ศุภวิชญ์ อ้ายเสาร์ (682110196)
3. กิต — อุกฤษฏ์ ตันติศุภรักษ์ (682110201)

🌐 **Live Demo (Vercel):** [https://final-project-react-ivory.vercel.app](https://final-project-react-ivory.vercel.app)

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

---

## ✅ Final Project Requirement Checklist

| ข้อกำหนดตาม Checklist | สถานะ | ตำแหน่งในโปรเจกต์ |
|---|:---:|---|
| **1. Next.js App Router อย่างน้อย 4 route** | ✅ ผ่าน (6 routes) | `app/page.jsx`, `app/products/page.jsx`, `app/products/[id]/page.jsx`, `app/cart/page.jsx`, `app/ready/page.jsx`, `app/history/page.jsx` |
| **2. มีทั้ง Server Component และ Client Component พร้อมอธิบาย** | ✅ ผ่าน | ดูตารางอธิบายเหตุผลด้านล่าง |
| **3. Data fetching อย่างน้อย 1 จุดใช้ SSR/SSG/ISR อย่างเจตนา พร้อมอธิบาย** | ✅ ผ่าน | ดูรายละเอียดด้านล่าง (ISR ใน `lib/products.js`, `lib/currency.js` และ SSR ใน `app/history/page.jsx`, `app/products/page.jsx`) |
| **4. มี mutation อย่างน้อย 1 จุดผ่าน Server Action หรือ Route Handler** | ✅ ผ่าน | `app/actions.js` (`confirmPurchaseAction`, `passItemAction`) |
| **5. มี global state ฝั่ง client (Context หรือ Redux/Zustand)** | ✅ ผ่าน | `context/PauseCartContext.jsx` ครอบที่ `app/layout.jsx` |
| **6. ฟอร์มที่ validate จริง (react-hook-form + zod)** | ✅ ผ่าน | `components/CheckoutForm.jsx` + `lib/schemas/checkout.js` |
| **7. Responsive + deploy ขึ้น Vercel มี URL จริง** | ✅ ผ่าน | [https://final-project-react-ivory.vercel.app](https://final-project-react-ivory.vercel.app) |

---

## 🏛️ สถาปัตยกรรม Component (Server Component vs Client Component)

โปรเจกต์นี้เลือกใช้สถาปัตยกรรมแบบไฮบริดตาม Best Practices ของ Next.js 15 โดยกำหนดบทบาทของแต่ละไฟล์อย่างชัดเจน:

| ไฟล์ / คอมโพเนนต์ | ประเภท | เหตุผลที่เลือก (Rationale) |
|---|:---:|---|
| **`app/page.jsx`** | **Server Component** | ดึงข้อมูลสินค้าแนะนำจาก Database ฝั่งเซิร์ฟเวอร์โดยตรง ไม่ต้องส่ง fetch logic ไปยัง client ลด Bundle Size และช่วยให้ Search Engine ทำ Indexing ได้ทันที (SEO) |
| **`app/products/page.jsx`** | **Server Component** | อ่าน `searchParams` (`q`, `category`, `page`) จาก URL เพื่อทำ Database-level Pagination และ Selective Column Projection ที่ Supabase ก่อนส่ง HTML กลับมายังเบราว์เซอร์ |
| **`app/products/[id]/page.jsx`** | **Server Component** | ดึงข้อมูลสินค้าเฉพาะรายการตาม Dynamic Route (`params.id`) พร้อมสร้าง `generateMetadata` สำหรับแสดงผลชื่อสินค้าและรูปพรีวิวบน Social Share |
| **`app/history/page.jsx`** | **Server Component** | อ่าน Cookie `pause-session-id` เพื่อดึงข้อมูล `DecisionLog` ของผู้ใช้คนนั้นโดยตรงจาก Supabase ไม่เปิดเผย Database Query หรือ Connection Key แก่ Client |
| **`components/ProductCard.jsx`** | **Server Component** | เป็น Presentational Component แสดงผลข้อมูลการ์ดสินค้าและลิงก์ ไม่มีการใช้ React Hooks หรือ Browser Event Listener ทำให้ประหยัดขนาด JS Bundle |
| **`app/layout.jsx`** | **Server Component** | โครงสร้างหลักของเว็บ ดึงอัตราแลกเปลี่ยนเริ่มต้นจาก Server แล้วส่งต่อเป็น props ให้กับ Context Provider |
| **`app/cart/page.jsx`** | **Client Component** (`'use client'`) | ต้องเข้าถึง Web Storage (`localStorage`) เพื่ออ่านตะกร้าของผู้ใช้ และเชื่อมต่อกับ `usePauseCart` เพื่อสั่งลบ/ข้ามสินค้า |
| **`app/ready/page.jsx`** | **Client Component** (`'use client'`) | มีสถานะการโต้ตอบที่ซับซ้อน (เปิดฟอร์มยืนยัน, กดปุ่มผ่าน, แสดงผลการตัดสินใจแบบ Interactive) และเรียก Server Action |
| **`components/Countdown.jsx`** | **Client Component** (`'use client'`) | ใช้ `setInterval` และ React State เพื่อคำนวณและแสดงผลเวลานับถอยหลังแบบ Real-time ทุก 1 วินาทีบนหน้าจอ |
| **`components/PauseButton.jsx`** | **Client Component** (`'use client'`) | มี Interactive Dropdown ให้ผู้ใช้เลือกเวลาพักคิด (1 ชม. - 7 วัน หรือกำหนดเอง) และกดเรียกฟังก์ชัน `addItem` ใน Context |
| **`components/CheckoutForm.jsx`** | **Client Component** (`'use client'`) | จัดการ Form State และ Event การกรอกข้อมูล ตรวจสอบ Client-side validation แบบเรียลไทม์ด้วย `react-hook-form` และ `zodResolver` |
| **`components/HistoryChart.jsx`** | **Client Component** (`'use client'`) | เรนเดอร์กราฟสถิติผ่านไลบรารี `recharts` ซึ่งต้องเข้าถึง DOM ของเบราว์เซอร์เพื่อคำนวณ SVG Layout และ Tooltip ตอน Hover |
| **`components/SearchFilter.jsx`** | **Client Component** (`'use client'`) | ดักจับ Event การพิมพ์ค้นหาและการเลือก Dropdown หมวดหมู่ พร้อมอัปเดต Query String ลงใน URL ด้วย Next.js `useRouter` |
| **`components/Nav.jsx`** & **`CartBadge.jsx`** | **Client Component** (`'use client'`) | ใช้ `usePathname` เพื่อไฮไลต์เมนูปัจจุบัน และดึงจำนวนสินค้าในตะกร้าจาก `usePauseCart` มาแสดงผลป้าย Badge แบบเรียลไทม์ |

---

## ⚡ กลยุทธ์ Data Fetching (ISR และ SSR อย่างเจตนา)

โปรเจกต์นี้เลือกใช้กลยุทธ์การดึงข้อมูลที่เหมาะสมกับธรรมชาติของข้อมูลแต่ละประเภท (ไม่ใช่ค่า Default):

### 1. ISR (Incremental Static Regeneration) — สำหรับข้อมูลที่เปลี่ยนแปลงไม่บ่อย
* **ดึงสินค้า (`lib/products.js:61`):**  
  ใช้ `fetch(url, { next: { revalidate: 60 } })`  
  **เหตุผล:** รายการสินค้าไม่ได้เปลี่ยนแปลงทุกวินาที การแคชไว้ 60 วินาทีช่วยให้หน้าเว็บตอบสนองเร็วแบบ Static HTML พร้อมลดภาระงานของฐานข้อมูลและ API ภายนอก โดยที่สินค้าที่เพิ่มใหม่จะปรากฏบนเว็บภายใน 1 นาที
* **ดึงอัตราแลกเปลี่ยน USD/THB (`lib/currency.js:15`):**  
  ใช้ `fetch(RATE_URL, { next: { revalidate: 3600 } })`  
  **เหตุผล:** อัตราแลกเปลี่ยนของ Frankfurter API อัปเดตวันละ 1 ครั้ง การแคชไว้ 1 ชั่วโมง (3,600 วินาที) ช่วยป้องกัน Rate Limit ของ Third-party API และลดเวลา Request ลงได้เกือบ 100%

### 2. SSR (Server-Side Rendering / Dynamic on Request) — สำหรับข้อมูลเฉพาะบุคคลที่ต้องสดใหม่เสมอ
* **หน้าประวัติและการเงินที่ประหยัดได้ (`app/history/page.jsx`):**  
  กำหนด `export const dynamic = 'force-dynamic'` และอ่าน `cookies()` ใน Header  
  **เหตุผล:** ประวัติการซื้อและการประหยัดเงินเชื่อมโยงกับ `pause-session-id` ของผู้ใช้แต่ละคน จึงไม่สามารถแคชเป็นหน้า Static รวมได้ จำเป็นต้อง Query สดจากตาราง `DecisionLog` ทุกครั้งที่มีการเปิดหน้า เพื่อให้เห็นข้อมูลทันทีหลังกดซื้อหรือกดผ่าน
* **หน้ารายการสินค้าและการกรอง (`app/products/page.jsx`):**  
  เรนเดอร์สดบนเซิร์ฟเวอร์ตาม Query Parameters (`q`, `category`, `page`, `sort`)  
  **เหตุผล:** ผู้ใช้สามารถค้นหาคำใดก็ได้ และเปลี่ยนตัวกรองได้อย่างอิสระ การทำ SSR ร่วมกับ Supabase `.range(from, to)` ช่วยให้ดึงเฉพาะหน้าที่มีการร้องขอ (Pagination) ไม่ต้องส่งสินค้าทั้งหมดลงมาประมวลผลที่เครื่องผู้ใช้

### 3. SSG (Static Site Generation) — สำหรับหน้ารายละเอียดสินค้าที่สร้างล่วงหน้า
* **หน้ารายละเอียดสินค้า (`app/products/[id]/page.jsx`):**  
  ใช้ฟังก์ชัน `generateStaticParams()` ดึงสินค้า 24 ชิ้นแรกมา Pre-render เป็นไฟล์ HTML ตั้งแต่ขั้นตอน `npm run build`  
  **เหตุผล:** สินค้าหลักถูกสร้างเป็น Static HTML รอไว้บน CDN ล่วงหน้า ทำให้เปิดดูรายละเอียดสินค้าได้ทันทีโดยไม่มีดีเลย์ ส่วนสินค้าชิ้นอื่น ๆ นอกเหนือจากนี้จะถูกประมวลผล On-demand ผ่าน ISR เมื่อมีผู้เข้าชมครั้งแรก

---

## 🔄 Data Mutation (Server Actions)
การเปลี่ยนแปลงข้อมูลในฐานข้อมูลทำผ่าน **Next.js Server Actions** (`'use server'`) ในไฟล์ [`app/actions.js`](./app/actions.js):
* `confirmPurchaseAction(input)`: รับข้อมูลจาก CheckoutForm ตรวจสอบซ้ำด้วย `checkoutSchema` ฝั่ง Server เพื่อความปลอดภัย จากนั้นบันทึกลงตาราง `DecisionLog` ใน Supabase ด้วยสถานะ `BOUGHT` และสั่ง `revalidatePath('/history')` เพื่อให้หน้าสถิติอัปเดตข้อมูลทันที
* `passItemAction(input)`: บันทึกลงตาราง `DecisionLog` ด้วยสถานะ `PASSED` และสั่ง revalidate หน้า `/history` เช่นเดียวกัน

---

## 🌐 Client-side Global State (PauseCartContext)
จัดการสถานะส่วนกลางที่ต้องเข้าถึงข้ามหลายหน้าจอด้วย **React Context API** ใน [`context/PauseCartContext.jsx`](./context/PauseCartContext.jsx):
* จัดการรายการสินค้าในตะกร้าพักคิด (`items`), รายการที่ครบกำหนดเวลาคิดแล้ว (`readyItems`)
* ซิงก์ข้อมูลสองทางกับ `localStorage` (`'pause-cart'`) ป้องกันข้อมูลสูญหายเมื่อรีเฟรชหน้า
* ระบบจำลองเร่งเวลา (`devFastForward`) เพื่อใช้สาธิตการทำงานในห้องเรียน (1 วินาที = 1 ชั่วโมง)
* สร้าง Anonymous Session ID บันทึกลงทั้ง `localStorage` และ `document.cookie` เพื่อให้ Server Component ในหน้า `/history` นำไปเชื่อมโยงกับ `DecisionLog` ใน Supabase ได้อย่างถูกต้องตามผู้ใช้แต่ละคน

---

## 📋 Form Validation (React Hook Form + Zod)
* กำหนด Schema ใน [`lib/schemas/checkout.js`](./lib/schemas/checkout.js) ตรวจสอบความถูกต้องของข้อมูล (ชื่อ-นามสกุล, ที่อยู่จัดส่งอย่างน้อย 10 ตัวอักษร, เบอร์โทรศัพท์ 9-10 หลักด้วย Regex, ช่องทางชำระเงิน)
* นำมาเชื่อมต่อกับฟอร์มสั่งซื้อใน [`components/CheckoutForm.jsx`](./components/CheckoutForm.jsx) ด้วย `zodResolver` แสดง Error Message สีแดงแจ้งเตือนใต้ช่องที่กรอกไม่ถูกต้องทันทีแบบ Interactive
* มีการนำ Schema เดียวกันไปใช้ตรวจสอบซ้ำ (Double Validation) ที่ Server Action ใน [`app/actions.js`](./app/actions.js) ป้องกันการส่งข้อมูลไม่พึงประสงค์ข้าม Client

