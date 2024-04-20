import { NextFunction, Request, Response } from "express";
import { PersonSchema } from "../schemas/person";
import {
  CreatePersonService,
  GetPersonByIdService,
  GetPersonService,
  UpdatePersonById,
} from "../services/PersonService";
import { Login } from "../services/LoginService";
import { Database } from "../infra/database";

export default class PersonController {
  constructor() {}

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const results = await Login({ email, password });
      return res.status(200).json(results);
    } catch (error) {
      next(error);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body as PersonSchema;

      const results = await CreatePersonService(data);

      return res.status(201).json({ id: results });
    } catch (error) {
      next(error);
    }
  }

  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      const results = await GetPersonService();
      return res.status(200).json(results);
    } catch (error) {
      next(error);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const results = await GetPersonByIdService(id);
      return res.status(200).json(results);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const data = req.body as PersonSchema;

      const results = await GetPersonByIdService(id);

      if (!results) {
        return res.status(404).json({ message: "Person not found" });
      }

      const resp = await UpdatePersonById(data, id);

      return res.status(204).json({ data: resp });
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const results = await GetPersonByIdService(id);

      if (!results) {
        return res.status(404).json({ message: "Person not found" });
      }

      await Database.address.deleteMany({
        where: {
          personId: id,
        },
      });

      await Database.document.deleteMany({
        where: {
          personId: id,
        },
      });

      await Database.person.delete({
        where: {
          id,
        },
      });

      return res.status(204).json({ data: results });
    } catch (error) {
      next(error);
    }
  }
}
