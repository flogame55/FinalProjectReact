-- Supabase Schema for Pause Application

-- 1. Create Product Table
CREATE TABLE IF NOT EXISTS "Product" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "price" INTEGER NOT NULL,
  "category" TEXT NOT NULL,
  "imageUrl" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create DecisionLog Table
CREATE TABLE IF NOT EXISTS "DecisionLog" (
  "id" SERIAL PRIMARY KEY,
  "productId" INTEGER NOT NULL REFERENCES "Product"("id") ON DELETE CASCADE,
  "price" INTEGER NOT NULL,
  "decisionStatus" TEXT NOT NULL CHECK ("decisionStatus" IN ('BOUGHT', 'PASSED')),
  "skipped" BOOLEAN NOT NULL DEFAULT FALSE,
  "timestamp" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Indexes for fast analytics queries
CREATE INDEX IF NOT EXISTS "idx_decision_status" ON "DecisionLog"("decisionStatus");
CREATE INDEX IF NOT EXISTS "idx_decision_timestamp" ON "DecisionLog"("timestamp");
CREATE INDEX IF NOT EXISTS "idx_product_category" ON "Product"("category");

-- 4. Storage Bucket Setup (Run in Supabase SQL editor or create via Dashboard)
-- Create bucket 'product-images' with public access:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true) ON CONFLICT DO NOTHING;
