import React, { forwardRef } from 'react';
import { TextField } from '@material-ui/core';
import './styles.scss';

const CustomInput = forwardRef(({ label, className, readOnly = false, ...props }: any, ref) => {
  return (
    <div className={'custom-input'}>
      {label && <label htmlFor={props.name}>{label}</label>}
      <TextField
        inputRef={ref}
        className={className}
        InputProps={{
          readOnly: readOnly,
        }}
        {...props}
      />
    </div>
  );
});

export default CustomInput;
