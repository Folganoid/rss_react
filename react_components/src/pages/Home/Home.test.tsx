import React from 'react';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home', () => {
  it('Home <main> exists', () => {
    render(<Home />);
    expect(screen.getByText(/home/i)).toBeInTheDocument();
  });
});
