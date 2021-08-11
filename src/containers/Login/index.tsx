import React, {useMemo, useState} from "react";
import "./styles.scss";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

const validationSchema = yup.object({
  email: yup.string().email('Email jest niepoprawny').required('Email jest wymagany!'),
  password: yup.string().required('Hasło jest wymagane!'),
});

const Login = () => {
  const [defaultValue, setDefaultValue] = useState<any>({
    email: '',
    password: '',
  });

  const {
    register,
    handleSubmit,

    formState: {
      errors,
    },
  } = useForm({
    defaultValues: useMemo(() => {
      return defaultValue;
    }, [defaultValue]),
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (values: any) => {
    console.log(values);
  }

  return (
    <div className="login-container">
      <div className="login-text">
        <h1>LOGO</h1>
        <h3>Wspieramy Twój Projekt</h3>
      </div>
      <div className="login-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            {...register('email')}
            placeholder="Email"
            type="text"
            helperText={errors.email?.message}
            error={errors.email}
          />
          <CustomInput
            {...register('password')}
            placeholder="Hasło"
            type="password"
            helperText={errors.password?.message}
            error={errors.password}
          />
          <p className="forgot-password">Przypomnij hasło</p>
          <CustomButton type='submit' className="btn-primary">Zaloguj się</CustomButton>
          <p className="new-account">Nie masz konta? <b>Zarejestruj się!</b></p>
        </form>
      </div>
    </div>
  )
}

export default Login;