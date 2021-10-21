import LogInPage from "./components/logInPage";
import RegPage from "./components/RegPage";
import Messenger from "./messenger";


export const publicRoutes = [
    {
        path : '/login',
        Component: LogInPage
    },
    {
        path: '/registration',
        Component: RegPage
    }
]

export const privateRoutes = [
    {
        path: '/talk',
        Component: Messenger
    }
]