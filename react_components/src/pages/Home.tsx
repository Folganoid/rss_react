import Input from '../components/UI/Input';
import React from 'react';

export default class Home extends React.Component<object, { search: string }> {
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
        <h1>Home page</h1>
        <div>
          <br />
          <Input placeholder={'search'} onChange={this.changeSearch} value={search} />
        </div>
      </main>
    );
  }
}
