import React from 'react';
import cl from './Input.module.scss';
type InputProps = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  type?: string;
  ref?: HTMLInputElement;
};
type Ref = HTMLInputElement;

const Input = React.forwardRef<Ref, InputProps>((props, ref) => (
  <input className={cl.input} {...props} ref={ref} />
));

export default Input;
