import React from 'react';
import AppRouter from './components/parts/AppRouter';
import './App.scss';
import data from './data/frameworks.json';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <AppRouter data={data} />
      </div>
    );
  }
}
