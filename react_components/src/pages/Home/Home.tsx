import Input from '../../components/UI/Input';
import React, { useEffect, useRef } from 'react';
import Card, { ICard } from '../../components/parts/Card/Card';
import cl from './Home.module.scss';

export default function Home(props: { data: ICard[] }) {
  const inputRef: React.RefObject<HTMLInputElement> = useRef(null);
  let val = inputRef.current?.value;
  const changeSearch = (): void => {
    if (inputRef && inputRef.current) val = inputRef.current.value;
  };

  useEffect(() => {
    return () => {
      if (val) localStorage.setItem('search', val);
      if (val === '') localStorage.setItem('search', '');
    };
  }, [val]);

  return (
    <main className={[cl.main, 'main'].join(' ')}>
      <h1 className={cl.main__title}>Home page</h1>
      <div className={cl.main__search}>
        <br />
        <Input
          placeholder={'Search'}
          onChange={changeSearch}
          ref={inputRef}
          defaultValue={localStorage.getItem('search') || ''}
        />
      </div>
      <div className={cl.main__cards}>
        {props.data.map((el) => {
          return <Card key={el.id} {...el} />;
        })}
      </div>
    </main>
  );
}
