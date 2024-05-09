import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import AppError from "../../../utils/error";
import AuthToken from "../../../services/jwt";
import { Login } from "../../../services/LoginService";
import logger from "../../../utils/logger";

export default class AuthMiddeleware {
  async handle(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      return next(new AppError("Access denied", 403));
    }

    // const { email, password } = JSON.parse(authorization);
    const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
    const [email, password] = Buffer.from(b64auth, "base64")
      .toString()
      .split(":");

    try {
      await Login({ email, password });
      next();
    } catch (error) {
      logger.error(error);
      return res.status(401).json({ error: "access denied" });
    }
  }
}
