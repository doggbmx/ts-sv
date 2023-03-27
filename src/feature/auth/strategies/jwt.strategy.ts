import { Strategy, ExtractJwt } from 'passport-jwt';
import { config } from '../../../core/config/config';

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret,
};

export const jwtStrategy = new Strategy(options, async (payload, done) => {
   return done(null, payload); 
});