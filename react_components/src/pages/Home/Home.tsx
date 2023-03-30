import Input from '../../components/UI/Input';
import React, { KeyboardEvent, useState } from 'react';
import cl from './Home.module.scss';
import Api from '../../services/API/Api';

export default function Home() {
  const [search, setSearch] = useState(localStorage.getItem('search') || '');
  const ApiService = new Api();

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      localStorage.setItem('search', search);
      const data = await ApiService.getCharacterByName(search);
      console.log(data);
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
      <div className={cl.main__cards}></div>
    </main>
  );
}
