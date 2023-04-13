import React, { KeyboardEvent } from 'react';
import cl from './Input.module.scss';
interface IProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
  value?: string;
  type?: string;
  ref?: HTMLInputElement;
}
type Ref = HTMLInputElement;

const Input = React.forwardRef<Ref, IProps>((props, ref) => (
  <input className={cl.input} {...props} ref={ref} />
));

export default Input;
