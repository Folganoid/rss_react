import React from 'react';
import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CardList from './CardList';

describe('CardList', () => {
  const data = [
    {
      id: 1,
      name: '2',
      status: '3',
      species: '4',
      type: '5',
      gender: 'Female',
      image: '7',
      created: '8',
      url: '9',
    },
    {
      id: 11,
      name: '22',
      status: '33',
      species: '44',
      type: '55',
      gender: 'Male',
      image: '77',
      created: '88',
      url: '99',
    },
  ];

  it('CardList has data fields', async () => {
    render(<CardList cardList={data} setModal={vi.fn} />);
    expect(screen.getAllByRole('article').length).toEqual(2);
    expect(screen.getAllByRole('img').length).toEqual(2);
    expect(screen.getAllByRole('heading').length).toEqual(3);
    expect(screen.getByText('Female')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
  });
});
