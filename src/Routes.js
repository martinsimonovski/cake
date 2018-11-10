import App from "./components/App/App";
import Home from "./Pages/Home";
import Login from "./components/Login/Login";
import AddPersons from "./Pages/AddPerson";
import ListPersons from "./Pages/ListPersons";
import AddGroup from "./Pages/AddGroup";

export default [
  {
    ...App,
    routes: [
      {
        ...Home,
        path: "/",
        exact: true
      },
      {
        ...Login,
        path: "/login"
      },
      {
        ...AddPersons,
        path: "/persons/add"
      },
      {
        ...AddGroup,
        path: "/group/add"
      },
      {
        ...ListPersons,
        path: "/persons"
      }
    ]
  }
];
