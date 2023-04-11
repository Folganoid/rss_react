import React from 'react';
import { describe, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import createFetchMock from 'vitest-fetch-mock';
import { Provider } from 'react-redux';
import store from './store';

describe('App', () => {
  it('App <nav> exists', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});

describe('Home integration errors', () => {
  const fetchMocker = createFetchMock(vi);
  fetchMocker.enableMocks();
  const data = `{"info":{"count":3,"pages":1,"next":null,"prev":null},"results":[{"id":1,"name":"Hepatitis A","status":"Dead","species":"Disease","type":"","gender":"unknown","origin":{"name":"Anatomy Park","url":"https://rickandmortyapi.com/api/location/5"},"location":{"name":"Anatomy Park","url":"https://rickandmortyapi.com/api/location/5"},"image":"https://rickandmortyapi.com/api/character/avatar/98.jpeg","episode":["https://rickandmortyapi.com/api/episode/3"],"url":"https://rickandmortyapi.com/api/character/98","created":"2017-12-01T12:01:43.742Z"},{"id":99,"name":"Hepatitis C","status":"Dead","species":"Disease","type":"","gender":"unknown","origin":{"name":"Anatomy Park","url":"https://rickandmortyapi.com/api/location/5"},"location":{"name":"Anatomy Park","url":"https://rickandmortyapi.com/api/location/5"},"image":"https://rickandmortyapi.com/api/character/avatar/99.jpeg","episode":["https://rickandmortyapi.com/api/episode/3"],"url":"https://rickandmortyapi.com/api/character/99","created":"2017-12-01T12:02:00.935Z"},{"id":556,"name":"Hephaestus","status":"Alive","species":"Mythological Creature","type":"God","gender":"Male","origin":{"name":"Mount Olympus","url":"https://rickandmortyapi.com/api/location/90"},"location":{"name":"Heistotron Base","url":"https://rickandmortyapi.com/api/location/89"},"image":"https://rickandmortyapi.com/api/character/avatar/556.jpeg","episode":["https://rickandmortyapi.com/api/episode/34"],"url":"https://rickandmortyapi.com/api/character/556","created":"2020-05-07T10:19:57.456Z"}]}`;
  const data99 = `{"id":99,"name":"Hepatitis C","status":"Dead","species":"Disease","type":"","gender":"unknown","origin":{"name":"Anatomy Park","url":"https://rickandmortyapi.com/api/location/5"},"location":{"name":"Anatomy Park","url":"https://rickandmortyapi.com/api/location/5"},"image":"https://rickandmortyapi.com/api/character/avatar/99.jpeg","episode":["https://rickandmortyapi.com/api/episode/3"],"url":"https://rickandmortyapi.com/api/character/99","created":"2017-12-01T12:02:00.935Z"}`;

  fetchMocker.mockIf(/^https?:\/\/.*$/, (req) => {
    if (req.url.endsWith('/character?name=&page=1')) {
      return {
        body: data,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      };
    } else if (req.url.endsWith('/character/99')) {
      return {
        body: data99,
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

  it('Home searching error', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    await waitFor(async () => fireEvent.click(screen.queryAllByRole('link')[1]));
    await waitFor(async () => fireEvent.click(screen.queryAllByRole('link')[0]));
    expect(screen.queryByText(/Error: /i)).not.toBeInTheDocument();
    expect(screen.getAllByRole('article').length).toEqual(3);

    await waitFor(async () => fireEvent.click(screen.queryAllByRole('img')[1]));
    expect(screen.queryAllByText(/Hepatitis C/i).length).toEqual(2);
  });
});
