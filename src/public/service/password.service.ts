import bcrypt from 'bcrypt';

export class PasswordService {
  private constructor() {}

  static async encript(password: string) {
    return await bcrypt.hash(password, 12);
  }

  static async compare(password: string, encripted: string) {
    return await bcrypt.compare(password, encripted);
  }
}
