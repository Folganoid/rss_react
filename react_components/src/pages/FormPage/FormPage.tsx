import React, { useState } from 'react';
import cl from './FormPage.module.scss';
import FormAddCard from '../../components/parts/FormAddCard/FormAddCard';
import Card from '../../components/parts/Card/Card';
import clCard from '../Home/Home.module.scss';
import ModalOk from '../../components/parts/ModalOk/ModalOk';
import { useAppSelector } from '../../hooks/rtk';

export default function FormPage() {
  const [showModalOk, setShowModalOk] = useState(false);
  const cards = useAppSelector((state) => state.form.cardList);

  const controlModalOk = (show: boolean) => {
    setShowModalOk(show);
  };

  return (
    <main className={cl.main}>
      <h1>Form page</h1>
      <br />
      <ModalOk title={'Card created successfully!'} control={controlModalOk} show={showModalOk} />
      <FormAddCard controlModalOk={controlModalOk} />
      <br />
      <div className={clCard.main__cards}>
        {cards.map((el) => {
          return <Card key={el.id} {...el} />;
        })}
      </div>
    </main>
  );
}
