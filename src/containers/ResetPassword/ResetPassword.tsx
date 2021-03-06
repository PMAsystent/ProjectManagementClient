import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useRedirectOnDoneFetchStatus } from '../../core/hooks';
import { getLoginPath } from '../../core/routes';
import { clearPostResetPasswordFetchStatus, postResetPassword, selectPostResetPasswordFetchStatus } from '../../redux/auth/auth.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const validationSchema = yup.object({
  email: yup.string().email('Email jest niepoprawny!').required('Email jest wymagany!'),
  confirmEmail: yup
    .string()
    .oneOf([yup.ref('email')], 'Emaile muszą być takie same!')
    .email('Email jest niepoprawny')
    .required('Email jest wymagany!'),
  password: yup
    .string()
    .required('Hasło jest wymagane!')
    .min(8, 'Hasło musi być dłuższe niż 8 znaków!')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Hasło musi zawierać dużą literę, cyfrę oraz znak specjalny!'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Hasła muszą być takie same!')
    .required('Potwierdzenie hasła jest wymagane!'),
});

const ResetPassword = () => {
  const defaultValue = useMemo(
    () => ({
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
    }),
    []
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const postResetPasswordFetchStatus = useSelector(selectPostResetPasswordFetchStatus);

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

  const onSubmit = (values: any) => {
    const token = history.location.search.replace('?token=', '');
    dispatch(postResetPassword({ email: values['email'], newPassword: values['password'], token }));
  };

  useRedirectOnDoneFetchStatus({ status: postResetPasswordFetchStatus, path: getLoginPath, clearFunction: clearPostResetPasswordFetchStatus });

  return (
    <div className="container">
      <div className="text">
        <h1>PM ASYSTENT</h1>
        <h3>Zmień hasło</h3>
      </div>
      <div className="form">
        <form onSubmit={handleSubmit(onSubmit)} key={'forgotPassword'}>
          <CustomInput {...register('email')} placeholder="Email" type="email" helperText={errors.email?.message} error={!!errors.email} />
          <CustomInput
            {...register('confirmEmail')}
            placeholder="Powtórz email"
            type="email"
            helperText={errors.confirmEmail?.message}
            error={!!errors.confirmEmail}
          />
          <CustomInput
            {...register('password')}
            placeholder="Nowe Hasło"
            type="password"
            helperText={errors.password?.message}
            error={!!errors.password}
          />
          <CustomInput
            {...register('confirmPassword')}
            placeholder="Powtórz Nowe Hasło"
            type="password"
            helperText={errors.confirmPassword?.message}
            error={!!errors.confirmPassword}
          />
          <CustomButton type="submit" className="btn-primary">
            Zmień hasło
          </CustomButton>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
