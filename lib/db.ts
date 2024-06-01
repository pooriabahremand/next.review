import { PrismaClient } from "@prisma/client";

const db = createPrismaClient();

export function createPrismaClient() {
  if (!globalThis.PrismaClient) {
    globalThis.PrismaClient = new PrismaClient();
  }
  return globalThis.PrismaClient;
}

export default db;
