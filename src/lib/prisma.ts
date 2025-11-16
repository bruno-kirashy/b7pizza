// 1. IMPORTAÇÃO CORRIGIDA
import { PrismaClient } from "@/generated/prisma";

// 2. Tipagem mais segura para o 'globalThis'
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // log: ['query'], // Opcional: descomente se quiser ver os logs no terminal
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
