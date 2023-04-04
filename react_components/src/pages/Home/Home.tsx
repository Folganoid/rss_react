import Input from '../../components/UI/Input';
import React, { KeyboardEvent, useEffect, useMemo, useState } from 'react';
import cl from './Home.module.scss';
import Loader from '../../components/parts/Loader/Loader';
import CardList from '../../components/parts/CardList/CardList';
import ModalError from '../../components/parts/ModalError/ModalError';
import useLoadDataCards from '../../hooks/useLoadCardData';
import { ICardHome } from '../../components/parts/CardHome/CardHome';
import ModalCard from '../../components/parts/ModalCard/ModalCard';

export default function Home() {
  const [search, setSearch] = useState<string>(localStorage.getItem('search') || '');
  const [modal, setModal] = useState<ICardHome | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data, errors, loadDataByName } = useLoadDataCards(setIsLoading);

  const getCardList = useMemo(() => {
    return <CardList cardList={data} setModal={setModal} setIsLoading={setIsLoading} />;
  }, [data]);

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      localStorage.setItem('search', search);
      loadDataByName(search);
    }
  };

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match(/^[a-zA-Z]*$/)) setSearch(e.target.value);
  };

  useEffect(() => {
    loadDataByName(localStorage.getItem('search') || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={[cl.main, 'main'].join(' ')}>
      {errors.length ? <ModalError errors={errors} /> : ''}
      {isLoading && <Loader />}
      {modal && <ModalCard {...modal} setModal={setModal} />}
      <h1 className={cl.main__title}>Home page</h1>
      <br />
      <h2 className={cl.main__title}>Let&apos;s search Rick & Morty characters by name...</h2>
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
