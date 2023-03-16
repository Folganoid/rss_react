import React from 'react';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import FormA from './FormA';

describe('FormA', () => {
  it('FormA <input name="name"> exists', () => {
    render(<FormA />);

    expect(
      screen.getByRole('textbox', {
        name: /name/i,
      })
    ).toBeInTheDocument();
  });

  it('FormA <input name="description"> exists', () => {
    render(<FormA />);

    expect(
      screen.getByRole('textbox', {
        name: /description/i,
      })
    ).toBeInTheDocument();
  });

  it('FormA 2x<select> exist', () => {
    const { container } = render(<FormA />);
    expect(container.querySelectorAll('select').length).toBe(2);
  });

  it('FormA <button> exists', () => {
    render(<FormA />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
