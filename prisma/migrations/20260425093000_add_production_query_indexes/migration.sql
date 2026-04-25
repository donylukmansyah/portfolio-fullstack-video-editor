CREATE INDEX IF NOT EXISTS "session_userId_idx" ON "session"("userId");
CREATE INDEX IF NOT EXISTS "account_userId_idx" ON "account"("userId");
CREATE INDEX IF NOT EXISTS "SubCategory_mainCategoryId_name_idx" ON "SubCategory"("mainCategoryId", "name");
CREATE INDEX IF NOT EXISTS "PortfolioItem_createdAt_idx" ON "PortfolioItem"("createdAt");
CREATE INDEX IF NOT EXISTS "PortfolioItem_subCategoryId_createdAt_idx" ON "PortfolioItem"("subCategoryId", "createdAt");
CREATE INDEX IF NOT EXISTS "ContactMessage_isRead_createdAt_idx" ON "ContactMessage"("isRead", "createdAt");
