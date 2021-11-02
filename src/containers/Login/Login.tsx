import React, { useMemo } from 'react';
import './styles.scss';
import CustomInput from 'components/CustomInput/CustomInput';
import CustomButton from 'components/CustomButton/CustomButton';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import { getDashboardPath, getForgotPasswordPath, getRegisterPath } from 'core/routes';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserType } from 'core/types/requests/auth.types';
import { clearLoginFetchStatus, postLogin, selectLoginFetchStatus } from 'redux/auth/auth.slice';
import useRedirectOnDoneFetchStatus from '../../core/hooks/useRedirectOnDoneFetchStatus';

const validationSchema = yup.object({
  email: yup.string().email('Email jest niepoprawny!').required('Email jest wymagany!'),
  password: yup.string().required('Hasło jest wymagane!').min(8, 'Hasło musi być dłuższe niż 8 znaków!'),
});

const Login = () => {
  const defaultValue = useMemo(
    () => ({
      email: '',
      password: '',
    }),
    []
  );
  const history = useHistory();
  const dispatch = useDispatch();
  const loginFetchStatus = useSelector(selectLoginFetchStatus);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      return defaultValue;
    }, [defaultValue]),
    resolver: yupResolver(validationSchema),
  });

  const handleGotoRegister = () => {
    history.push(getRegisterPath);
  };

  const handleGotoForgotPassword = () => {
    history.push(getForgotPasswordPath);
  };

  const onSubmit = (values: loginUserType) => {
    dispatch(postLogin(values));
  };

  useRedirectOnDoneFetchStatus({ status: loginFetchStatus, path: getDashboardPath, clearFunction: clearLoginFetchStatus });

  return (
    <div className="container">
      <div className="text">
        <h1>LOGO</h1>
        <h3>Wspieramy Twój Projekt</h3>
      </div>
      <div className="form">
        <form onSubmit={handleSubmit(onSubmit)} key={'login'}>
          <CustomInput {...register('email')} placeholder="Email" type="email" helperText={errors.email?.message} error={!!errors.email} />
          <CustomInput
            {...register('password')}
            placeholder="Hasło"
            type="password"
            helperText={errors.password?.message}
            error={!!errors.password}
          />
          <div className="forgot-password">
            <span onClick={handleGotoForgotPassword}>Przypomnij hasło</span>
          </div>
          <CustomButton type="submit" className="btn-primary" status={loginFetchStatus}>
            Zaloguj się
          </CustomButton>
          <p className="new-account">
            Nie masz konta? <b onClick={handleGotoRegister}>Zarejestruj się!</b>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
