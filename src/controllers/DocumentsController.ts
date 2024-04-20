import { NextFunction, Request, Response } from "express";
import {
  CreateDocumentService,
  UpdateDocumentById,
} from "../services/DocumentService";

import path from "path";
import { Database } from "../infra/database";

export default class DocumentsController {
  constructor() {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const document = await CreateDocumentService(
        {
          type: data.type,
          value: data.value,
          file_dir: req.file?.path,
          file: req.file?.path
            ? path.basename(req.file?.path as string)
            : undefined,
        },
        data.person
      );
      return res.status(201).json({ id: document });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const data = req.body;

      const updatedDocument = await UpdateDocumentById(
        {
          type: data.type,
          value: data.value,
          file_dir: req.file?.path,
        },
        id
      );

      return res.status(200).json(updatedDocument);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;

      await Database.document.delete({ where: { id } });

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
