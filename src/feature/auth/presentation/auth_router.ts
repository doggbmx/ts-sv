import express, { NextFunction, Request, Response } from "express";
import { User } from "../../user/domain/models/user_model";
import jwt, {
  Jwt,
  JwtPayload,
  Secret,
  VerifyCallback,
  VerifyErrors,
} from "jsonwebtoken";

import passport from "passport";
import { config } from "../../../core/config/config";

export default function AuthRouter() {
  const router = express.Router();

  router.post(
    "/login",
    passport.authenticate("local", { session: false }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        let user = req.user as Partial<User>;
        const payload = {
          sub: user.userId,
          name: user.name,
          email: user.email,
        };
        const token = jwt.sign(payload, config.jwtSecret as Secret, {
          expiresIn: "10m",
        });
        const refreshToken = jwt.sign(payload, config.refreshToken as Secret, {
          expiresIn: "1d",
        });
        res.cookie("jwt", refreshToken, { httpOnly: true, secure: true });
        delete user.password;
        res.json({
          user,
          token,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    "/recovery",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        let { email } = req.body;
      } catch (error) {
        next(error);
      }
    }
  );

  router.post("/refresh", (req: Request, res: Response, next: NextFunction) => {
    if (req.cookies.jwt) {
      const refreshToken = req.cookies.jwt;
      jwt.verify(
        refreshToken,
        config.refreshToken as Secret,
        (err: any, decoded: any) => {
          if (err) {
            res.status(401).send("Invalid token");
          } else {
            const payload = {
              sub: decoded!.sub,
              name: decoded!.name,
              email: decoded!.email,
            };
            const token = jwt.sign(payload, config.jwtSecret as Secret, {
              expiresIn: "10m",
            });
            res.json({
              token,
            });
          }
        }
      );
    } else {
      res.status(401).send("No token");
    }
  });

  return router;
}
