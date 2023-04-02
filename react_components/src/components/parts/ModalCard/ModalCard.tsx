import React from 'react';
import cl from './ModalCard.module.scss';
import { ICardHome } from '../CardHome/CardHome';

interface IProps extends ICardHome {
  setModal: (arg: ICardHome | null) => void;
}

export default function ModalCard(props: IProps) {
  let image = `${import.meta.env.VITE_IMAGES_DIR}unknown.svg`;
  if (props.gender?.toLocaleLowerCase() === 'female') {
    image = `${import.meta.env.VITE_IMAGES_DIR}female.png`;
  }
  if (props.gender?.toLocaleLowerCase() === 'male') {
    image = `${import.meta.env.VITE_IMAGES_DIR}male.png`;
  }

  const closeHandler = () => {
    props.setModal(null);
  };

  return (
    <div className={cl.modal} onClick={closeHandler}>
      <article className={cl.modal__card}>
        <div className={cl.modal__body}>
          <img src={image} alt={props.name} className={cl.modal__image} />
          <h2 className={cl.modal__title}>{props.name}</h2>
          <button className={cl.close} onClick={closeHandler}>
            X
          </button>
        </div>
        <div className={cl.modal__desc}>
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
          <hr />
          <p>
            <b>Birth: </b> {!props.birth || props.birth?.includes('NaN') ? '?' : props.birth}
          </p>
          <p>
            <b>Death: </b> {!props.death || props.death?.includes('NaN') ? '?' : props.death}
          </p>
          <hr />
          <p>
            <b>Height: </b> {!props.height || props.height?.includes('NaN') ? '?' : props.height}
          </p>
          <p>
            <b>Hair: </b> {!props.hair || props.hair?.includes('NaN') ? '?' : props.hair}
          </p>
          <p>
            <b>Spouse: </b> {!props.spouse || props.spouse?.includes('NaN') ? '?' : props.spouse}
          </p>
          <p>
            <b>Realm: </b> {!props.realm || props.realm?.includes('NaN') ? '?' : props.realm}
          </p>
          <hr />
          <p>
            <b>Wiki url: </b>
            {!props.wikiUrl || props.wikiUrl?.includes('NaN') ? (
              '?'
            ) : (
              <a href={props.wikiUrl}>{props.wikiUrl}</a>
            )}
          </p>
        </div>
      </article>
    </div>
  );
}
