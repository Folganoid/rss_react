import React from 'react';
import cl from './Select.module.scss';

interface IProps {
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  value?: string;
  options?: { name: string; value: string }[];
}
type Ref = HTMLSelectElement;

const Select = React.forwardRef<Ref, IProps>((props, ref) => (
  <select className={cl.select} {...props} ref={ref}>
    {props.options?.map((op) => (
      <option key={op.value} value={op.value}>
        {op.name}
      </option>
    ))}
  </select>
));

export default Select;
