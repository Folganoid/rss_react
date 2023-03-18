import React from 'react';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorPage from './ErrorPage';

describe('ErrorPage', () => {
  it('About title exists', () => {
    render(<ErrorPage />);
    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });

  it('ErrorPage has h1', () => {
    render(<ErrorPage />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});
