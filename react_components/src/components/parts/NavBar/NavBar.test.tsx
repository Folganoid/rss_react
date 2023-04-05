import React from 'react';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import NavBar from './NavBar';
import { MemoryRouter } from 'react-router-dom';

describe('NavBar', () => {
  it('NavBar <nav> exists', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <NavBar />
      </MemoryRouter>
    );
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});
