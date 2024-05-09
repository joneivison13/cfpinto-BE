import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { Database } from "../infra/database";
import addressSchema, { AddressSchema } from "../schemas/address";
import logger from "../utils/logger";

export default class CreateAddressUseCase {
  async execute(address: AddressSchema, person: string) {
    try {
      addressSchema.parse(address);
      console.log({
        data: { ...address, person: { connect: { id: person } }, main: false },
      });
      const data = await Database.address.create({
        data: { ...address, person: { connect: { id: person } }, main: false },
      });
      return data;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        logger.error(error);
        logger.error({ address, person });
        throw new Error("Person not found");
      }
      throw error;
    }
  }
}
