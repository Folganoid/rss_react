import React from 'react';
import cl from './Button.module.scss';
type ButtonProps = React.ComponentProps<'button'>;

export default class Button extends React.Component<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    return (
      <button className={cl.button} {...this.props}>
        {this.props.children}
      </button>
    );
  }
}
