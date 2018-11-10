import * as BirthdayPerson from "./controllers/BirthdayPerson";
import * as BirthdayGroup from "./controllers/Group";
import * as Authentication from "./controllers/Authentication";
import "./services/passport";
import passport from "passport";

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

export default app => {
  app.get("/", (req, res) => {
    res.send({ foo: "bar" });
  });

  // CRUD Person
  app.get("/persons", BirthdayPerson.get);
  app.post("/persons", requireAuth, BirthdayPerson.add);
  app.put("/persons/:id", requireAuth, BirthdayPerson.update);
  app.delete("/persons/:id", requireAuth, BirthdayPerson.remove);
  app.get("/persons/generate", BirthdayPerson.generateBirthdays);

  // Authentication
  app.post("/auth/signin", requireSignin, Authentication.signin);
  app.post("/auth/create", requireAuth, Authentication.addAdmin);

  // Birthday_groups
  app.post("/birthday/group", BirthdayGroup.create);
  app.delete("/birthday/group/:id", requireAuth, BirthdayGroup.remove);
  app.put("/birthday/group/:id", requireAuth, BirthdayGroup.updatePayedIds);
  app.get("/birthday/group/current", BirthdayGroup.getCurrent);
};
