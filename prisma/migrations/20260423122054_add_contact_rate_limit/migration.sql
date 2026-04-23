-- AlterTable
ALTER TABLE "ContactMessage" ADD COLUMN     "senderFingerprint" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE INDEX "ContactMessage_senderFingerprint_createdAt_idx" ON "ContactMessage"("senderFingerprint", "createdAt");
