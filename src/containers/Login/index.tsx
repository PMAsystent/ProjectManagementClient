import React from "react";
import "./styles.scss";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-text">
        <h1>LOGO</h1>
        <h3>Wspieramy Twój Projekt</h3>
      </div>
      <div className="login-form">
        <CustomInput className="input-primary" placeholder="Email" variant="outlined"/>
        <CustomInput className="input-primary" placeholder="Hasło" variant="outlined" type="password"/>
        <p className="forgot-password">Przypomnij hasło</p>
        <CustomButton className="btn-primary">Zaloguj się</CustomButton>
        <p className="new-account">Nie masz konta? <b>Zarejestruj się!</b></p>
      </div>
    </div>
  )
}

export default Login;