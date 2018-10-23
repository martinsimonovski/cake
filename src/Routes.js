import App from './components/App/App';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import AddPersons from './components/Pages/AddPerson';
import ListPersons from './components/Pages/ListPersons';

export default [
    {
        ...App,
        routes: [
            {
                ...Home,
                path: '/',
                exact: true
            },
            {
                ...Login,
                path: '/login'
            },
            {
                ...AddPersons,
                path: '/persons/add'
            },
            {
                ...ListPersons,
                path: '/persons'
            }
        ]
    }
];