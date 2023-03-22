import Button from '../../../components/UI/Button';
import React from 'react';
import cl from './ModalOk.module.scss';

interface IProps {
  title: string;
  control: (show: boolean) => void;
  show: boolean;
}

export default class ModalOk extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  handleClick = () => {
    this.props.control(false);
  };

  render() {
    return (
      <div className={this.props.show ? cl.modal : cl.disable}>
        <div className={cl.modal__container}>
          <h1>{this.props.title}</h1>
          <Button onClick={this.handleClick}>Ok</Button>
        </div>
      </div>
    );
  }
}
