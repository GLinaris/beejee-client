import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";

// project imports
import * as paths from './paths';

import CheckAuth from "hoc/CheckAuth";
import MainLayout from "layout/MainLayout";
import CreateEdit from "pages/CreateEdit/CreateEdit";
import {
    NotFound,
    Signin,
    Tasks
} from 'pages/index';

const routes = [
    {
        path: paths.SIGNIN,
        element: <Signin />,
    },
    {
        path: paths.HOME,
        element:
            <CheckAuth>
                <MainLayout />
            </CheckAuth>,
        children: [
            {
                index: true,
                element: <Tasks />,
            },
            {
                path: paths.CREATE_EDIT,
                element: <CreateEdit />,
            },
        ],
    },
    {
        path: paths.NOT_FOUND,
        element: <NotFound />,
    }
];

export default function Router() {
    const router = createBrowserRouter(routes);
    return <RouterProvider router={router} />;
}
