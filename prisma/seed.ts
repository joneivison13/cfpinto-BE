import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    const documentTypes: Prisma.DocumentTypeCreateInput[] = [
      { id: "RG", name: "RG" },
      { id: "CPF", name: "CPF" },
      { id: "CNH", name: "CNH" },
      { id: "PASSAPORTE", name: "PASSAPORTE" },
    ];

    for (const documentType of documentTypes) {
      await prisma.documentType.create({
        data: documentType,
      });
    }

    console.log("Data inserted successfully!");
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
