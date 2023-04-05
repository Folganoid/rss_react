import React from 'react';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Layout from './Layout';
import { MemoryRouter } from 'react-router-dom';

describe('Layout', () => {
  it('Layout <nav> exists', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
