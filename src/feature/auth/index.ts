import passport from 'passport'
import { localStrategy } from './strategies/local.strategy'
import { jwtStrategy } from './strategies/jwt.strategy'

passport.use(localStrategy);
passport.use(jwtStrategy);