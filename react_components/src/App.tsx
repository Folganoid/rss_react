import React from 'react';
import AppRouter from './components/parts/AppRouter';
import './styles/App.scss';
import data from './data/frameworks.json';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <AppRouter data={data} />
      </div>
    );
  }
}
