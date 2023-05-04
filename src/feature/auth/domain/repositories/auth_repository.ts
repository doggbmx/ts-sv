import { User } from "../../../user/domain/models/user_model";
import { infoMail } from "../models/info_mail_model";
import { JwtPayload } from "../jwt_payload";

export interface AuthRepository {
  getUser(email: string, password: string): Promise<Partial<User>>;
  signToken(user: User): JwtPayload;
  sendMail(infoMail: infoMail): Promise<void>;
  setRecoveryPassword(userEmail: string): Promise<void>;
  changePassword(token: string, newPassword: string): Promise<void>;
}
