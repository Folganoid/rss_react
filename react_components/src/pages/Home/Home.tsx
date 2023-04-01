import Input from '../../components/UI/Input';
import React, { KeyboardEvent, useEffect, useMemo, useState } from 'react';
import cl from './Home.module.scss';
import Api from '../../services/API/Api';
import { ICardHome } from '../../components/parts/CardHome/CardHome';
import Loader from '../../components/parts/Loader/Loader';
import CardList from '../../components/parts/CardList/CardList';

export default function Home() {
  const [search, setSearch] = useState<string>(localStorage.getItem('search') || '');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<ICardHome[]>([]);

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && localStorage.getItem('search') !== search) {
      localStorage.setItem('search', search);
      loadData(search);
    }
  };

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match(/^[a-zA-Z]*$/)) setSearch(e.target.value);
  };

  const loadData = async (src: string) => {
    try {
      setIsLoading(true);
      const ApiService = new Api();
      const res = await ApiService.getCharacterByName(src);
      if (res) setData(res);
    } catch (err) {
      console.log('Error: something wrong with API...');
    } finally {
      setIsLoading(false);
    }
  };

  const getCardList = useMemo(() => {
    return <CardList cardList={data} />;
  }, [data]);

  useEffect(() => {
    loadData(localStorage.getItem('search') || '');
  }, []);

  return (
    <main className={[cl.main, 'main'].join(' ')}>
      {isLoading && <Loader />}
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
      {getCardList}
    </main>
  );
}
