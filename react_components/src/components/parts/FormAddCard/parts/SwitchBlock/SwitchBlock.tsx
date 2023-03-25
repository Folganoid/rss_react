import React, { RefObject } from 'react';
import cl from './SwitchBlock.module.scss';

type IProps = {
  refForwardIsOpenYes: RefObject<HTMLInputElement>;
  refForwardIsOpenNo: RefObject<HTMLInputElement>;
};

export default function SwitchBlock(props: IProps) {
  return (
    <div className={cl.switchBlock}>
      <p>Is open source:</p>
      <label className={cl.switch}>
        <input
          type="radio"
          name="isOpenSource"
          defaultChecked={true}
          ref={props.refForwardIsOpenYes}
        />
        Yes:&nbsp;&nbsp;&nbsp;
        <input
          type="radio"
          name="isOpenSource"
          defaultChecked={false}
          ref={props.refForwardIsOpenNo}
        />
        No:
      </label>
    </div>
  );
}
