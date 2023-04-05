import React from 'react';
import AppRouter from './components/parts/AppRouter';
import './App.scss';
import data from './data/frameworks.json';

export default function App() {
  return (
    <div>
      <AppRouter data={data} />
    </div>
  );
}
