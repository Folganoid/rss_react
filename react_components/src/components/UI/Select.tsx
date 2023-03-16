import React from 'react';
import cl from './Select.module.scss';
type SelectProps = React.ComponentProps<'select'>;

export default class Select extends React.Component<SelectProps> {
  constructor(props: SelectProps) {
    super(props);
  }

  render() {
    return <select className={cl.select} {...this.props} />;
  }
}
