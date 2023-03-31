import React from 'react';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './Home';
import data from '../../data/frameworks.test.json';

describe('Home', () => {
  it('Home <main> exists', () => {
    render(<Home />);
    expect(screen.getByText(/home/i)).toBeInTheDocument();
  });
});
