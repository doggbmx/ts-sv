import { usersRepository } from "../../feature/user/presentation";

import bcrypt from "bcrypt";

export class AuthService {
  async getUser(email: string, password: string) {
    try {
      const user = await usersRepository.getUserByEmail(email);
      if (!user) {
        console.log("user not found");
        throw new Error();
      }

      const passMatch = await bcrypt.compare(password, user.password!);
      if (!passMatch) {
        console.log("password not match");
        throw new Error();
      }
      delete user.password;
      return user;
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }
}
