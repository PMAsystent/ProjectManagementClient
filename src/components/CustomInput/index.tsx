import React, {FC, forwardRef} from 'react';
import { TextField } from '@material-ui/core';
import "./styles.scss";

const CustomInput = forwardRef(({...props}: any, ref) => {
  return (
    <TextField inputRef={ref} {...props} />
  )
})

export default CustomInput;
