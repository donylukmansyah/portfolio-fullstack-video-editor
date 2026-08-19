/*
  Warnings:

  - Changed the type of `lastRequest` on the `rateLimit` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "rateLimit" DROP COLUMN "lastRequest",
ADD COLUMN     "lastRequest" BIGINT NOT NULL;
