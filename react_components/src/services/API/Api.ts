import { ICardHome } from '../../components/parts/CardHome/CardHome';

export default class Api {
  path: string;
  headers: {
    'Content-Type': string;
  };

  constructor(path: string) {
    this.path = path;
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  getCharacter(name = '', page = 1) {
    return fetch(`${this.path}/character?name=${name}${page > 1 ? `&page=${page}` : ''}`, {
      headers: this.headers,
    })
      .then((res) => res.json())
      .then((data) => {
        const next = data && data.info && data.info.next;
        if (data && data.results) return [data.results, next];
        if (data && data.error && data.error === 'There is nothing here') {
          return [[], false];
        }
        throw new Error('Something wrong with API... Try connect with support.');
      })
      .catch((err: Error) => {
        throw new Error(err.message);
      });
  }

  async getCharacterByName(name = ''): Promise<ICardHome[] | never> {
    try {
      let arr: ICardHome[] = [];
      for (let page = 1; ; page++) {
        const res = await this.getCharacter(name, page);
        if (res[0] && res[0].length) {
          arr = [...arr, ...res[0]];
        }
        if (!res || !res[1] || !res[0].length || page > 50) break;
      }
      return arr;
    } catch (err) {
      throw err;
    }
  }

  getCharacterById(id = ''): Promise<ICardHome | never> {
    return fetch(`${this.path}/character/${id}`, { headers: this.headers })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.id) return data;
        throw new Error('Something wrong with API... Try connect with support.');
      })
      .catch((err: Error) => {
        throw new Error(err.message);
      });
  }
}
