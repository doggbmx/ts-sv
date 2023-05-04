export interface JwtPayload {
  sub: string;
  name: string;
  email: string;
  token: string;
  recoveryToken?: string;
}
