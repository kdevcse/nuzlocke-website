import React from 'react';
import './Nav.css';
import {Link} from 'react-router-dom';

function Nav() {
  return (
    <nav className="Nav">
      <Link to='/login'>
        <p className='NavLogin'>Login</p>
      </Link>
      <ul>
        <Link to='/'>
          <li>Dashboard</li>
        </Link>
        <Link to='/about'>
          <li>About</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;
