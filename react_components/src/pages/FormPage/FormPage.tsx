import React from 'react';
import cl from './FormPage.module.scss';
import FormAddCard from '../../components/parts/FormAddCard/FormAddCard';
import Card, { ICard } from '../../components/parts/Card/Card';
import clCard from '../Home/Home.module.scss';

export default class FormPage extends React.Component<object, { cards: ICard[] }> {
  constructor(props: object) {
    super(props);
    this.state = {
      cards: [],
    };

    this.addCard = this.addCard.bind(this);
  }

  addCard(card: ICard): void {
    this.setState({
      cards: [...this.state.cards, card],
    });
  }

  render() {
    return (
      <main className={cl.main}>
        <h1>Form page</h1>
        <br />
        <FormAddCard addCard={this.addCard} />
        <br />
        <div className={clCard.main__cards}>
          {this.state.cards.map((el) => {
            return <Card key={el.id} {...el} />;
          })}
        </div>
      </main>
    );
  }
}
