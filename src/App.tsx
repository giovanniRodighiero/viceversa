import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { ROUTES_IDS } from "./types";
import Layout from "./components/Layout";
import Dashboard from "./Pages/Dashboard";

const router = createBrowserRouter([
    {
        id: ROUTES_IDS.layout,
        path: "/",
        element: <Layout />,
        children: [
            {
                id: ROUTES_IDS.dashboard,
                index: true,
                element: <Dashboard />,
            },
            {
                id: ROUTES_IDS.admin,
                path: "admin",
                element: <p>admin</p>,
            },
            {
                path: "*",
                element: <Dashboard />,
            },
        ],
    },
]);
function App() {
    return <RouterProvider router={router} />;
}

export default App;
