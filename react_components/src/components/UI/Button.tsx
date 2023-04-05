import React from 'react';
import cl from './Button.module.scss';
type ButtonProps = React.ComponentProps<'button'>;

export default function Button(props: ButtonProps) {
  return (
    <button className={cl.button} {...props}>
      {props.children}
    </button>
  );
}
