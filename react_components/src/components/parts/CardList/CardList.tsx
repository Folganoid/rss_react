import React from 'react';
import CardHome, { ICardHome } from '../CardHome/CardHome';
import cl from './CardList.module.scss';

interface IProps {
  cardList: ICardHome[];
}

export default function CardList(props: IProps) {
  return (
    <div className={cl.cards}>
      {props.cardList.map((el: ICardHome) => (
        <CardHome key={el._id} {...el} />
      ))}
    </div>
  );
}
