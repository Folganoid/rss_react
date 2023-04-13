import React from 'react';
import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CardHome from './CardHome';

describe('CardHome', () => {
  it('CardHome has data fields', () => {
    const data = {
      id: 1,
      name: '2',
      status: '3',
      species: '4',
      type: '5',
      gender: 'Female',
      image: '7',
      created: '8',
      url: '9',
      setModal: vi.fn(),
    };

    render(<CardHome {...data} />);
    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByText('Female')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('CardHome has data fields 2', () => {
    const data = {
      id: 1,
      name: '22',
      status: '3',
      species: '4',
      type: '5',
      gender: 'Male',
      image: '7',
      created: '8',
      url: '9',
      setModal: vi.fn(),
    };

    render(<CardHome {...data} />);
    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
    expect(screen.getByText('22')).toBeInTheDocument();
  });
});
