import { Strategy as LocalStrategy } from "passport-local";
import { authRepository } from "../presentation";

export const localStrategy = new LocalStrategy(
  { usernameField: "email", passwordField: "password" },
  async (email, password, done) => {
    try {
      const user = await authRepository.getUser(email, password);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);
