import React from 'react';
import cl from './TypesBlock.module.scss';
import { Control, Controller, FieldErrors, UseFormRegister } from 'react-hook-form';
import { ETypes, IFormValues } from '../../FormAddCard';

interface IProps {
  register: UseFormRegister<IFormValues>;
  errors: FieldErrors<IFormValues>;
  control: Control<IFormValues>;
}

export default function TypesBlock(props: IProps) {
  const validateCheckbox = (value: string[]): boolean => {
    return value.length > 0;
  };

  return (
    <Controller
      control={props.control}
      name="checkbox"
      render={({ field }) => {
        const checkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { checked, value } = e.target;
          if (checked) {
            field.onChange([...field.value, value]);
          } else {
            field.onChange(field.value.filter((v) => v !== value));
          }
        };
        return (
          <div className={cl.typesBlock}>
            <p>Types:</p>
            <label>
              <input type="checkbox" value={ETypes[0]} onChange={checkChange} />
              &nbsp;JS library
            </label>
            <label>
              <input type="checkbox" value={ETypes[1]} onChange={checkChange} />
              &nbsp;Runtime environment
            </label>
            <label>
              <input type="checkbox" value={ETypes[2]} onChange={checkChange} />
              &nbsp;WEB framework
            </label>
            <p
              className={
                !props.errors.checkbox ? cl.errorMsg : [cl.errorMsg, cl.errorMsg_invalid].join(' ')
              }
            >
              At least one item must be selected
            </p>
          </div>
        );
      }}
      rules={{ validate: validateCheckbox }}
    />
  );
}
