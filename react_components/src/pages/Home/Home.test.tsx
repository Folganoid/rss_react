import React from 'react';
import { describe, it, vi } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Home from './Home';
import { Provider } from 'react-redux';
import store from '../../store';

describe('Home', () => {
  it('Home the main tags exists', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getAllByRole('heading').length).toEqual(2);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});

describe('Home integration', () => {
  const fetchMocker = createFetchMock(vi);
  fetchMocker.enableMocks();
  const data = `{"info":{"count":3,"pages":1,"next":null,"prev":null},"results":[{"id":98,"name":"Hepatitis A","status":"Dead","species":"Disease","type":"","gender":"unknown","origin":{"name":"Anatomy Park","url":"https://rickandmortyapi.com/api/location/5"},"location":{"name":"Anatomy Park","url":"https://rickandmortyapi.com/api/location/5"},"image":"https://rickandmortyapi.com/api/character/avatar/98.jpeg","episode":["https://rickandmortyapi.com/api/episode/3"],"url":"https://rickandmortyapi.com/api/character/98","created":"2017-12-01T12:01:43.742Z"},{"id":99,"name":"Hepatitis C","status":"Dead","species":"Disease","type":"","gender":"unknown","origin":{"name":"Anatomy Park","url":"https://rickandmortyapi.com/api/location/5"},"location":{"name":"Anatomy Park","url":"https://rickandmortyapi.com/api/location/5"},"image":"https://rickandmortyapi.com/api/character/avatar/99.jpeg","episode":["https://rickandmortyapi.com/api/episode/3"],"url":"https://rickandmortyapi.com/api/character/99","created":"2017-12-01T12:02:00.935Z"},{"id":556,"name":"Hephaestus","status":"Alive","species":"Mythological Creature","type":"God","gender":"Male","origin":{"name":"Mount Olympus","url":"https://rickandmortyapi.com/api/location/90"},"location":{"name":"Heistotron Base","url":"https://rickandmortyapi.com/api/location/89"},"image":"https://rickandmortyapi.com/api/character/avatar/556.jpeg","episode":["https://rickandmortyapi.com/api/episode/34"],"url":"https://rickandmortyapi.com/api/character/556","created":"2020-05-07T10:19:57.456Z"}]}`;
  const data3 = `{"id":99,"name":"Hepatitis C","status":"Dead","species":"Disease","type":"","gender":"unknown","origin":{"name":"Anatomy Park","url":"https://rickandmortyapi.com/api/location/5"},"location":{"name":"Anatomy Park","url":"https://rickandmortyapi.com/api/location/5"},"image":"https://rickandmortyapi.com/api/character/avatar/99.jpeg","episode":["https://rickandmortyapi.com/api/episode/3"],"url":"https://rickandmortyapi.com/api/character/99","created":"2017-12-01T12:02:00.935Z"}`;
  const dataPage1 = `{"info":{"count":3,"pages":2,"next":"sdfs","prev":null},"results":[{"id":98,"name":"Hepatitis A","status":"Dead","species":"Disease","type":"","gender":"unknown","origin":{"name":"Anatomy Park","url":"https://rickandmortyapi.com/api/location/5"},"location":{"name":"Anatomy Park","url":"https://rickandmortyapi.com/api/location/5"},"image":"https://rickandmortyapi.com/api/character/avatar/98.jpeg","episode":["https://rickandmortyapi.com/api/episode/3"],"url":"https://rickandmortyapi.com/api/character/98","created":"2017-12-01T12:01:43.742Z"},{"id":99,"name":"Hepatitis C","status":"Dead","species":"Disease","type":"","gender":"unknown","origin":{"name":"Anatomy Park","url":"https://rickandmortyapi.com/api/location/5"},"location":{"name":"Anatomy Park","url":"https://rickandmortyapi.com/api/location/5"},"image":"https://rickandmortyapi.com/api/character/avatar/99.jpeg","episode":["https://rickandmortyapi.com/api/episode/3"],"url":"https://rickandmortyapi.com/api/character/99","created":"2017-12-01T12:02:00.935Z"},{"id":556,"name":"Hephaestus","status":"Alive","species":"Mythological Creature","type":"God","gender":"Male","origin":{"name":"Mount Olympus","url":"https://rickandmortyapi.com/api/location/90"},"location":{"name":"Heistotron Base","url":"https://rickandmortyapi.com/api/location/89"},"image":"https://rickandmortyapi.com/api/character/avatar/556.jpeg","episode":["https://rickandmortyapi.com/api/episode/34"],"url":"https://rickandmortyapi.com/api/character/556","created":"2020-05-07T10:19:57.456Z"}]}`;
  const dataPage2 = `{"info":{"count":3,"pages":2,"next":null,"prev":"dddd"},"results":[{"id":556,"name":"Hephaestus","status":"Alive","species":"Mythological Creature","type":"God","gender":"Male","origin":{"name":"Mount Olympus","url":"https://rickandmortyapi.com/api/location/90"},"location":{"name":"Heistotron Base","url":"https://rickandmortyapi.com/api/location/89"},"image":"https://rickandmortyapi.com/api/character/avatar/556.jpeg","episode":["https://rickandmortyapi.com/api/episode/34"],"url":"https://rickandmortyapi.com/api/character/556","created":"2020-05-07T10:19:57.456Z"}]}`;

  fetchMocker.mockIf(/^https?:\/\/.*$/, (req) => {
    if (req.url.endsWith('/character?name=hep&page=1')) {
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
    } else if (req.url.endsWith('/character?name=ppp&page=1')) {
      return {
        body: dataPage1,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      };
    } else if (req.url.endsWith('/character?name=ppp&page=2')) {
      return {
        body: dataPage2,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      };
    } else if (req.url.endsWith('/character?name=zzz&page=1')) {
      return {
        body: `{"error":"There is nothing here"}`,
        status: 404,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      };
    } else {
      return {
        status: 404,
        body: `null`,
      };
    }
  });

  it('Home searching', async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    const inp = screen.getByRole('textbox') as HTMLInputElement;

    await waitFor(async () => fireEvent.change(inp, { target: { value: 'hep' } }));
    expect(inp.value).toEqual('hep');
    const articles = screen.queryAllByRole('article');
    expect(articles).toHaveLength(0);
    expect(screen.getByText(/not found/i)).toBeInTheDocument();

    await waitFor(async () =>
      fireEvent.keyDown(inp, { key: 'Enter', code: 'Enter', charCode: 13 })
    );

    expect(screen.getAllByRole('article').length).toEqual(3);
    expect(screen.queryByText(/not found/i)).not.toBeInTheDocument();

    await waitFor(async () => fireEvent.click(screen.queryAllByRole('img')[1]));
    expect(screen.getAllByRole('article').length).toEqual(4);
    const btn = screen.getByText('X');
    expect(btn).toBeInTheDocument();
    expect(screen.getByText('Dead')).toBeInTheDocument();

    await waitFor(async () => fireEvent.click(btn));
    expect(screen.getAllByRole('article').length).toEqual(3);
  });

  it('Home searching 2', async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.queryAllByText(/Error:/i).length).toEqual(2);

    const inp = screen.getByRole('textbox') as HTMLInputElement;
    await waitFor(async () => fireEvent.change(inp, { target: { value: 'hep' } }));
    await waitFor(async () =>
      fireEvent.keyDown(inp, { key: 'Enter', code: 'Enter', charCode: 13 })
    );
    await waitFor(async () => fireEvent.click(screen.queryAllByRole('img')[0]));
    expect(screen.queryAllByText(/Error:/i).length).toEqual(3);
  });

  it('Home page changing', async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const inp = screen.getByRole('textbox') as HTMLInputElement;
    await waitFor(async () => fireEvent.change(inp, { target: { value: 'ppp' } }));
    await waitFor(async () =>
      fireEvent.keyDown(inp, { key: 'Enter', code: 'Enter', charCode: 13 })
    );
    expect(screen.getAllByRole('article').length).toEqual(3);
    const select = screen.getByRole('combobox');
    await waitFor(async () => fireEvent.change(select, { target: { value: '2' } }));
    expect(screen.getAllByRole('article').length).toEqual(1);

    await waitFor(async () => fireEvent.change(inp, { target: { value: '' } }));
    await waitFor(async () => fireEvent.change(inp, { target: { value: 'zzz' } }));
    await waitFor(async () => fireEvent.change(select, { target: { value: '1' } }));
    await waitFor(async () =>
      fireEvent.keyDown(inp, { key: 'Enter', code: 'Enter', charCode: 13 })
    );
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
});
