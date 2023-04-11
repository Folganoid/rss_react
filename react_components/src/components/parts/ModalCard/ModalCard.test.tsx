import React from 'react';
import { describe, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import ModalCard from './ModalCard';
import { Provider } from 'react-redux';
import store from '../../../store';
import createFetchMock from 'vitest-fetch-mock';

describe('ModalCard', () => {
  const fetchMocker = createFetchMock(vi);
  fetchMocker.enableMocks();
  const data = `{"id":99,"name":"Hepatitis C","status":"Dead","species":"Disease","type":"","gender":"unknown","origin":{"name":"Anatomy Park","url":"https://rickandmortyapi.com/api/location/5"},"location":{"name":"Anatomy Park","url":"https://rickandmortyapi.com/api/location/5"},"image":"https://rickandmortyapi.com/api/character/avatar/99.jpeg","episode":["https://rickandmortyapi.com/api/episode/3"],"url":"https://rickandmortyapi.com/api/character/99","created":"2017-12-01T12:02:00.935Z"}`;

  fetchMocker.mockIf(/^https?:\/\/.*$/, (req) => {
    if (req.url.endsWith('/character/99')) {
      return {
        body: data,
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

  it('ModalCard has data fields', async () => {
    await waitFor(async () =>
      render(
        <Provider store={store}>
          <ModalCard id={99} setModal={vi.fn()} />
        </Provider>
      )
    );
    expect(screen.getByText('Hepatitis C')).toBeInTheDocument();
    expect(screen.getByText('Dead')).toBeInTheDocument();
    expect(screen.getByText('Disease')).toBeInTheDocument();
    expect(screen.getByText('https://rickandmortyapi.com/api/character/99')).toBeInTheDocument();
  });
});
