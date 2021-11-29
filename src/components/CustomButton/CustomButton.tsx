import './styles.scss';
import { fetchStatues } from 'core/enums/redux.statues';
import React, { FC } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const CustomButton: FC<any> = ({ status, icon, children, className, disabled, ...props }) => {
  return (
    <button
      data-test="custom-button"
      disabled={status === fetchStatues.PENDING || disabled}
      className={`${className} ${disabled ? 'disabled' : ''}`}
      {...props}
    >
      {status !== fetchStatues.PENDING && icon && icon}
      {status !== fetchStatues.PENDING ? children : <CircularProgress />}
    </button>
  );
};

export default CustomButton;
