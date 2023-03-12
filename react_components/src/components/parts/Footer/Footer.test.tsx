import React from 'react';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('Footer <footer> exists', () => {
    const { container } = render(<Footer />);
    expect(container.querySelector('footer')).toBeTruthy;
  });

  it('Footer has year and copyright', () => {
    render(<Footer />);
    expect(screen.getByText('2023 ©')).toBeInTheDocument();
  });
});
