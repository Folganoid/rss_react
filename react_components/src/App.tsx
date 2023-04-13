import React from 'react';
import './App.scss';
import AppRouter from './components/parts/AppRouter';
import store from './store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

export default function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <AppRouter />;
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
}
