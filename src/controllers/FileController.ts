import { NextFunction, Request, Response } from "express";
import { genProcuracao } from "../services/GenDocService";

interface FileContent {
  type: "procuracao";
  usersid: string[];
}

export default class FileController {
  constructor() {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { type, usersid } = req.body as FileContent;
      if (type === "procuracao") {
        const document = await genProcuracao(usersid);
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=" +
            `${new Date().toISOString().slice(0, 10)}-procuracao.docx`
        );
        return res.send(Buffer.from(document, "base64"));
      }
      return res.status(400).json({ error: "Invalid type" });
    } catch (error) {
      next(error);
    }
  }
}
