import { User } from "../../../user/domain/models/user_model";
import bcrypt from "bcrypt";
import { JwtPayload } from "../jwt_payload";

export interface AuthRepository {
  getUser(email: string, password: string): Promise<Partial<User>>;
  signToken(user: User): JwtPayload;
  sendMail(userEmail: string): Promise<void>;
}
