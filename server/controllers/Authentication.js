import jwt from 'jwt-simple';
import User from '../models/User';
import config from '../config';

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
}

export function signin(req, res, next) {
    res.send({token: tokenForUser(req.user)});
}

export function addAdmin(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(422).send({ errorMessage: 'You must provide username and password.'});
    }

    User.findOne({username: username}, (err, existingUser) => {
        if(err) { return next(err); }

        if (existingUser) {
            return res.status(422).send({errorMessage: 'The user already exists.'});
        }

        const user = new User({
            username: username,
            password: password,
            admin: true
        });

        user.save((err) => {
            res.json({
                message: "Added new admin"
            });
        });
    });
}