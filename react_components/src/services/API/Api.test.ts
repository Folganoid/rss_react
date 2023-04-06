import Api from './Api';
import { describe, it, vi, test } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';

describe('Home', () => {
  const fetchMocker = createFetchMock(vi);
  fetchMocker.enableMocks();
  const data = `{"info":{"count":1,"pages":2,"next":"http://example.com/lkl/character?name=correct&page=2","prev":null},"results":[{"id":735,"name":"Foal Sanchez","status":"Alive","species":"Humanoid","type":"CHUD Human Mix","gender":"unknown","origin":{"name":"Earth (Replacement Dimension)","url":"https://rickandmortyapi.com/api/location/20"},"location":{"name":"Earth (Replacement Dimension)","url":"https://rickandmortyapi.com/api/location/20"},"image":"https://rickandmortyapi.com/api/character/avatar/735.jpeg","episode":["https://rickandmortyapi.com/api/episode/45"],"url":"https://rickandmortyapi.com/api/character/735","created":"2021-10-17T12:08:38.935Z"}]}`;
  const data2 = `{"info":{"count":1,"pages":2,"next":null,"prev":null},"results":[{"id":7342,"name":"Foal Sanchez2","status":"Alive2","species":"Humanoid2","type":"CHUD Human Mix2","gender":"unknown","origin":{"name":"Earth (Replacement Dimension)","url":"https://rickandmortyapi.com/api/location/20"},"location":{"name":"Earth (Replacement Dimension)","url":"https://rickandmortyapi.com/api/location/20"},"image":"https://rickandmortyapi.com/api/character/avatar/735.jpeg","episode":["https://rickandmortyapi.com/api/episode/45"],"url":"https://rickandmortyapi.com/api/character/7352","created":"2021-10-17T12:01:38.935Z"}]}`;
  const data3 = `{"id":1,"name":"xxx"}`;

  beforeEach(() => {
    fetchMocker.mockIf(/^https?:\/\/example.com.*$/, (req) => {
      if (req.url.endsWith('/character?name=incorrectJSON')) {
        return {
          body: '{lkjlkj}',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        };
      } else if (req.url.endsWith('/character?name=correct')) {
        return {
          body: data,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        };
      } else if (req.url.endsWith('/character?name=badData')) {
        return {
          body: '{"kjkj":1111}',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        };
      } else if (req.url.endsWith('/character?name=empty')) {
        return {
          body: '{"error":"There is nothing here"}',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        };
      } else if (req.url.endsWith('/character?name=correct&page=2')) {
        return {
          body: data2,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        };
      } else if (req.url.endsWith('/character/1')) {
        return {
          body: data3,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        };
      } else if (req.url.endsWith('/character/999')) {
        return {
          body: `{"ddd":null}`,
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
  });

  it('Api got correct character list data', async () => {
    const api = new Api('http://example.com/lkl');
    const res = await api.getCharacterByName('correct');
    expect(JSON.stringify([JSON.parse(data).results, JSON.parse(data2).results].flat())).toEqual(
      JSON.stringify(res)
    );
  });

  test('Api got incorrect json', async () => {
    const api = new Api('http://example.com/lkl');
    await expect(() => api.getCharacterByName('incorrectJSON')).rejects.toThrowError(/json/);
  });

  test('Api got incorrect json', async () => {
    const api = new Api('http://example.com/kkk');
    const res = await api.getCharacterByName('empty');
    expect(res.length).toEqual(0);
  });

  test('Api got incorrect response', async () => {
    const api = new Api('http://kkk');
    await expect(() => api.getCharacterByName('incorrectName')).rejects.toThrowError(/ENOTFOUND/i);
  });

  test('Api got incorrect data', async () => {
    const api = new Api('http://example.com/lkl');
    await expect(() => api.getCharacter('badData')).rejects.toThrowError(/API/i);
  });

  test('Api get char by id', async () => {
    const api = new Api('http://example.com/lkl');
    const res = await api.getCharacterById(1);
    expect(JSON.stringify(JSON.parse(data3))).toEqual(JSON.stringify(res));
  });
  test('Api get char by bad id', async () => {
    const api = new Api('http://example.com/lkl');
    await expect(() => api.getCharacterById(1000)).rejects.toThrowError(/json/i);
  });
  test('Api get incorrect response', async () => {
    const api = new Api('http://example.com/lkl');
    await expect(() => api.getCharacterById(999)).rejects.toThrowError(/API/i);
  });
});
