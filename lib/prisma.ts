import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

const runtimeUrl = process.env.DATABASE_URL;
const adapter = runtimeUrl ? new PrismaPg({ connectionString: runtimeUrl }) : undefined;

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    ...(adapter ? { adapter } : {}),
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
