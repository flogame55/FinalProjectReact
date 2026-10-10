-- ============================================================================
-- 👤 โฟ — supabase/schema.sql (โครงสร้าง Database บน Supabase)
-- ============================================================================
-- 📋 วิธีใช้งาน:
-- 1. คัดลอกคำสั่ง SQL ทั้งหมดนี้
-- 2. ไปที่ Supabase Dashboard -> เมนู "SQL Editor" ด้านซ้าย (ไอคอน >_)
-- 3. กด "New Query" วางโค้ดทั้งหมดแล้วกดปุ่ม "Run" สีเขียว
-- ============================================================================

-- 1. สร้างตาราง Product สำหรับแคตตาล็อกสินค้า
CREATE TABLE IF NOT EXISTS "Product" (
  "id" INTEGER PRIMARY KEY,
  "name" TEXT NOT NULL,
  "price" NUMERIC(10,2) NOT NULL, -- เก็บราคาเงินบาท (THB)
  "priceUsd" NUMERIC(10,2),
  "usdToThbRate" NUMERIC(12,6),
  "exchangeRateDate" DATE,
  "exchangeRateSource" TEXT,
  "category" TEXT NOT NULL,
  "imageUrl" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "rating" NUMERIC(3,2),
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- รองรับฐานข้อมูลที่สร้างจาก schema รุ่นก่อนหน้า
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "priceUsd" NUMERIC(10,2);
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "usdToThbRate" NUMERIC(12,6);
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "exchangeRateDate" DATE;
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "exchangeRateSource" TEXT;
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "rating" NUMERIC(3,2);

-- 2. สร้างตาราง DecisionLog (เก็บประวัติการตัดสินใจแยกตาม sessionId ของแต่ละเครื่อง)
CREATE TABLE IF NOT EXISTS "DecisionLog" (
  "id" SERIAL PRIMARY KEY,
  "sessionId" TEXT NOT NULL, -- UUID ประจำเครื่อง/เบราว์เซอร์ เพื่อแยกสถิติของแต่ละคน
  "productId" INTEGER NOT NULL REFERENCES "Product"("id") ON DELETE CASCADE,
  "price" NUMERIC(10,2) NOT NULL,
  "decisionStatus" TEXT NOT NULL CHECK ("decisionStatus" IN ('BOUGHT', 'PASSED')),
  "skipped" BOOLEAN NOT NULL DEFAULT FALSE,
  "timestamp" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. สร้าง Indexes สำหรับเพิ่มความเร็วในการค้นหาและวิเคราะห์สถิติ
CREATE INDEX IF NOT EXISTS "idx_decision_session" ON "DecisionLog"("sessionId");
CREATE INDEX IF NOT EXISTS "idx_decision_status" ON "DecisionLog"("decisionStatus");
CREATE INDEX IF NOT EXISTS "idx_decision_timestamp" ON "DecisionLog"("timestamp");
CREATE INDEX IF NOT EXISTS "idx_product_category" ON "Product"("category");

-- 4. ปลดล็อก RLS เพื่อให้ API ค้นหาและบันทึกข้อมูลได้อย่างราบรื่น
ALTER TABLE "Product" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "DecisionLog" DISABLE ROW LEVEL SECURITY;

-- 5. สร้าง Storage Bucket สำหรับเก็บรูปภาพสินค้า (เปิด Public)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true) 
ON CONFLICT (id) DO NOTHING;
