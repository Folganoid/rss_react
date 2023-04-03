import React from 'react';
import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CardList from './CardList';

describe('CardList', () => {
  const data = [
    {
      _id: '1',
      height: '2',
      race: 'race1',
      gender: 'Female',
      birth: '5',
      spouse: '6',
      death: '7',
      realm: '8',
      hair: '9',
      name: '10',
      wikiUrl: '11',
    },
    {
      _id: '11',
      height: '22',
      race: 'race11',
      gender: 'Male',
      birth: '55',
      spouse: '66',
      death: '77',
      realm: '88',
      hair: '99',
      name: '1010',
      wikiUrl: '1111',
    },
  ];

  it('CardList has data fields', () => {
    render(<CardList cardList={data} />);
    expect(screen.getAllByRole('article').length).toEqual(2);
    expect(screen.getAllByRole('img').length).toEqual(2);
    expect(screen.getAllByRole('heading').length).toEqual(3);
    expect(screen.getByText('Female')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
  });
});
