import Input from '../../components/UI/Input';
import React, { KeyboardEvent, useEffect, useMemo, useState } from 'react';
import cl from './Home.module.scss';
import CardList from '../../components/parts/CardList/CardList';
import useLoadDataCards from '../../hooks/useLoadCardData';
import ModalCard from '../../components/parts/ModalCard/ModalCard';
import { useAppDispatch, useAppSelector } from '../../hooks/rtk';
import { setSearch } from '../../store/searchSlice';
import Loader from '../../components/parts/Loader/Loader';
import ModalError from '../../components/parts/ModalError/ModalError';

export default function Home() {
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.search.search);
  const isLoading = useAppSelector((state) => state.loader.isLoading);
  const errors = useAppSelector((state) => state.errors.errors);

  const [modal, setModal] = useState(0);
  const { cardsList, loadDataByName } = useLoadDataCards();

  const getCardList = useMemo(() => {
    return <CardList cardList={cardsList} setModal={setModal} />;
  }, [cardsList]);

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      loadDataByName(search);
    }
  };

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  useEffect(() => {
    if (search === '' && cardsList.length === 0) loadDataByName('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={[cl.main, 'main'].join(' ')}>
      {isLoading && <Loader />}
      {errors.length ? <ModalError errors={errors} /> : ''}
      {modal > 0 && <ModalCard id={modal} setModal={setModal} />}
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
      {cardsList.length ? getCardList : <h1 className={cl.notFound}>Characters not found...</h1>}
    </main>
  );
}
