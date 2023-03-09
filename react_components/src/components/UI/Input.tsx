import React from 'react';
import cl from './Input.module.scss';
type InputProps = React.ComponentProps<'input'>;

export default class Input extends React.Component<InputProps> {
  constructor(props: InputProps) {
    super(props);
  }

  render() {
    return <input className={cl.input} {...this.props} />;
  }
}
