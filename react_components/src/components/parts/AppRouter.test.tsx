import React from 'react';
import AppRouter from './AppRouter';
import store from '../../store';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('AppRouter', () => {
  it('AppRouter 404 page works', () => {
    render(
      <MemoryRouter initialEntries={['/not-exist']}>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByText(/^404(.+)page(.+|)/i)).toBeInTheDocument();
  });

  it('AppRouter /about page works', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByText(/^About(.+)page(.+|)/i)).toBeInTheDocument();
  });
});
