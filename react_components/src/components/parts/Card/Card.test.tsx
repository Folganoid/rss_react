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
      desc: 'Angular XXX',
      site: 'https://#',
      openSource: true,
      type: ['WEB framework', 'JS library'],
      firstReleaseYear: 2016,
      firstReleaseMonth: 'Sep',
      lastReleaseDate: '2023-03-01',
    };

    render(<Card {...data} />);
    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText('Site:')).toBeInTheDocument();
    expect(screen.getByText('Angular XXX')).toBeInTheDocument();
    expect(screen.getByText('2023-03-01')).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();
    expect(screen.getByText('WEB framework, JS library')).toBeInTheDocument();
    expect(screen.getByText('2016 - Sep')).toBeInTheDocument();
  });
});
