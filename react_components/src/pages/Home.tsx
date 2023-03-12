import Input from '../components/UI/Input';
import React from 'react';
import Card from '../components/parts/Card/Card';
import { CardEntity } from 'components/parts/Card/CardType';

export default class Home extends React.Component<{ data: CardEntity[] }, { search: string }> {
  state = {
    search: localStorage.getItem('search') || '',
  };

  changeSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ search: e.target.value });
    localStorage.setItem('search', e.target.value);
  };

  componentWillUnmount() {
    localStorage.setItem('search', this.state.search);
  }

  render() {
    const search = this.state.search;
    return (
      <main className={'main'}>
        <h1 className={'main__title'}>Home page</h1>
        <div className={'main__search'}>
          <br />
          <Input placeholder={'search'} onChange={this.changeSearch} value={search} />
        </div>
        <div className={'main__cards'}>
          {this.props.data.map((el) => {
            return <Card key={el.id} data={el} />;
          })}
        </div>
      </main>
    );
  }
}
