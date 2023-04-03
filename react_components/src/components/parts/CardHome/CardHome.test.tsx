import React from 'react';
import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CardHome from './CardHome';

describe('CardHome', () => {
  it('CardHome has data fields', () => {
    const data = {
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
    };

    render(<CardHome {...data} />);
    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByText('Female')).toBeInTheDocument();
    expect(screen.getByText('race1')).toBeInTheDocument();
  });

  it('CardHome has data fields 2', () => {
    const data = {
      _id: '1',
      height: '2',
      race: 'race2',
      gender: 'Male',
      birth: '5',
      spouse: '6',
      death: '7',
      realm: '8',
      hair: '9',
      name: '10',
      wikiUrl: '11',
      setModal: vi.fn,
    };

    render(<CardHome {...data} />);
    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
    expect(screen.getByText('race2')).toBeInTheDocument();
  });
});
