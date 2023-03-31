import Input from '../../components/UI/Input';
import React, { KeyboardEvent, useState } from 'react';
import cl from './Home.module.scss';
import Api from '../../services/API/Api';
import CardHome, { ICardHome } from '../../components/parts/CardHome/CardHome';

export default function Home() {
  const [search, setSearch] = useState<string>(localStorage.getItem('search') || '');
  const [data, setData] = useState<ICardHome[]>([]);
  const ApiService = new Api();

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      try {
        localStorage.setItem('search', search);
        const res = await ApiService.getCharacterByName(search);
        if (res) setData(res);
      } catch (err) {
        console.log('Error: something wrong with API...');
      }
    }
  };

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match(/^[a-zA-Z]*$/)) setSearch(e.target.value);
  };

  return (
    <main className={[cl.main, 'main'].join(' ')}>
      <h1 className={cl.main__title}>Home page</h1>
      <br />
      <h2 className={cl.main__title}>Let&apos;s search Lord of the Rings characters by name...</h2>
      <div className={cl.main__search}>
        <br />
        <Input
          placeholder={'Latin letters only'}
          onKeyDown={handleKeyDown}
          onChange={handlerChange}
          value={search}
        />
      </div>
      <div className={cl.main__cards}>
        {data.map((el: ICardHome) => (
          <CardHome key={el._id} {...el} />
        ))}
      </div>
    </main>
  );
}
