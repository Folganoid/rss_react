import Input from '../../components/UI/Input';
import React, { KeyboardEvent, useEffect, useState } from 'react';
import cl from './Home.module.scss';
import CardList from '../../components/parts/CardList/CardList';
import ModalCard from '../../components/parts/ModalCard/ModalCard';
import { useAppDispatch, useAppSelector } from '../../hooks/rtk';
import { setName, setPage } from '../../store/searchSlice';
import Loader from '../../components/parts/Loader/Loader';
import ModalError from '../../components/parts/ModalError/ModalError';
import { cardsApi } from '../../services/CardsService';
import { addError, delError } from '../../store/errorsSlice';
import { setIsLoading } from '../../store/loaderSlice';
import Select from '../../components/UI/Select';

export default function Home() {
  const dispatch = useAppDispatch();
  const name = useAppSelector((state) => state.search.name);
  const page = useAppSelector((state) => state.search.page);
  const spinner = useAppSelector((state) => state.loader.isLoading);
  const [searchVal, setSearchVal] = useState(name);
  const [modal, setModal] = useState(0);
  const errors = useAppSelector((state) => state.errors.errors);
  const { data, error, isFetching } = cardsApi.useFetchCardsQuery({
    name: name,
    page: page,
  });

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(setName(searchVal));
      dispatch(setPage(1));
    }
  };

  const handlerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match(/^[a-zA-Z]*$/)) {
      setSearchVal(e.target.value);
    }
  };

  const handlerSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setPage(+e.target.value));
  };

  useEffect(() => {
    dispatch(setIsLoading(isFetching));
  }, [isFetching, dispatch]);

  const pages: { name: string; value: string }[] = [];
  if (data?.info?.pages) {
    for (let i = 1; i <= data?.info.pages; i++) {
      pages.push({ name: String(i), value: String(i) });
    }
  }

  useEffect(() => {
    if (error) {
      if (JSON.stringify(error) === '{"status":404,"data":{"error":"There is nothing here"}}')
        return;
      dispatch(addError('Error: something wrong with API...'));
      setTimeout(() => dispatch(delError()), 5000);
    }
  }, [error, dispatch]);

  return (
    <main className={[cl.main, 'main'].join(' ')}>
      {spinner && <Loader />}
      {errors.length ? <ModalError errors={errors} /> : ''}
      {modal > 0 && <ModalCard id={modal} setModal={setModal} />}
      <h1 className={cl.main__title}>Home page</h1>
      <br />
      <div className={cl.main__search}>
        <span className={cl.main__label}>Search: </span>
        <Input
          placeholder={'Latin letters only'}
          onKeyDown={handleKeyDown}
          onChange={handlerInputChange}
          value={searchVal}
        />
        <br />
        <span className={cl.main__label}>Page: </span>
        <Select options={pages} onChange={handlerSelectChange} value={String(page)}></Select>
      </div>
      {!error && !spinner && data?.results && data.results.length > 0 ? (
        <>
          <h1 className={cl.title}>
            Found <b>{data.info.count}</b> characters... Page <b>{page} </b>
            of <b>{data.info.pages}</b>
          </h1>
          <CardList cardList={data.results} setModal={setModal} />
        </>
      ) : (
        <h1 className={cl.title}>Characters not found...</h1>
      )}
    </main>
  );
}
