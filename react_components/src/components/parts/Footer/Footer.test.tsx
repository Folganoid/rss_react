import React from 'react';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('Footer github image exists', () => {
    render(<Footer />);
    expect(screen.getByAltText('gitHub')).toBeInTheDocument();
  });

  it('Footer has year and copyright', () => {
    render(<Footer />);
    expect(screen.getByText('2023 ©')).toBeInTheDocument();
  });

  it('Footer rss image exists', () => {
    render(<Footer />);
    expect(screen.getByAltText('RSSchool')).toBeInTheDocument();
  });
});
