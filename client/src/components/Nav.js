import React from 'react';
import { Link, IndexLink } from "react-router";

import "./Nav.css";

const Nav = props => {
    return  (<nav className="blue-grey darken-2 nav-main">
                <div className="nav-wrapper">
                    <IndexLink to={'/'} activeClassName={"active"}>Home</IndexLink>
                    <Link to={'/favs/'} activeClassName={"active"}>Favorites</Link>
                    <Link to={'/about/'} activeClassName={"active"}>About</Link>
                </div>
            </nav>);
}

export default Nav;

