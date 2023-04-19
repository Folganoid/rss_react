import React from 'react';
import cl from './CardHome.module.scss';
import unknownImg from '@/images/unknown.svg';
import maleImg from '@/images/male.png';
import femaleImg from '@/images/female.png';

export interface ICardHome {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  created: string;
  url: string;
}

export interface ICardHomeWithSets extends ICardHome {
  setModal: (id: number) => void;
}

export default function CardHome(props: ICardHomeWithSets) {
  let image = unknownImg;
  if (props.gender?.toLocaleLowerCase() === 'female') {
    image = femaleImg;
  }
  if (props.gender?.toLocaleLowerCase() === 'male') {
    image = maleImg;
  }

  const cardHandler = () => {
    props.setModal(props.id);
  };

  return (
    <article className={cl.card} onClick={cardHandler}>
      <img src={image} alt={props.name} className={cl.card__image} />
      <div className={cl.card__body}>
        <h2 className={cl.card__title}>{props.name}</h2>
        <div className={cl.card__desc}>
          <p>
            <b>Gender: </b>
            <span className={cl.grey}>{props.gender}</span>
          </p>
          <p>
            <b>Species: </b>
            <span className={cl.boldGrey}>{props.species}</span>
          </p>
        </div>
      </div>
    </article>
  );
}
