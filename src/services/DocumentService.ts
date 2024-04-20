import { Database } from "../infra/database";
import { DocumentSchema } from "../schemas/document";
import CreateDocumentUseCase from "../use_cases/CreateDocumentUseCase";

export async function CreateDocumentService(
  document: DocumentSchema,
  person: string
) {
  try {
    const createDocumentUseCase = new CreateDocumentUseCase();
    const results = await createDocumentUseCase.execute(document, person);
    return results!.id;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function UpdateDocumentById(data: DocumentSchema, id: string) {
  try {
    const updatedDocument = await Database.document.update({
      where: { id },
      data,
    });
    return updatedDocument;
  } catch (error) {
    throw error;
  }
}
