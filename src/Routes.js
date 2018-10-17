import App from './components/App/App';
import Home from './components/Home/Home';
import Login from './components/Login/Login';

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
            }
        ]
    }
];