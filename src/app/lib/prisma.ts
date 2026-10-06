import type { PrismaClient } from "@prisma/client";
import { mockPrisma } from "./mock/mockPrisma";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// MVP build: no database. Every query is served by the in-memory fixture store.
export const prisma = (globalForPrisma.prisma ??
  (mockPrisma as unknown as PrismaClient)) as PrismaClient;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
