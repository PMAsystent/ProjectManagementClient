import React, {FC} from 'react';
import {Grid} from '@material-ui/core';
import "./styles.scss";

const AuthLayout: FC<any> = ({children, ...props}) => {
  return (
    <Grid container className="auth-container">
      <Grid md={7} className="auth-img"/>
      <Grid md={5} xs={12} className="auth-form">
        {children}
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
