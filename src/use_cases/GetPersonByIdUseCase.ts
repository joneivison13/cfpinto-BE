import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { Database } from "../infra/database";
import logger from "../utils/logger";

export default class GetPersonByIdUseCase {
  async execute(id: string) {
    try {
      const person = await Database.person.findUnique({
        where: {
          id,
        },
        select: {
          birthDate: true,
          Address: true,
          createdAt: true,
          Document: {
            select: {
              id: true,
              file: true,
              file_dir: false,
              value: true,
              type: true,
              createdAt: true,
              updatedAt: true,
              expCorp: true,
              expDate: true,
              expedit: true,
            },
          },
          document: true,
          gender: true,
          id: true,
          nacionality: true,
          name: true,
          phone: true,
          telephone: true,
          updatedAt: true,
          civil_state: true,
          email: true,
          father_name: true,
          mother_name: true,
          profession: true,
          is_client: true,
          natural_city: true,
          natural_country: true,
          natural_state: true,
        },
      });

      return person;
    } catch (error) {
      logger.error(error);
      if (error instanceof PrismaClientValidationError) {
        throw new Error("Person not found");
      }
      throw error;
    }
  }
}
