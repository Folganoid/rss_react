import React from 'react';
import { NavLink } from 'react-router-dom';
import cl from './NavBar.module.scss';

export default class NavBar extends React.Component {
  render() {
    return (
      <nav className={cl.nav}>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About us</NavLink>
          </li>
          <li>
            <NavLink to="/form">Form</NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}
