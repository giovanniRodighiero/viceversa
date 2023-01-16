import React from "react";
import { Link, useMatches } from "react-router-dom";

import { ROUTES_IDS } from "../../types";

function NavBar() {
    // first is always layout since it's in the root
    const [, current] = useMatches();

    const isAdmin = current.id === ROUTES_IDS.admin;

    return (
        <nav className="navbar">
            <p className="navbar__user">Welcome user</p>
            {isAdmin && (
                <Link className="navbar__link" to="/">
                    See dashboard
                </Link>
            )}
            {!isAdmin && (
                <Link className="navbar__link" to="/admin">
                    Edit metrics
                </Link>
            )}
        </nav>
    );
}

export default NavBar;
