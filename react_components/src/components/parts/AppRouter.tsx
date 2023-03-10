import About from '../../pages/About';
import ErrorPage from '../../pages/ErrorPage';
import Home from '../../pages/Home';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';

export default class AppRouter extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    );
  }
}
