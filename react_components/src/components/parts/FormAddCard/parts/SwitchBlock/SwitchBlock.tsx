import React from 'react';
import cl from './SwitchBlock.module.scss';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { IFormValues } from '../../FormAddCard';

interface IProps {
  register: UseFormRegister<IFormValues>;
  errors: FieldErrors<IFormValues>;
}

export default function SwitchBlock(props: IProps) {
  return (
    <div className={cl.switchBlock}>
      <p>Is open source:</p>
      <label className={cl.switch}>
        <input {...props.register('radio')} type="radio" value="true" defaultChecked={true} />
        Yes:&nbsp;&nbsp;&nbsp;
        <input {...props.register('radio')} type="radio" value="false" />
        No:
      </label>
    </div>
  );
}
