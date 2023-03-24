import React, { useState } from 'react';
import cl from './FormPage.module.scss';
import FormAddCard from '../../components/parts/FormAddCard/FormAddCard';
import Card, { ICard } from '../../components/parts/Card/Card';
import clCard from '../Home/Home.module.scss';
import ModalOk from '../../components/parts/ModalOk/ModalOk';

export default function FormPage() {
  const [cards, setCards] = useState([] as ICard[]);
  const [showModalOk, setShowModalOk] = useState(false);

  const controlModalOk = (show: boolean) => {
    setShowModalOk(show);
  };

  const addCard = (card: ICard): void => {
    setCards([...cards, card]);
  };

  return (
    <main className={cl.main}>
      <h1>Form page</h1>
      <br />
      <ModalOk title={'Card created successfully!'} control={controlModalOk} show={showModalOk} />
      <FormAddCard addCard={addCard} controlModalOk={controlModalOk} />
      <br />
      <div className={clCard.main__cards}>
        {cards.map((el) => {
          return <Card key={el.id} {...el} />;
        })}
      </div>
    </main>
  );
}
