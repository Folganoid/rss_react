import React from 'react';
import cl from './CardHome.module.scss';

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
  let image = `${import.meta.env.VITE_IMAGES_DIR}unknown.svg`;
  if (props.gender?.toLocaleLowerCase() === 'female') {
    image = `${import.meta.env.VITE_IMAGES_DIR}female.png`;
  }
  if (props.gender?.toLocaleLowerCase() === 'male') {
    image = `${import.meta.env.VITE_IMAGES_DIR}male.png`;
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
