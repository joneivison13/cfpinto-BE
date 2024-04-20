import jwt from "jsonwebtoken";
import fs from "node:fs/promises";
import { log } from "winston";
import logger from "../utils/logger";

export default class AuthToken {
  constructor() {}

  static async sign(data: any, expiresIn: string | number | undefined = "1d") {
    const [private_key, refresh_private_key] = await Promise.all([
      fs.readFile(process.env.AUTH_PRIVATE_KEY_PATH as string),
      fs.readFile(process.env.REFRESH_AUTH_PRIVATE_KEY_PATH as string),
    ]);
    return {
      token: jwt.sign(data, private_key, { algorithm: "RS256", expiresIn }),
      refresh_token: jwt.sign(
        { ...data, type: "refresh" },
        refresh_private_key,
        { algorithm: "RS256", expiresIn: "7d" }
      ),
    };
  }

  static async decode(token: string) {
    try {
      const public_key = await fs.readFile(
        process.env.AUTH_PUBLIC_KEY_PATH as string
      );
      return jwt.verify(token, public_key, {
        algorithms: ["RS256"],
      }) as any;
    } catch (error) {
      logger.error(error);
      throw new Error("Invalid token");
    }
  }

  static async refresh(token: string) {
    const refresh_public_key = await fs.readFile(
      process.env.REFRESH_AUTH_PUBLIC_KEY_PATH as string
    );
    const decoded = jwt.verify(token, refresh_public_key, {
      algorithms: ["RS256"],
    }) as any;
    if (decoded.type !== "refresh") {
      throw new Error("Invalid refresh token");
    }
    const { user_id, username, email } = decoded;
    return this.sign({ username, email });
  }
}
