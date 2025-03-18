import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "../views/Login";
import Home from "../views/Home";
import Error404 from "../views/Error404";

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
        errorElement: <Error404 />,
    },
    {
        path: '/',
        element: <Home />,
        errorElement: <Error404 />,
    }

]);

const MyRoutes = () => <RouterProvider router={router}  />;
export default MyRoutes;