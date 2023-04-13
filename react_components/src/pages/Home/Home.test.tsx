import React from 'react';
import Home from './Home';
import createFetchMock from 'vitest-fetch-mock';
import store from '../../store';
import { Provider } from 'react-redux';
import { describe, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import {
  response1row,
  response3rows,
  responsePage1,
  responsePage2,
} from '../../data/rickAndMortyTestResponse';

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

  fetchMocker.mockIf(/^https?:\/\/.*$/, (req) => {
    if (req.url.endsWith('/character?name=hep&page=1')) {
      return {
        body: response3rows,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      };
    } else if (req.url.endsWith('/character/99')) {
      return {
        body: response1row,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      };
    } else if (req.url.endsWith('/character?name=ppp&page=1')) {
      return {
        body: responsePage1,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      };
    } else if (req.url.endsWith('/character?name=ppp&page=2')) {
      return {
        body: responsePage2,
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
