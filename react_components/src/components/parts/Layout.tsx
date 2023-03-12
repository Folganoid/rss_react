import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer/Footer';
import NavBar from './NavBar/NavBar';

export default class Layout extends React.Component {
  render() {
    return (
      <>
        <header>
          <NavBar />
        </header>
        <Outlet />
        <Footer />
      </>
    );
  }
}
