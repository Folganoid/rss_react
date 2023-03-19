import React from 'react';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import FormPage from './FormPage';

describe('FormPage', () => {
  it('FormPage <h1>Form...</h1> exists', () => {
    render(<FormPage />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByText(/form page/i)).toBeInTheDocument();
  });
});
