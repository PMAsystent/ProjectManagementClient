import { fetchStatues } from 'core/enums/redux.statues';
import React, { FC } from 'react';
import './styles.scss';
import CircularProgress from '@mui/material/CircularProgress';

const CustomButton: FC<any> = ({ status, children, ...props }) => {
  return (
    <button data-test="custom-button" disabled={status === fetchStatues.PENDING} {...props}>
      {status !== fetchStatues.PENDING ? children : <CircularProgress />}
    </button>
  );
};

export default CustomButton;
