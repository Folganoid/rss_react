import React from 'react';
import { describe, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Home from './Home';
import data from '../../data/frameworks.test.json';

describe('Home', () => {
  it('Home <main> exists', () => {
    render(<Home data={data} />);
    expect(screen.getByText(/home/i)).toBeInTheDocument();
  });

  it('Home has input with type="text"', () => {
    render(<Home data={data} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('Home has 2 cards ', () => {
    render(<Home data={data} />);
    expect(screen.getAllByRole('article').length).toEqual(2);
  });

  it('Home search restore from Local storage', () => {
    localStorage.setItem('search', '111');
    render(<Home data={data} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('111');
  });

  it('Home input empty value works', () => {
    render(<Home data={data} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'xxx' } });
    fireEvent.change(input, { target: { value: '' } });
    expect(input.value).toBe('');
  });

  it('Home input works', () => {
    render(<Home data={data} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'xxx23' } });
    expect(input.value).toBe('xxx23');
  });

  it('Home Local storage was filled', () => {
    expect(localStorage.getItem('search')).toBe('xxx23');
  });
});
