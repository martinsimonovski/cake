import Person from '../models/Person';
import fs from 'fs';

export function get(req, res, next) {
    Person.find({}, function (err, persons) {
        let personsMap = {};

        persons.forEach(person => {
            personsMap[person._id] = person;
        });

        res.json(personsMap);
    });
}

export function add(req, res, next) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const dateOfBirth = req.body.dateOfBirth;

    if (!firstName || !lastName || !dateOfBirth) {
        return res.status(422).send({ errorMessage: 'Please provide the appropriate information.' });
    }

    Person.findOne({ firstName: firstName, lastName: lastName }, (err, existingPerson) => {
        if (err) { return next(err); }

        if (existingPerson) {
            return res.status(422).send({ errorMessage: 'Person already exists.' });
        }

        const person = new Person({
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: dateOfBirth
        });

        person.save((err) => {
            if (err) {
                return next(err);
            }

            res.json(person);
        });
    });
}

export function update(req, res, next) {
    const id = req.params.id ? req.params.id : null;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(422).send({ errorMessage: 'Please provide the correct id of the person.' });
    }

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const dateOfBirth = req.body.dateOfBirth;

    if (!firstName || !lastName || !dateOfBirth) {
        return res.status(422).send({ errorMessage: 'Please provide the appropriate information.' });
    }

    Person.findById(req.params.id, (err, existingPerson) => {
        if (err) { return next(err); }

        existingPerson.firstName = firstName;
        existingPerson.lastName = lastName;
        existingPerson.dateOfBirth = dateOfBirth;

        existingPerson.save((err) => {
            if (err) {
                return next(err);
            }

            res.json(existingPerson);
        })
    });
}

export function remove(req, res, next) {
    const id = req.params.id ? req.params.id : null;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(422).send({ errorMessage: 'Please provide the correct id of the person.' });
    }

    Person.findByIdAndRemove(req.params.id, (err, existingPerson) => {
        if (err) { return next(err); }

        existingPerson.save((err) => {
            if (err) {
                return next(err);
            }

            res.json({
                message: "Person successfully deleted",
                id: existingPerson._id
            });
        })
    });
}

export function generateBirthdays(req, res, next) {
    const file = fs.readFileSync(__dirname + '/../data/bdays.json');

    const birthdays = JSON.parse(file);
    birthdays.forEach(bday => {
        let b = bday.birthday;

        bday.birthday = `${b.substr(4, 4)}-${b.substr(2, 2)}-${b.substr(0, 2)}`;
        const person = new Person(bday);
        person.save();
    });

    res.json({
        message: "All birthdays were generated."
    });
}

