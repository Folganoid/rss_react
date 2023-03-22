import Input from '../../components/UI/Input';
import React from 'react';
import Card, { ICard } from '../../components/parts/Card/Card';
import cl from './Home.module.scss';

export default class Home extends React.Component<{ data: ICard[] }, { search: string }> {
  state = {
    search: localStorage.getItem('search') || '',
  };

  changeSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ search: e.target.value });
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
            return <Card key={el.id} {...el} />;
          })}
        </div>
      </main>
    );
  }
}
