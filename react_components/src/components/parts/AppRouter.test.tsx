import React from 'react';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRouter from './AppRouter';
import data from '../../data/frameworks.test.json';

describe('AppRouter', () => {
  it('AppRouter 404 page works', () => {
    render(
      <MemoryRouter initialEntries={['/not-exist']}>
        <AppRouter data={data} />
      </MemoryRouter>
    );
    expect(screen.getByText(/^404(.+)page(.+|)/i)).toBeInTheDocument();
  });

  it('AppRouter /about page works', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <AppRouter data={data} />
      </MemoryRouter>
    );
    expect(screen.getByText(/^About(.+)page(.+|)/i)).toBeInTheDocument();
  });

  it('AppRouter / work', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRouter data={data} />
      </MemoryRouter>
    );
    expect(screen.getByText(/^Home(.+)page(.+|)/i)).toBeInTheDocument();
  });
});
