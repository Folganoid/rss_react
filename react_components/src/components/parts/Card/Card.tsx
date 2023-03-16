import React, { Component } from 'react';
import { ICard } from '../../interfaces/common';
import cl from './Card.module.scss';

export default class Card extends Component<ICard, object> {
  render() {
    return (
      <article className={cl.card}>
        <img
          src={`${import.meta.env.VITE_IMAGES_DIR}${this.props.image}`}
          alt={this.props.name}
          className={cl.card__image}
        />
        <div className={cl.card__body}>
          <h2 className={cl.card__title}>{this.props.name}</h2>
          <p className={cl.card__type}>
            Type:&nbsp;
            <b>{this.props.type.join(', ')}</b>
          </p>
          <p className={cl.card__release}>
            First release:&nbsp;
            <b>{this.props.firstReleaseYear + ' - ' + this.props.firstReleaseMonth}</b>
          </p>
          <p className={cl.card__release}>
            Last release:&nbsp;
            <b>{this.props.lastReleaseDate}</b>
          </p>
          <p className={cl.card__license}>
            Is open source:&nbsp;<b>{this.props.openSource ? 'Yes' : 'No'}</b>
          </p>
          <p className={cl.card__site}>
            Site:&nbsp;
            <a href={this.props.site}>{this.props.site}</a>
          </p>
        </div>
        <p className={cl.card__desc}>{this.props.desc}</p>
      </article>
    );
  }
}
