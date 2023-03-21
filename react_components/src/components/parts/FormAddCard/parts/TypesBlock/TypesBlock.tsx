import React, { Component, RefObject } from 'react';
import { ETypes } from '../../FormAddCard';
import cl from './TypesBlock.module.scss';

type IProps = {
  refForwardJs: RefObject<HTMLInputElement>;
  refForwardRe: RefObject<HTMLInputElement>;
  refForwardWf: RefObject<HTMLInputElement>;
  typesCorrect: boolean;
};

export default class TypesBlock extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div className={cl.typesBlock}>
        <p>Types:</p>
        <label>
          <input
            type="checkbox"
            name="jsChecked"
            value={ETypes[0]}
            ref={this.props.refForwardJs}
            defaultChecked={false}
          />
          &nbsp;JS library
        </label>
        <label>
          <input
            type="checkbox"
            name="reChecked"
            value={ETypes[1]}
            ref={this.props.refForwardRe}
            defaultChecked={false}
          />
          &nbsp;Runtime environment
        </label>
        <label>
          <input
            type="checkbox"
            name="wfChecked"
            value={ETypes[2]}
            ref={this.props.refForwardWf}
            defaultChecked={false}
          />
          &nbsp;WEB framework
        </label>
        <p
          className={
            this.props.typesCorrect ? cl.errorMsg : [cl.errorMsg, cl.errorMsg_invalid].join(' ')
          }
        >
          At least one item must be selected
        </p>
      </div>
    );
  }
}
