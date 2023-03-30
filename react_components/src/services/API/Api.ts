export default class Api {
  path: string;
  headers: {
    'Content-Type': string;
    Authorization: string;
  };

  constructor() {
    this.path = import.meta.env.VITE_API_PATH;
    this.headers = {
      'Content-Type': 'application/json',
      Authorization: import.meta.env.VITE_API_KEY,
    };
  }

  getCharacterByName(name = '', limit = 0): Promise<string> | never {
    return fetch(
      `${this.path}/character${name ? `?name=/${name}/` : ''}${limit > 0 ? `?limit=${limit}` : ''}`,
      { headers: this.headers }
    )
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((err: Error) => {
        throw err;
      });
  }
}
