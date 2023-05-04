import { User } from "../../../user/domain/models/user_model";
import { UserRepositories } from "../../../user/domain/repositories/user_repositories";
import { AuthRepository } from "./auth_repository";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from "../../../../core/config/config";
import { JwtPayload } from "../jwt_payload";
import { mailService } from "../../../../core/services/mail_service";
import { infoMail } from "../models/info_mail_model";

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
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "15min" });
    return {
      token,
      ...payload,
    };
  }

  async sendMail(infoMail: infoMail): Promise<void> {
    await mailService.sendMail(infoMail);
  }

  async setRecoveryPassword(userEmail: string): Promise<void> {
    const user = await this.userRepository.getUserByEmail(userEmail);
    if (!user) {
      console.log("user not found");
      throw new Error("user not found");
    }
    const token = this.signToken(user);
    await this.userRepository.updateUser(user.userId, {
      recoveryToken: token.token,
    });
    // TEST ROUTE
    const link = `http://localhost:3000/recovery/?token=${token.token}`;
    const mail = {
      from: config.smtpEmail,
      to: user.email,
      subject: "Recover your password friend!",
      html: `<h1>Reset Password</h1>
      <p>Click this <a href="${link}">link</a> to reset your password</p>`,
    };
    try {
      await this.sendMail(mail);
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }

  async changePassword(token: string, newPassword: string): Promise<void> {
    try {
      const payload = jwt.verify(token, config.jwtSecret) as JwtPayload;
      console.log("antes de obtener el usuario");
      const user = await this.userRepository.getUser(payload.sub);
      console.log("antes de imprimir el recovery token");
      console.log("user-recoveryToken => ", user);
      if (user.recoveryToken !== token) {
        throw new Error("Unauthorized! Invalid recoveryToken");
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await this.userRepository.updateUser(user.userId, {
        password: hash,
        recoveryToken: null,
      });
    } catch (error) {
      console.log(error);
      throw new Error("Unauthorized");
    }
  }
}
