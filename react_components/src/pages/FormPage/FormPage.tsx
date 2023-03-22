import React from 'react';
import cl from './FormPage.module.scss';
import FormAddCard from '../../components/parts/FormAddCard/FormAddCard';
import Card, { ICard } from '../../components/parts/Card/Card';
import clCard from '../Home/Home.module.scss';
import ModalOk from '../../components/parts/ModalOk/ModalOk';

interface IState {
  cards: ICard[];
  showModalOk: boolean;
}

export default class FormPage extends React.Component<object, IState> {
  constructor(props: object) {
    super(props);
    this.state = {
      cards: [],
      showModalOk: false,
    };

    this.addCard = this.addCard.bind(this);
  }

  controlModalOk = (show: boolean) => {
    this.setState({ showModalOk: show });
  };

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
        <ModalOk
          title={'Card created successfully!'}
          control={this.controlModalOk}
          show={this.state.showModalOk}
        />
        <FormAddCard addCard={this.addCard} controlModalOk={this.controlModalOk} />
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
