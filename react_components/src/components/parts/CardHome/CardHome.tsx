import React from 'react';
import cl from './CardHome.module.scss';

export interface ICardHome {
  _id: string;
  height?: string;
  race?: string;
  gender?: string;
  birth?: string;
  spouse?: string;
  death?: string;
  realm?: string;
  hair?: string;
  name: string;
  wikiUrl?: string;
  setModal?: (card: ICardHome) => void;
}

export default function CardHome(props: ICardHome) {
  let image = `${import.meta.env.VITE_IMAGES_DIR}unknown.svg`;
  if (props.gender?.toLocaleLowerCase() === 'female') {
    image = `${import.meta.env.VITE_IMAGES_DIR}female.png`;
  }
  if (props.gender?.toLocaleLowerCase() === 'male') {
    image = `${import.meta.env.VITE_IMAGES_DIR}male.png`;
  }

  const cardHandler = () => {
    if (props.setModal) props.setModal(props);
  };

  return (
    <article className={cl.card} onClick={cardHandler}>
      <img src={image} alt={props.name} className={cl.card__image} />
      <div className={cl.card__body}>
        <h2 className={cl.card__title}>{props.name}</h2>
        <div className={cl.card__desc}>
          <p>
            <b>Gender: </b>
            <span className={cl.grey}>
              {!props.gender || props.gender?.includes('NaN') ? '?' : props.gender}
            </span>
          </p>
          <p>
            <b>Race: </b>
            <span className={cl.boldGrey}>
              {!props.race || props.race?.includes('NaN') ? '?' : props.race}
            </span>
          </p>
        </div>
      </div>
    </article>
  );
}
