import React from 'react';
import { Link } from 'react-router-dom';
import cl from './NavBar.module.scss';

function NavBar() {
  return (
    <nav className={cl.nav}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About us</Link>
        </li>
        <li>
          <div>
            <input placeholder={'search'} />
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
