import Input from '../../components/UI/Input';
import React, { KeyboardEvent, useEffect, useMemo, useState } from 'react';
import cl from './Home.module.scss';
import Loader from '../../components/parts/Loader/Loader';
import CardList from '../../components/parts/CardList/CardList';
import ModalError from '../../components/parts/ModalError/ModalError';
import useLoadDataCards from '../../hooks/LoadCardData';

export default function Home() {
  const [search, setSearch] = useState<string>(localStorage.getItem('search') || '');
  const { data, errors, isLoading, loadData } = useLoadDataCards();
  const getCardList = useMemo(() => {
    return <CardList cardList={data} />;
  }, [data]);

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && localStorage.getItem('search') !== search) {
      localStorage.setItem('search', search);
      loadData(search);
    }
  };

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match(/^[a-zA-Z]*$/)) setSearch(e.target.value);
  };

  useEffect(() => {
    loadData(localStorage.getItem('search') || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={[cl.main, 'main'].join(' ')}>
      {errors.length ? <ModalError errors={errors} /> : ''}
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
      {data.length ? getCardList : <h1 className={cl.notFound}>Characters not found...</h1>}
    </main>
  );
}
