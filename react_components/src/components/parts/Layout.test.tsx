import React from 'react';
import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import Layout from './Layout';
import { MemoryRouter } from 'react-router-dom';

describe('Layout', () => {
  it('Layout <header> exists', () => {
    const { container } = render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
    expect(container.querySelector('header')).toBeTruthy;
  });
});
