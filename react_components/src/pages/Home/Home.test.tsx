import React from 'react';
import { describe, it, vi } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Home from './Home';

describe('Home', () => {
  it('Home the main tags exists', () => {
    render(<Home />);
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getAllByRole('heading').length).toEqual(3);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});

describe('Home integration', () => {
  const fetchMocker = createFetchMock(vi);
  fetchMocker.enableMocks();
  const data = `{"info":{"count":3,"pages":1,"next":null,"prev":null},"results":[{"id":98,"name":"Hepatitis A","status":"Dead","species":"Disease","type":"","gender":"unknown","origin":{"name":"Anatomy Park","url":"https://rickandmortyapi.com/api/location/5"},"location":{"name":"Anatomy Park","url":"https://rickandmortyapi.com/api/location/5"},"image":"https://rickandmortyapi.com/api/character/avatar/98.jpeg","episode":["https://rickandmortyapi.com/api/episode/3"],"url":"https://rickandmortyapi.com/api/character/98","created":"2017-12-01T12:01:43.742Z"},{"id":99,"name":"Hepatitis C","status":"Dead","species":"Disease","type":"","gender":"unknown","origin":{"name":"Anatomy Park","url":"https://rickandmortyapi.com/api/location/5"},"location":{"name":"Anatomy Park","url":"https://rickandmortyapi.com/api/location/5"},"image":"https://rickandmortyapi.com/api/character/avatar/99.jpeg","episode":["https://rickandmortyapi.com/api/episode/3"],"url":"https://rickandmortyapi.com/api/character/99","created":"2017-12-01T12:02:00.935Z"},{"id":556,"name":"Hephaestus","status":"Alive","species":"Mythological Creature","type":"God","gender":"Male","origin":{"name":"Mount Olympus","url":"https://rickandmortyapi.com/api/location/90"},"location":{"name":"Heistotron Base","url":"https://rickandmortyapi.com/api/location/89"},"image":"https://rickandmortyapi.com/api/character/avatar/556.jpeg","episode":["https://rickandmortyapi.com/api/episode/34"],"url":"https://rickandmortyapi.com/api/character/556","created":"2020-05-07T10:19:57.456Z"}]}`;
  const data3 = `{"id":99,"name":"Hepatitis C","status":"Dead","species":"Disease","type":"","gender":"unknown","origin":{"name":"Anatomy Park","url":"https://rickandmortyapi.com/api/location/5"},"location":{"name":"Anatomy Park","url":"https://rickandmortyapi.com/api/location/5"},"image":"https://rickandmortyapi.com/api/character/avatar/99.jpeg","episode":["https://rickandmortyapi.com/api/episode/3"],"url":"https://rickandmortyapi.com/api/character/99","created":"2017-12-01T12:02:00.935Z"}`;

  fetchMocker.mockIf(/^https?:\/\/.*$/, (req) => {
    if (req.url.endsWith('/character?name=hep')) {
      return {
        body: data,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      };
    } else if (req.url.endsWith('/character/99')) {
      return {
        body: data3,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      };
    } else {
      return {
        status: 404,
        body: 'Not Found',
      };
    }
  });

  it('Home searching', async () => {
    render(<Home />);
    const inp = screen.getByRole('textbox') as HTMLInputElement;

    await waitFor(async () => fireEvent.change(inp, { target: { value: 'hep' } }));
    expect(inp.value).toEqual('hep');
    const articles = screen.queryAllByRole('article');
    expect(articles).toHaveLength(0);
    expect(screen.getByText(/not found/i)).toBeInTheDocument();

    await waitFor(async () =>
      fireEvent.keyDown(inp, { key: 'Enter', code: 'Enter', charCode: 13 })
    );

    // got 3 articles
    expect(screen.getAllByRole('article').length).toEqual(3);
    expect(screen.queryByText(/not found/i)).not.toBeInTheDocument();

    //click card
    await waitFor(async () => fireEvent.click(screen.queryAllByRole('img')[1]));
    expect(screen.getAllByRole('article').length).toEqual(4);
    const btn = screen.getByText('X');
    expect(btn).toBeInTheDocument();
    expect(screen.getByText('Dead')).toBeInTheDocument();

    //click close
    await waitFor(async () => fireEvent.click(btn));
    expect(screen.getAllByRole('article').length).toEqual(3);
  });
});
