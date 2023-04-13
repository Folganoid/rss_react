import React from 'react';
import Input from '../../../../../components/UI/Input';
import cl from './NameBlock.module.scss';
import { FieldErrors, UseFormRegister, Validate } from 'react-hook-form';
import { IFormValues } from '../../FormAddCard';

interface IProps {
  register: UseFormRegister<IFormValues>;
  errors: FieldErrors<IFormValues>;
}

const validateImage: Validate<string | FileList, IFormValues> = (value) => {
  if (!value || !value[0]) {
    return false;
  }
  const imageName = value[0] as File;
  if (!imageName.name.match(/\.(gif|jpe?g|svg?|png)$/i)) {
    return false;
  }
  return true;
};

export default function NameBlock(props: IProps) {
  return (
    <div className={cl.nameBlock}>
      <label>
        Name:
        <br />
        <Input
          type={'text'}
          placeholder="Name"
          {...props.register('name', { required: true, minLength: 3, maxLength: 20 })}
        />
        <p
          className={
            !props.errors?.name ? cl.errorMsg : [cl.errorMsg, cl.errorMsg_invalid].join(' ')
          }
        >
          Must be 3-20 characters...
        </p>
      </label>
      <label>
        Upload image:
        <br />
        <Input
          type="file"
          data-testid="image"
          {...props.register('image', { validate: validateImage })}
        />
        <p
          className={
            !props.errors?.image ? cl.errorMsg : [cl.errorMsg, cl.errorMsg_invalid].join(' ')
          }
        >
          Must be in .PNG / .JPG / .JPEG / .SVG / .GIF format
        </p>
      </label>
      <br />
      <label className={cl.desc}>
        Description:
        <br />
        <textarea
          placeholder="Description"
          {...props.register('desc', { required: true, minLength: 10 })}
        />
        <p
          className={
            !props.errors?.desc ? cl.errorMsg : [cl.errorMsg, cl.errorMsg_invalid].join(' ')
          }
        >
          Must be at least 10 characters
        </p>
      </label>
    </div>
  );
}
