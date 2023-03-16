import React from 'react';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  it('Card has data fields', () => {
    const data = {
      id: 1,
      image: 'i_angular.jpg',
      name: 'Angular',
      year: '2016',
      desc: 'Angular XXX',
      license: 'MIT',
      site: 'https://#',
    };

    render(<Card {...data} />);
    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText('Site:')).toBeInTheDocument();
    expect(screen.getByText('Angular XXX')).toBeInTheDocument();
    expect(screen.getByText('MIT')).toBeInTheDocument();
  });
});
