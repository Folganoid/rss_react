import Input from '../../../../../components/UI/Input';
import React, { Component, RefObject } from 'react';
import cl from './Site.module.scss';

type IProps = {
  siteCorrect: boolean;
  refForward: RefObject<HTMLInputElement>;
};

export default class Site extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const { refForward } = this.props;

    return (
      <label>
        Site:
        <br />
        <Input name="site" type="text" placeholder="Site" ref={refForward} />
        <p
          className={
            this.props.siteCorrect ? cl.errorMsg : [cl.errorMsg, cl.errorMsg_invalid].join(' ')
          }
        >
          Must be in http(s)://xxx.xx(x) format
        </p>
      </label>
    );
  }
}
