import Input from '../../components/UI/Input';
import React, { KeyboardEvent, useEffect, useMemo, useState } from 'react';
import cl from './Home.module.scss';
import CardList from '../../components/parts/CardList/CardList';
import useLoadDataCards from '../../hooks/useLoadCardData';
import { ICardHome } from '../../components/parts/CardHome/CardHome';
import ModalCard from '../../components/parts/ModalCard/ModalCard';
import { useAppDispatch, useAppSelector } from '../../hooks/rtk';
import { setSearch } from '../../store/searchSlice';

export default function Home() {
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.search.search);
  const [modal, setModal] = useState<ICardHome | null>(null);
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
      {cardsList.length ? getCardList : <h1 className={cl.notFound}>Characters not found...</h1>}
    </main>
  );
}
