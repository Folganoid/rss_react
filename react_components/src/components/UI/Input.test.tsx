import React from 'react';
import Input from './Input';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Input', () => {
  it('Input <input> exists', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
