import React from 'react';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import About from './About';

describe('About', () => {
  it('About has h1', () => {
    render(<About />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('About title exists', () => {
    render(<About />);
    expect(screen.getByText(/about/i)).toBeInTheDocument();
  });
});
