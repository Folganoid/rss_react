import Button from '../../../components/UI/Button';
import React from 'react';
import cl from './ModalOk.module.scss';

interface IProps {
  title: string;
  control: (show: boolean) => void;
  show: boolean;
}

export default function ModalOk(props: IProps) {
  const handleClick = () => {
    props.control(false);
  };

  return (
    <div className={props.show ? cl.modal : cl.disable}>
      <div className={cl.modal__container}>
        <h1>{props.title}</h1>
        <Button onClick={handleClick}>Ok</Button>
      </div>
    </div>
  );
}
