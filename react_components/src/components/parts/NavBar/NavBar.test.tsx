import React from 'react';
import NavBar from './NavBar';
import { MemoryRouter } from 'react-router-dom';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

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
