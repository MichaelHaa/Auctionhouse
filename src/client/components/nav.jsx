import React from 'react';
import {Link} from 'react-router-dom';


// returns a simple navigation box to use on every page 
function Nav() {
    const navStyle  = {
        color: 'black'
    };
    return (
        <nav>
            <ul style={{ listStyleType: "none" }}>
                <Link style={navStyle} to="./">
                    <li>Auctions</li>
                </Link>
                <Link style={navStyle} to="./addItem">
                    <li>Add item</li>
                </Link>
                <Link style={navStyle} to="./about">
                    <li>About</li>
                </Link>
            </ul>
        </nav>
);
}

export default Nav;