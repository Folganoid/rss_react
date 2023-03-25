import Input from '../../../../../components/UI/Input';
import Select from '../../../../../components/UI/Select';
import React, { RefObject } from 'react';
import cl from './DateBlock.module.scss';

type IProps = {
  refForwardYear: RefObject<HTMLSelectElement>;
  refForwardMonth: RefObject<HTMLSelectElement>;
  refForwardDate: RefObject<HTMLInputElement>;
  dateCorrect: boolean;
};

export default function DateBlock(props: IProps) {
  const years: { name: string; value: string }[] = [];

  for (let i = 2000; i < 2023; i++) {
    years.push({ name: String(i), value: String(i) });
  }

  return (
    <div className={cl.dateBlock}>
      <label>
        First release year:
        <br />
        <Select name="fYear" ref={props.refForwardYear} options={years} />
      </label>
      <label>
        First release month:
        <br />
        <Select
          name="fMonth"
          ref={props.refForwardMonth}
          options={[
            { value: 'January', name: 'January' },
            { value: 'February', name: 'February' },
            { value: 'March', name: 'March' },
            { value: 'April', name: 'April' },
            { value: 'May', name: 'May' },
            { value: 'June', name: 'June' },
            { value: 'July', name: 'July' },
            { value: 'August', name: 'August' },
            { value: 'September', name: 'September' },
            { value: 'October', name: 'October' },
            { value: 'November', name: 'November' },
            { value: 'December', name: 'December' },
          ]}
        />
      </label>
      <label>
        Last release date:
        <br />
        <Input data-testid="lDate" name="lDate" type="date" ref={props.refForwardDate} />
        <p
          className={props.dateCorrect ? cl.errorMsg : [cl.errorMsg, cl.errorMsg_invalid].join(' ')}
        >
          Must be filled no later than 2022-12-31
        </p>
      </label>
    </div>
  );
}
