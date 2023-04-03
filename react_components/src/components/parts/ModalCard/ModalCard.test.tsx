import React from 'react';
import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ModalCard from './ModalCard';

describe('ModalCard', () => {
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
    wikiUrl: 'NaN',
    setModal: vi.fn(),
  };

  it('ModalCard has data fields', () => {
    render(<ModalCard {...data} />);
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('race1')).toBeInTheDocument();
    expect(screen.getByText('Female')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('X')).toBeInTheDocument();
    expect(screen.getByText('?')).toBeInTheDocument();
  });

  it('ModalCard has data fields 2', async () => {
    data.gender = 'Male';
    data.wikiUrl = 'xxx';
    render(<ModalCard {...data} />);
    expect(screen.getByText('Male')).toBeInTheDocument();
    expect(screen.getByText('X')).toBeInTheDocument();
    expect(screen.getByText('xxx')).toBeInTheDocument();
  });
});
