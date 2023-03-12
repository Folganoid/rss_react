import React from 'react';
import { describe, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Home from './Home';
import data from '../data/frameworks.test.json';

describe('Home', () => {
  it('Home <main> exists', () => {
    const { container } = render(<Home data={data} />);
    expect(container.querySelector('main')).toBeTruthy;
  });

  it('Home has input with type="text"', () => {
    render(<Home data={data} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('Home has 2 cards ', () => {
    const { container } = render(<Home data={data} />);
    const cards = container.querySelectorAll('article');
    expect(cards.length).toBe(2);
  });

  it('Home input works', () => {
    render(<Home data={data} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'xxx23' } });
    expect(input.value).toBe('xxx23');
  });
});
