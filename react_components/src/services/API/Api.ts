import { ICardHome } from '../../components/parts/CardHome/CardHome';

export default class Api {
  path: string;
  headers: {
    'Content-Type': string;
    Authorization: string;
  };

  constructor(path: string) {
    this.path = path;
    this.headers = {
      'Content-Type': 'application/json',
      Authorization: import.meta.env.VITE_API_KEY,
    };
  }

  getCharacterByName(name = '', limit = 0): Promise<ICardHome[] | never> {
    return fetch(
      `${this.path}/character${name ? `?name=/${name}/i` : ''}${
        limit > 0 ? `&limit=${limit}` : ''
      }`,
      { headers: this.headers }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.docs) return data.docs;
        throw new Error('Something wrong with API... Connect to the support.');
      })
      .catch((err: Error) => {
        throw new Error(err.message);
      });
  }
}
