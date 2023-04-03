import Api from './Api';
import { describe, it, vi, test } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';

describe('Home', () => {
  const fetchMocker = createFetchMock(vi);
  fetchMocker.enableMocks();
  const data = `{"docs":[{"_id":"5cd99d4bde30eff6ebccfd12","height":"","race":"Hobbit","gender":"Male","birth":"TA 2969","spouse":"","death":"","realm":"","hair":"","name":"Halfred Gamgee","wikiUrl":"http://lotr.wikia.com//wiki/Halfred_Gamgee"},{"_id":"5cd99d4bde30eff6ebccfd35","height":"","race":"Hobbit","gender":"Male","birth":"TA 2851","spouse":"","death":"","realm":"","hair":"","name":"Halfred Greenhand","wikiUrl":"http://lotr.wikia.com//wiki/Halfred_Greenhand"}],"total":2,"limit":1000,"offset":0,"page":1,"pages":1}`;

  beforeEach(() => {
    fetchMocker.mockIf(/^https?:\/\/example.com.*$/, (req) => {
      if (req.url.endsWith('/character?name=/frr/i&limit=10')) {
        return '{"doc": []}';
      } else if (req.url.endsWith('/character?name=/fr/i')) {
        return {
          body: data,
          headers: {
            'X-Some-Response-Header': 'Some header value',
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

  it('Api got correct data', async () => {
    const api = new Api('http://example.com/lkl');
    const res = await api.getCharacterByName('fr');
    expect(JSON.stringify(JSON.parse(data).docs)).toEqual(JSON.stringify(res));
  });

  test('Api got incorrect json', async () => {
    const api = new Api('http://example.com/lkl');
    await expect(() => api.getCharacterByName('frr', 10)).rejects.toThrowError(/API/);
  });

  test('Api got incorrect response', async () => {
    const api = new Api('http://example.com/lkl');
    await expect(() => api.getCharacterByName('frlll')).rejects.toThrowError(/json/i);
  });
});
