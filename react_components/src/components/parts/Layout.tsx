import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer/Footer';
import NavBar from './NavBar/NavBar';

interface IState {
  show: boolean;
}

export default class Layout extends React.Component<object, IState> {
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
