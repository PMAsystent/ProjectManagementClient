import './styles.scss';
import { fetchStatues } from 'core/enums/redux.statues';
import React, { FC } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { IconContext } from 'react-icons';

const CustomButton: FC<any> = ({ status, icon, children, className, disabled, ...props }) => {
  return (
    <IconContext.Provider value={{ className: 'icon' }}>
      <button
        data-test="custom-button"
        disabled={status === fetchStatues.PENDING || disabled}
        className={`${className}${disabled === true ? ' disabled' : ''}`}
        {...props}
      >
        {status !== fetchStatues.PENDING ? [icon != null ? icon : null, children] : <CircularProgress />}
      </button>
    </IconContext.Provider>
  );
};

export default CustomButton;
