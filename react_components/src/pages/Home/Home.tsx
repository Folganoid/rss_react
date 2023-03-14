import Input from '../../components/UI/Input';
import React from 'react';
import Card from '../../components/parts/Card/Card';
import { CardEntity } from 'components/parts/Card/CardType';
import cl from './Home.module.scss';

export default class Home extends React.Component<{ data: CardEntity[] }, { search: string }> {
  state = {
    search: localStorage.getItem('search') || '',
  };

  changeSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ search: e.target.value });
    //localStorage.setItem('search', e.target.value);
  };

  componentWillUnmount() {
    localStorage.setItem('search', this.state.search);
  }

  render() {
    const search = this.state.search;
    return (
      <main className={[cl.main, 'main'].join(' ')}>
        <h1 className={cl.main__title}>Home page</h1>
        <div className={cl.main__search}>
          <br />
          <Input placeholder={'Search'} onChange={this.changeSearch} value={search} />
        </div>
        <div className={cl.main__cards}>
          {this.props.data.map((el) => {
            return <Card key={el.id} data={el} />;
          })}
        </div>
      </main>
    );
  }
}
