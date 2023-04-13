import React from 'react';
import ErrorPage from './ErrorPage';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('ErrorPage', () => {
  it('404 title exists', () => {
    render(<ErrorPage />);
    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });

  it('ErrorPage has one <h1>', () => {
    render(<ErrorPage />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});
