import React from 'react';
import Layout from './Layout';
import { MemoryRouter } from 'react-router-dom';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

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
