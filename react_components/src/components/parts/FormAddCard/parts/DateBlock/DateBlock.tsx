import React from 'react';
import Input from '../../../../../components/UI/Input';
import Select from '../../../../../components/UI/Select';
import cl from './DateBlock.module.scss';
import { Control, Controller, FieldErrors, UseFormRegister } from 'react-hook-form';
import { IFormValues } from '../../FormAddCard';

interface IProps {
  register: UseFormRegister<IFormValues>;
  errors: FieldErrors<IFormValues>;
  control: Control<IFormValues>;
}

export default function DateBlock(props: IProps) {
  const years = [
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
    '2021',
    '2022',
  ];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const validateDate = (value: string): boolean => {
    if (Date.parse(value) < Date.parse('2023-01-01')) return true;
    return false;
  };

  return (
    <div className={cl.dateBlock}>
      <label>
        First release year:
        <br />
        <Select
          {...props.register('fYear')}
          options={years.map((e) => {
            return {
              name: e,
              value: e,
            };
          })}
        />
      </label>
      <label>
        First release month:
        <br />
        <Select
          {...props.register('fMonth')}
          options={months.map((e) => {
            return {
              name: e,
              value: e,
            };
          })}
        />
      </label>
      <label>
        Last release date:
        <br />
        <Controller
          name="lDate"
          control={props.control}
          rules={{ validate: validateDate }}
          render={({ field }) => <Input data-testid="lDate" type="date" {...field} />}
        />
        <p
          className={
            !props.errors?.lDate ? cl.errorMsg : [cl.errorMsg, cl.errorMsg_invalid].join(' ')
          }
        >
          Must be filled no later than 2022-12-31
        </p>
      </label>
    </div>
  );
}
