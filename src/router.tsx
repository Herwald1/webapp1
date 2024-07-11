import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Users from "./views/Users";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/layouts/DefaultLayout";
import GuestLayout from "./components/layouts/GuestLayout";
import Dashboard from "./views/DashBoard";
import Inventory from "./views/Inventory";
import DashBoardView from "./views/DashBoardView";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/dashboard"/>
            },
            {
                path: "/dashboard",
                element: <DashBoardView/>
            },
            {
                path: "/users",
                element: <Users />
            },
            {
                path: "/settings",
                element: <Users />
            },
            {
                path: "/inventory",
                element: <Inventory />
            }
        ]
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [


            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signup",
                element: <Signup />
            },

        ]
    },
    {
        path: "*",
        element: <NotFound />
    }

]);

export default router