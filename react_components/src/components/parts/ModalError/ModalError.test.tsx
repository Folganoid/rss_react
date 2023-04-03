import React from 'react';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ModalError from './ModalError';

describe('ModalError', () => {
  const errors = ['111', '222'];

  it('ModalError has data fields', () => {
    render(<ModalError errors={errors} />);
    expect(screen.getByText('111')).toBeInTheDocument();
    expect(screen.getByText('222')).toBeInTheDocument();
  });
});
