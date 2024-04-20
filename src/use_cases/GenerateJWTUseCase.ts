import jwt from "jsonwebtoken";
export default class GenerateJWTUseCase {
  async execute(content: any) {
    return jwt.sign(content, process.env.JWT_SECRET!);
  }
}
