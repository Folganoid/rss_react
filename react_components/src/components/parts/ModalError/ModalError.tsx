import React from 'react';
import cl from './ModalError.module.scss';

interface IProps {
  errors: string[];
}

export default function ModalError(props: IProps) {
  return (
    <div className={cl.err}>
      {props.errors.map((el: string, index: number) => {
        return (
          <div className={cl.err__container} key={el + index}>
            <h3>{el}</h3>
          </div>
        );
      })}
    </div>
  );
}
