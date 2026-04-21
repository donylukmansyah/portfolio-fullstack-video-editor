import "dotenv/config";
import { defineConfig, env } from "prisma/config";

type PrismaEnv = {
  DIRECT_URL: string;
};

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Prisma CLI should use the direct connection, while app runtime uses DATABASE_URL.
    url: env<PrismaEnv>("DIRECT_URL"),
  },
});
