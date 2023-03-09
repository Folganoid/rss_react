import Input from '../components/UI/Input';
import React, { useEffect, useState } from 'react';

export default function Home() {
  const [search, setSearch] = useState(localStorage.getItem('search') || '');
  const changeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setSearch(localStorage.getItem('search') || '');
  }, []);

  useEffect(() => {
    setSearch(search);
    localStorage.setItem('search', search);
  }, [search]);

  return (
    <main className={'main'}>
      <h1>Home page</h1>
      <div>
        <br />
        <Input placeholder={'search'} onChange={changeSearch} value={search} />
      </div>
    </main>
  );
}
