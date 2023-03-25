import Input from '../../../../../components/UI/Input';
import React, { RefObject } from 'react';
import cl from './NameBlock.module.scss';

type IProps = {
  refForwardName: RefObject<HTMLInputElement>;
  refForwardImage: RefObject<HTMLInputElement>;
  refForwardDesc: RefObject<HTMLTextAreaElement>;
  nameCorrect: boolean;
  imageCorrect: boolean;
  descCorrect: boolean;
};

export default function NameBlock(props: IProps) {
  return (
    <div className={cl.nameBlock}>
      <label>
        Name:
        <br />
        <Input name="name" type="text" placeholder="Name" ref={props.refForwardName} />
        <p
          className={props.nameCorrect ? cl.errorMsg : [cl.errorMsg, cl.errorMsg_invalid].join(' ')}
        >
          Must be at least 3 characters
        </p>
      </label>
      <label>
        Upload image:
        <br />
        <Input type="file" name="image" ref={props.refForwardImage} data-testid="image" />
        <p
          className={
            props.imageCorrect ? cl.errorMsg : [cl.errorMsg, cl.errorMsg_invalid].join(' ')
          }
        >
          Must be in .PNG / .JPG / .JPEG / .SVG / .GIF format
        </p>
      </label>
      <br />
      <label className={cl.desc}>
        Description:
        <br />
        <textarea name="desc" placeholder="Description" ref={props.refForwardDesc} />
        <p
          className={props.descCorrect ? cl.errorMsg : [cl.errorMsg, cl.errorMsg_invalid].join(' ')}
        >
          Must be at least 10 characters
        </p>
      </label>
    </div>
  );
}
