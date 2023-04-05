import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer/Footer';
import NavBar from './NavBar/NavBar';

export default function Layout() {
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
