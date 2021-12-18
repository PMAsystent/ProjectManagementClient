import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import './styles.scss';

const AuthSpinner = () => {
  return (
    <div className="auth-circle-container">
      <CircularProgress size={100} />
    </div>
  );
};

export default AuthSpinner;
