import React from 'react';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import About from './About';

describe('About', () => {
  it('About <main> exists', () => {
    const { container } = render(<About />);
    expect(container.querySelector('main')).toBeTruthy;
  });

  it('About has h1', () => {
    render(<About />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});
