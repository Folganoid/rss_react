import React from 'react';
import cl from './Loader.module.scss';

export default function Loader() {
  return (
    <div className={cl.loader}>
      <div className={cl.spinner}></div>
    </div>
  );
}
