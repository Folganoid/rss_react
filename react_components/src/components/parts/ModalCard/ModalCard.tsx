import React, { MouseEvent } from 'react';
import cl from './ModalCard.module.scss';
import { ICardHome } from '../CardHome/CardHome';

interface IProps extends ICardHome {
  setModal: (arg: ICardHome | null) => void;
}

export default function ModalCard(props: IProps) {
  const closeHandler = (e: MouseEvent<HTMLElement>) => {
    if (e.target !== e.currentTarget) return;
    props.setModal(null);
  };

  return (
    <div className={cl.modal} onClick={closeHandler}>
      <article className={cl.modal__card}>
        <div className={cl.modal__body}>
          <img src={props.image} alt={props.name} className={cl.modal__image} />
          <h2 className={cl.modal__title}>{props.name}</h2>
          <button className={cl.close} onClick={closeHandler}>
            X
          </button>
        </div>
        <div className={cl.modal__desc}>
          <p>
            <b>Gender: </b>
            <span className={cl.grey}>{props.gender}</span>
          </p>
          <p>
            <b>Species: </b>
            <span className={cl.boldGrey}>{props.species}</span>
          </p>
          <hr />
          <p>
            <b>Created: </b> {props.created}
          </p>
          <p>
            <b>Type: </b> {props.type}
          </p>
          <hr />
          <p>
            <b>status: </b> {props.status}
          </p>
          <p>
            <b>URL: </b> <a href={props.url}>{props.url}</a>
          </p>
        </div>
      </article>
    </div>
  );
}
