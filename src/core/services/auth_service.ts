import { GenericError } from "../../feature/error/generic_error";
import { NotFoundError } from "../../feature/error/not_found_error";
import { usersRepository } from "../../feature/user/presentation";

import bcrypt from "bcrypt";

export class AuthService {
  async getUser(email: string, password: string) {
    try {
      const user = await usersRepository.getUserByEmail(email);
      if (!user) {
        console.log("user not found");
        throw new NotFoundError("user");
      }

      const passMatch = await bcrypt.compare(password, user.password!);
      if (!passMatch) {
        console.log("password not match");
        throw new NotFoundError("user");
      }
      delete user.password;
      return user;
    } catch (error) {
      console.log(error);
      throw new GenericError("auth service error");
    }
  }
}
