-- ============================================================================
-- 👤 โฟ — supabase/schema.sql (โครงสร้าง Database บน Supabase)
-- ============================================================================
-- 📋 TODO สำหรับโฟ:
-- 1. [ ] เปิด Supabase Dashboard -> ไปที่เมนู SQL Editor
-- 2. [ ] คัดลอกคำสั่ง SQL ทั้งหมดด้านล่างนี้ไปวางแล้วกด RUN
-- 3. [ ] ไปที่เมนู Storage -> สร้าง Bucket ชื่อ 'product-images' และตั้งค่าเป็น Public Bucket
-- ============================================================================

-- 1. สร้างตาราง Product
CREATE TABLE IF NOT EXISTS "Product" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "price" INTEGER NOT NULL,
  "category" TEXT NOT NULL,
  "imageUrl" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. สร้างตาราง DecisionLog (เชื่อมโยง Foreign Key ไปยัง Product.id)
CREATE TABLE IF NOT EXISTS "DecisionLog" (
  "id" SERIAL PRIMARY KEY,
  "productId" INTEGER NOT NULL REFERENCES "Product"("id") ON DELETE CASCADE,
  "price" INTEGER NOT NULL,
  "decisionStatus" TEXT NOT NULL CHECK ("decisionStatus" IN ('BOUGHT', 'PASSED')),
  "skipped" BOOLEAN NOT NULL DEFAULT FALSE,
  "timestamp" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. สร้าง Indexes สำหรับเพิ่มความเร็วในการ Query วิเคราะห์สถิติ
CREATE INDEX IF NOT EXISTS "idx_decision_status" ON "DecisionLog"("decisionStatus");
CREATE INDEX IF NOT EXISTS "idx_decision_timestamp" ON "DecisionLog"("timestamp");
CREATE INDEX IF NOT EXISTS "idx_product_category" ON "Product"("category");

-- 4. ตั้งค่า Storage Bucket สำหรับเก็บรูปภาพสินค้า (เปิด Public)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true) ON CONFLICT DO NOTHING;
