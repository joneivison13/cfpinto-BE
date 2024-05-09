import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { Database } from "../infra/database";
import documentSchema, { DocumentSchema } from "../schemas/document";

import path from "path";
import logger from "../utils/logger";

export default class CreateDocumentUseCase {
  async execute(document: DocumentSchema, person: string) {
    try {
      documentSchema.parse(document);
      console.log({ document });
      const document_types = await Database.documentType.findMany();
      const document_type = document_types.find(
        (type) => type.id === document.type
      );
      if (!document_type) {
        throw new Error("Document type not found");
      }
      const data = await Database.document.create({
        data: {
          file: document.file_dir
            ? path.basename(document.file_dir as string)
            : undefined,
          person: { connect: { id: person } },
          type: { connect: { id: document.type } },
          expCorp: document.expCorp,
          expDate: document.expDate,
          expedit: document.expedit,
          file_dir: document.file_dir,
          value: document.value,
        },
      });
      return data;
    } catch (error) {
      logger.error(error);
      if (error instanceof PrismaClientValidationError) {
        throw new Error("Person not found");
      }
      throw error;
    }
  }
}
