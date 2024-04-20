import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { Database } from "../infra/database";

export default class GetAuthByEmailUseCase {
  async execute(email: string) {
    try {
      const person = await Database.auth.findUnique({
        where: {
          email,
        },
      });

      return person;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new Error("Auth not found");
      }
      throw error;
    }
  }
}
