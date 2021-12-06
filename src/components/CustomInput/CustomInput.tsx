import React, { forwardRef } from 'react';
import { TextField } from '@material-ui/core';
import './styles.scss';

const CustomInput = forwardRef(({ label, className, ...props }: any, ref) => {
  return (
    <div className={'custom-input'}>
      {label && <label htmlFor={props.name}>{label}</label>}
      <TextField inputRef={ref} className={className} {...props} />
    </div>
  );
});

export default CustomInput;
