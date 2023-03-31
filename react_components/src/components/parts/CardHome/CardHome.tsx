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
}

export default function CardHome(props: ICardHome) {
  let image = `${import.meta.env.VITE_IMAGES_DIR}unknown.svg`;
  if (props.gender?.toLocaleLowerCase() === 'female') {
    image = `${import.meta.env.VITE_IMAGES_DIR}female.png`;
  }
  if (props.gender?.toLocaleLowerCase() === 'male') {
    image = `${import.meta.env.VITE_IMAGES_DIR}male.png`;
  }

  return (
    <article className={cl.card}>
      <img src={image} alt={props.name} className={cl.card__image} />
      <div className={cl.card__body}>
        <h2 className={cl.card__title}>{props.name}</h2>
      </div>
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
            <a href={props.wikiUrl}>
              {props.wikiUrl.length > 30 ? props.wikiUrl.substring(0, 27) + '...' : props.wikiUrl}
            </a>
          )}
        </p>
      </div>
    </article>
  );
}
