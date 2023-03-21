import React, { Component, RefObject } from 'react';
import cl from './SwitchBlock.module.scss';

type IProps = {
  refForwardIsOpenYes: RefObject<HTMLInputElement>;
  refForwardIsOpenNo: RefObject<HTMLInputElement>;
};

export default class SwitchBlock extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div className={cl.switchBlock}>
        <p>Is open source:</p>
        <label className={cl.switch}>
          <input
            type="radio"
            name="isOpenSource"
            defaultChecked={true}
            ref={this.props.refForwardIsOpenYes}
          />
          Yes:&nbsp;&nbsp;&nbsp;
          <input
            type="radio"
            name="isOpenSource"
            defaultChecked={false}
            ref={this.props.refForwardIsOpenNo}
          />
          No:
        </label>
      </div>
    );
  }
}
