import React from 'react';
import cl from './Card.module.scss';

export interface ICard {
  id: number;
  image: string;
  name: string;
  desc: string;
  openSource: boolean;
  type: string[];
  site: string;
  firstReleaseYear: number;
  firstReleaseMonth: string;
  lastReleaseDate: string;
}

export default function Card(props: ICard) {
  let image = `${import.meta.env.VITE_IMAGES_DIR}${props.image}`;
  if (props.image.includes('http')) {
    image = props.image;
  }

  return (
    <article className={cl.card}>
      <img src={image} alt={props.name} className={cl.card__image} />
      <div className={cl.card__body}>
        <h2 className={cl.card__title}>{props.name}</h2>
        <p className={cl.card__type}>
          Type:&nbsp;
          <b>{props.type.join(', ')}</b>
        </p>
        <p className={cl.card__release}>
          First release:&nbsp;
          <b>{props.firstReleaseYear + ' - ' + props.firstReleaseMonth}</b>
        </p>
        <p className={cl.card__release}>
          Last release:&nbsp;
          <b>{props.lastReleaseDate}</b>
        </p>
        <p className={cl.card__license}>
          Is open source:&nbsp;<b>{props.openSource ? 'Yes' : 'No'}</b>
        </p>
        <p className={cl.card__site}>
          Site:&nbsp;
          <a href={props.site}>{props.site}</a>
        </p>
      </div>
      <p className={cl.card__desc}>{props.desc}</p>
    </article>
  );
}
