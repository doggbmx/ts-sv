import { Strategy as LocalStrategy } from "passport-local";
import { usersRepository } from "../../user/presentation/index";
import bcrypt from "bcrypt";

export const localStrategy = new LocalStrategy(
  { usernameField: "email" },
  async (email, password, done) => {
    try {
      const user = await usersRepository.getUserByEmail(email);
      if (!user) {
        done(new Error(), false);
      }

      const passMatch = await bcrypt.compare(password, user.password!);
      if (!passMatch) {
        done(new Error(), false);
      }

      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);
