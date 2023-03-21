import Input from '../../../../../components/UI/Input';
import React, { Component, RefObject } from 'react';
import cl from './NameBlock.module.scss';

type IProps = {
  refForwardName: RefObject<HTMLInputElement>;
  refForwardImage: RefObject<HTMLInputElement>;
  refForwardDesc: RefObject<HTMLTextAreaElement>;
  nameCorrect: boolean;
  imageCorrect: boolean;
  descCorrect: boolean;
};

export default class NameBlock extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div className={cl.nameBlock}>
        <label>
          Name:
          <br />
          <Input name="name" type="text" placeholder="Name" ref={this.props.refForwardName} />
          <p
            className={
              this.props.nameCorrect ? cl.errorMsg : [cl.errorMsg, cl.errorMsg_invalid].join(' ')
            }
          >
            Must be at least 3 characters
          </p>
        </label>
        <label>
          Upload image:
          <br />
          <Input type="file" name="image" ref={this.props.refForwardImage} data-testid="image" />
          <p
            className={
              this.props.imageCorrect ? cl.errorMsg : [cl.errorMsg, cl.errorMsg_invalid].join(' ')
            }
          >
            Must be in .PNG / .JPG / .JPEG / .SVG / .GIF format
          </p>
        </label>
        <br />
        <label className={cl.desc}>
          Description:
          <br />
          <textarea name="desc" placeholder="Description" ref={this.props.refForwardDesc} />
          <p
            className={
              this.props.descCorrect ? cl.errorMsg : [cl.errorMsg, cl.errorMsg_invalid].join(' ')
            }
          >
            Must be at least 10 characters
          </p>
        </label>
      </div>
    );
  }
}
