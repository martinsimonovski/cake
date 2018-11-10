import Group from "../models/Group";
import Person from "../models/Person";

export function getDates(month) {
  const today = new Date();
  let currentMonth = today.getMonth() + 1;
  let year = today.getFullYear();

  if (month < currentMonth) {
    year++;
  }

  let startDate = new Date(year, month - 1, 1, 1, 0, 0);
  let endDate = new Date(year, month, 0, 1, 0, 0);

  return {
    startDate,
    endDate
  };
}

export function create(req, res, next) {
  const active = req.body.active ? req.body.active : false;
  if (!req.body.month) {
    return res.status(422).send({ errorMessage: "Please provide the month." });
  }

  const dates = getDates(req.body.month);
  getBirthdayPersonsInMonth(dates).then(persons => {
    let birthdayIds = persons.map(person => {
      return person._id;
    });

    const group = new Group({
      startDate: dates.startDate,
      endDate: dates.endDate,
      price: birthdayIds.length * 100,
      active: active,
      birthdayIds
    });

    group.save(err => {
      if (err) {
        return next(err);
      }

      res.json(group);
    });
  });
}

export function remove(req, res, next) {
  const id = req.params.id ? req.params.id : null;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res
      .status(422)
      .send({ errorMessage: "Please provide the correct id of the group." });
  }

  Group.findByIdAndRemove(id, (err, existingGroup) => {
    if (err) {
      return next(err);
    }

    if (existingGroup.payedIds === [] || existingGroup.payedIds.length === 0) {
      return res.status(422).send({
        errorMessage: `You can't delete the group because some people have payed.`
      });
    }

    existingGroup.save(err => {
      if (err) {
        return next(err);
      }

      res.json({
        message: "Group successfully deleted",
        id: existingGroup._id
      });
    });
  });
}

export function updatePayedIds(req, res, next) {
  const id = req.params.id ? req.params.id : null;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res
      .status(422)
      .send({ errorMessage: "Please provide the correct id of the group." });
  }

  Group.findById(id, (err, existingGroup) => {
    if (err) {
      return next(err);
    }

    const personId = req.body.personId;
    let payed = req.body.payed;

    if (!personId) {
      return res
        .status(422)
        .send({ errorMessage: "Please provide the personId." });
    }

    if (payed !== true) {
      payed = false;
    }

    const hasPayed = existingGroup.payedIds.includes(personId);
    if (!hasPayed && payed) {
      existingGroup.payedIds.push(personId);
    } else if (hasPayed && !payed) {
      var index = existingGroup.payedIds.indexOf(personId);
      if (index > -1) {
        existingGroup.payedIds.splice(index, 1);
      }
    }

    existingGroup.save(err => {
      if (err) {
        return next(err);
      }

      res.json({
        message: "Person " + payed ? "payed" : "unpayed",
        group: existingGroup
      });
    });
  });
}

export function getCurrent(req, res, next) {
  Group.findOne({}, {}, { sort: { createdAt: -1 } }, (err, group) => {
    res.json(group);
  });
}

function getBirthdayPersonsInMonth(dates) {
  const promise = Person.find({}).exec();
  return promise.then(persons => {
    let personsMap = [];
    persons.forEach(person => {
      let birthday = new Date(person.birthday);
      if (birthday.getMonth() === dates.startDate.getMonth()) {
        personsMap.push(person);
      }
    });

    return personsMap;
  });
}
