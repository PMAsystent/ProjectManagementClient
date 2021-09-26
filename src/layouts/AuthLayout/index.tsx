import React, {FC} from 'react';
import {Grid} from '@mui/material';
import "./styles.scss";

const AuthLayout: FC<any> = ({children}) => {
  return (
    <Grid container className="auth-container">
      <Grid item md={7} className="auth-img"/>
      <Grid item md={5} xs={12} className="auth-form">
        {children}
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
