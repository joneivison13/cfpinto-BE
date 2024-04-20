import { NextFunction, Request, Response } from "express";
import { CreateAddressService } from "../services/AddressService";
import { AddressSchema } from "../schemas/address";
import { Database } from "../infra/database";

export default class AddressController {
  constructor() {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const address = await CreateAddressService(
        {
          street: data.street,
          city: data.city,
          state: data.state,
        },
        data.person
      );
      return res.status(201).json({ id: address });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;

      await Database.address.delete({ where: { id } });

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
