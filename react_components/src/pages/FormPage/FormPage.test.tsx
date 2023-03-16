import React from 'react';
import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import FormPage from './FormPage';

describe('FormPage', () => {
  it('FormPage <main> exists', () => {
    const { container } = render(<FormPage />);
    expect(container.querySelector('main')).toBeTruthy;
  });
});
