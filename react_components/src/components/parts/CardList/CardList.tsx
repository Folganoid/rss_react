import React from 'react';
import CardHome, { ICardHome } from '../CardHome/CardHome';
import cl from './CardList.module.scss';

interface IProps {
  cardList: ICardHome[];
  setModal?: (card: ICardHome) => void;
}

export default function CardList(props: IProps) {
  return (
    <>
      <h1 className={cl.title}>
        Found <b>{props.cardList.length}</b> characters...
      </h1>
      <div className={cl.cards}>
        {props.cardList.map((el: ICardHome) => (
          <CardHome key={el.id} {...el} setModal={props.setModal} />
        ))}
      </div>
    </>
  );
}
