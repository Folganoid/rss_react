import React from 'react';
import About from '../../pages/About/About';
import ErrorPage from '../../pages/ErrorPage/ErrorPage';
import FormPage from '../../pages/FormPage/FormPage';
import Home from '../../pages/Home/Home';
import Layout from './Layout';
import { Route, Routes } from 'react-router-dom';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="form" element={<FormPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}
