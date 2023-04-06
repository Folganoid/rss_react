import React from 'react';
import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ModalCard from './ModalCard';

describe('ModalCard', () => {
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

  it('ModalCard has data fields', () => {
    render(<ModalCard {...data} />);
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Female')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
  });

  it('ModalCard has data fields 2 and button', async () => {
    data.gender = 'Male';
    render(<ModalCard {...data} />);
    expect(screen.getByText('Male')).toBeInTheDocument();
    expect(screen.getByText('X')).toBeInTheDocument();
  });
});
