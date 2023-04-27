import { User } from "../../../user/domain/models/user_model";
import { UserRepositories } from "../../../user/domain/repositories/user_repositories";
import { usersRepository } from "../../../user/presentation";
import { AuthRepository } from "./auth_repository";
import jwt, { Jwt, Secret, VerifyCallback, VerifyErrors } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from "../../../../core/config/config";
import { JwtPayload } from "../jwt_payload";

export class AuthRepositoryImplementation implements AuthRepository {
  private userRepository: UserRepositories;
  private constructor(Repository: UserRepositories) {
    this.userRepository = Repository;
  }

  static instance: AuthRepository | null = null;

  static create(usersRepository: UserRepositories) {
    if (AuthRepositoryImplementation.instance == null) {
      AuthRepositoryImplementation.instance = new AuthRepositoryImplementation(
        usersRepository
      );
    }
    return AuthRepositoryImplementation.instance;
  }

  async getUser(email: string, password: string) {
    try {
      const user = await this.userRepository.getUserByEmail(email);
      if (!user) {
        console.log("user not found");
        throw new Error("user not found");
      }

      const passMatch = await bcrypt.compare(password, user.password!);
      if (!passMatch) {
        console.log("password not match");
        throw new Error("no match in user and password");
      }
      delete user.password;
      return user;
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }

  signToken(user: User): JwtPayload {
    const payload = {
      sub: user.userId,
      name: user.name,
      email: user.email,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      token,
      ...payload,
    };
  }

  sendMail(userEmail: string): void {
    throw new Error("Method not implemented.");
  }
}