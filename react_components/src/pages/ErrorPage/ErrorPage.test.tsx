import React from 'react';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorPage from './ErrorPage';

describe('ErrorPage', () => {
  it('ErrorPage <main> exists', () => {
    const { container } = render(<ErrorPage />);
    expect(container.querySelector('main')).toBeTruthy;
  });

  it('ErrorPage has h1', () => {
    render(<ErrorPage />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});
