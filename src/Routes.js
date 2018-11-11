import App from "./components/App/App";
import Home from "./Pages/Home";
import Login from "./components/Login/Login";
import AddPersons from "./Pages/AddPerson";
import ListPersons from "./Pages/ListPersons";
import AddGroup from "./Pages/AddGroup";
import GroupDetails from "./Pages/GroupDetails";
import ListGroups from "./Pages/ListGroups";

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
        ...ListPersons,
        path: "/persons"
      },
      {
        ...AddGroup,
        path: "/groups/add"
      },
      {
        ...GroupDetails,
        path: "/groups/:id"
      },
      {
        ...ListGroups,
        path: "/groups"
      }
    ]
  }
];
