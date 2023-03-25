import React, { RefObject } from 'react';
import { ETypes } from '../../FormAddCard';
import cl from './TypesBlock.module.scss';

type IProps = {
  refForwardJs: RefObject<HTMLInputElement>;
  refForwardRe: RefObject<HTMLInputElement>;
  refForwardWf: RefObject<HTMLInputElement>;
  typesCorrect: boolean;
};

export default function TypesBlock(props: IProps) {
  return (
    <div className={cl.typesBlock}>
      <p>Types:</p>
      <label>
        <input
          type="checkbox"
          name="jsChecked"
          value={ETypes[0]}
          ref={props.refForwardJs}
          defaultChecked={false}
        />
        &nbsp;JS library
      </label>
      <label>
        <input
          type="checkbox"
          name="reChecked"
          value={ETypes[1]}
          ref={props.refForwardRe}
          defaultChecked={false}
        />
        &nbsp;Runtime environment
      </label>
      <label>
        <input
          type="checkbox"
          name="wfChecked"
          value={ETypes[2]}
          ref={props.refForwardWf}
          defaultChecked={false}
        />
        &nbsp;WEB framework
      </label>
      <p
        className={props.typesCorrect ? cl.errorMsg : [cl.errorMsg, cl.errorMsg_invalid].join(' ')}
      >
        At least one item must be selected
      </p>
    </div>
  );
}
