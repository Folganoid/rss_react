import Input from '../../../../../components/UI/Input';
import React from 'react';
import cl from './Site.module.scss';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { IFormValues } from '../../FormAddCard';

type IProps = {
  register: UseFormRegister<IFormValues>;
  errors: FieldErrors<IFormValues>;
};

export default function Site(props: IProps) {
  return (
    <label>
      Site:
      <br />
      <Input
        type="text"
        placeholder="Site"
        {...props.register('site', {
          pattern:
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i,
          required: true,
        })}
      />
      <p
        className={!props.errors?.site ? cl.errorMsg : [cl.errorMsg, cl.errorMsg_invalid].join(' ')}
      >
        Must be in http(s)://xxx.xx(x) format
      </p>
    </label>
  );
}
