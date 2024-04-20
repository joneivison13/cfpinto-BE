import bcrypt from "bcryptjs";
export default class SecurePassword {
  static async hash(password: string) {
    const salt = await bcrypt.genSalt(9);
    return await bcrypt.hash(password, salt);
  }

  static async compare(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
