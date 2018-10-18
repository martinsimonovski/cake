import * as BirthdayPerson from './controllers/BirthdayPerson';
import * as BirthdayGroup from './controllers/Group';
import * as Authentication from './controllers/Authentication';
import './services/passport';
import passport from 'passport';

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

export default (app) => {
    app.get('/', (req, res) => {
        res.send({ foo: 'bar' });
    });

    // CRUD Person
    app.get('/persons', BirthdayPerson.get);
    app.post('/persons', BirthdayPerson.add);
    app.put('/persons/:id', BirthdayPerson.update);
    app.delete('/persons/:id', BirthdayPerson.remove);
    app.get('/persons/generate', BirthdayPerson.generateBirthdays);

    // Authentication
    app.post('/auth/signin', requireSignin, Authentication.signin);
    app.post('/auth/create', requireAuth, Authentication.addAdmin);

    // Birthday_groups
    app.post('/birthday/group', BirthdayGroup.create);
    app.delete('/birthday/group/:id', BirthdayGroup.remove);
    app.put('/birthday/group/:id', BirthdayGroup.updatePayedIds);
    app.get('/birthday/group/current', BirthdayGroup.getCurrent);
}

/*
Header:
    - Menu with links
    - admin: quick action to create a list
    - admin: login/logout
Home page where you can:
    - see the current group and the ammount that needs to be payed
    - list with names (whos birthday it is)
    - list with all the people that need to pay
    - admin: action to select who payed
    - admin: delete the group
Passed groups
    - table with all the birthday groups and who payed wor that group
*/