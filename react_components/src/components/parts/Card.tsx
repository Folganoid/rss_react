import React, { Component } from 'react';
import { CardType } from '../../types/CardType';
import cl from './Card.module.scss';

export class Card extends Component<CardType, object> {
  render() {
    return (
      <article className={cl.card}>
        <img
          src={`${import.meta.env.VITE_IMAGES_DIR}${this.props.data.image}`}
          alt={this.props.data.name}
          className={cl.card__image}
        />
        <div className={cl.card__body}>
          <h2 className={cl.card__title}>{this.props.data.name}</h2>
          <p className={cl.card__year}>
            First release:&nbsp;
            <b>{this.props.data.year}</b>
          </p>
          <p className={cl.card__license}>
            License:&nbsp;<b>{this.props.data.license}</b>
          </p>
          <p className={cl.card__site}>
            Site:&nbsp;
            <a href={this.props.data.site}>{this.props.data.site}</a>
          </p>
        </div>
        <p className={cl.card__desc}>{this.props.data.desc}</p>
      </article>
    );
  }
}

export default Card;
