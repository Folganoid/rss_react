import Card from './Card';
import React from 'react';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Card', () => {
  it('Card has data fields', () => {
    const data = {
      id: 1,
      desc: 'Angular XXX',
      firstReleaseMonth: 'Sep',
      firstReleaseYear: 2016,
      image: 'http://sdfsf.i_angular.jpg',
      lastReleaseDate: '2023-03-01',
      name: 'Angular',
      openSource: true,
      site: 'http://i_default.jpg',
      type: ['WEB framework', 'JS library'],
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
    expect(screen.getByText('http://i_default.jpg')).toBeInTheDocument();
  });

  it('Card has data field No', () => {
    const data = {
      id: 1,
      desc: 'Angular XXX',
      firstReleaseMonth: 'Sep',
      firstReleaseYear: 2016,
      image: 'http://sdfsf.i_angular.jpg',
      lastReleaseDate: '2023-03-01',
      name: 'Angular',
      openSource: false,
      site: 'http://i_default.jpg',
      type: ['WEB framework', 'JS library'],
    };

    render(<Card {...data} />);
    expect(screen.getByText('No')).toBeInTheDocument();
  });
});
