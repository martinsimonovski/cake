import passport from 'passport';
import User from '../models/User';
import config from '../config';
import { Strategy, ExtractJwt } from 'passport-jwt';
import LocalStrategy from 'passport-local';

const localOptions = { usernameField: 'username' };
const localLogin = new LocalStrategy(localOptions, (username, password, done) => {
    User.findOne({username: username}, (err, user) => {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }

        user.comparePassword(password, (err, isMatch) => {
            if (err) { return done(err); }
            if (!isMatch) { return done(null, false); }

            return done(null, user);
        });
    });
});

const jwtOptions = { 
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

const jwtLogin = new Strategy(jwtOptions, (payload, done) => {
    User.findById(payload.sub, (err, user) => {
        if (err) { return done(err, false); }

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
});

passport.use(jwtLogin);
passport.use(localLogin);