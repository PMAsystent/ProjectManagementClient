import React, { forwardRef } from 'react';
import { TextField } from '@material-ui/core';
import './styles.scss';

const CustomInput = forwardRef(({ className, ...props }: any, ref) => {
  return <TextField inputRef={ref} className={className} {...props} />;
});

export default CustomInput;
