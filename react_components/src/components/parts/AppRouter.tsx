import About from '../../pages/About/About';
import ErrorPage from '../../pages/ErrorPage/ErrorPage';
import Home from '../../pages/Home/Home';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import FormPage from '../../pages/FormPage/FormPage';
import { ICard } from './Card/Card';

export default class AppRouter extends React.Component<{ data: ICard[] }, object> {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home data={this.props.data} />} />
          <Route path="about" element={<About />} />
          <Route path="form" element={<FormPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    );
  }
}
