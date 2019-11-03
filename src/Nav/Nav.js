import React from 'react';
import './Nav.css';
import {Link} from 'react-router-dom';

function Nav() {
  return (
    <nav className="Nav">
        <ul>
          <Link to='/'>
            <li>Home</li>
          </Link>
          <Link to='/Login'>
            <li>Login</li>
          </Link>
          <Link to='/about'>
            <li>About</li>
          </Link>
        </ul>
    </nav>
  );
}

export default Nav;
