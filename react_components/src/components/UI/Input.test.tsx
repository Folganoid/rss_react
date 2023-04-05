import React from 'react';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Input from './Input';

describe('Input', () => {
  it('Input <input> exists', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
