import './styles.scss';
import { fetchStates } from 'core/enums/redux.statues';
import React, { FC } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const CustomButton: FC<any> = ({ status, icon, children, className, disabled, ...props }) => {
  return (
    <button
      data-test="custom-button"
      disabled={status === fetchStates.PENDING || disabled}
      className={`${className} ${disabled ? 'disabled' : ''}`}
      {...props}
    >
      {status !== fetchStates.PENDING && icon && icon}
      {status !== fetchStates.PENDING ? children : <CircularProgress />}
    </button>
  );
};

export default CustomButton;
