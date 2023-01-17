import React from "react";
import { Outlet } from "react-router-dom";

import NavBar from "../NavBar";
import ErrorBoundary from "../ErrorBoundary";

function Layout() {
    return (
        <div className="layout">
            <NavBar />

            <ErrorBoundary>
                <Outlet />
            </ErrorBoundary>
        </div>
    );
}

export default Layout;
