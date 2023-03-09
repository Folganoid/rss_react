import React from 'react';
import cl from './Input.module.scss';
type InputProps = React.ComponentProps<'input'>;

export default function Input(props: InputProps) {
  return <input className={cl.input} {...props} />;
}
