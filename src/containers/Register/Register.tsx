import React, { useMemo } from 'react';
import CustomInput from 'components/CustomInput/CustomInput';
import CustomButton from 'components/CustomButton/CustomButton';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearRegisterFetchStatus, postRegister, selectRegisterFetchStatus } from 'redux/auth/auth.slice';
import useRedirectOnDoneFetchStatus from '../../core/hooks/useRedirectOnDoneFetchStatus';
import { getLoginPath } from '../../core/routes';

const validationSchema = yup.object({
  userName: yup.string().required('Nazwa jest wymagana!'),
  email: yup.string().email('Email jest niepoprawny!').required('Email jest wymagany!'),
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

const Register = () => {
  const defaultValue = useMemo(
    () => ({
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    }),
    []
  );
  const history = useHistory();
  const dispatch = useDispatch();
  const registerFetchStatus = useSelector(selectRegisterFetchStatus);

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

  const handlegoBack = () => {
    history.goBack();
  };

  const onSubmit = (values: any) => {
    const payload = values;
    delete payload['confirmPassword'];
    dispatch(postRegister(payload));
  };

  useRedirectOnDoneFetchStatus({ status: registerFetchStatus, path: getLoginPath, clearFunction: clearRegisterFetchStatus });

  return (
    <div className="container">
      <div className="text">
        <h1>PM ASYSTENT</h1>
        <h3>Utwórz nowe konto</h3>
      </div>
      <div className="form">
        <form onSubmit={handleSubmit(onSubmit)} key={'register'}>
          <CustomInput
            {...register('userName')}
            placeholder="Nazwa użytkownika"
            type="text"
            helperText={errors.userName?.message}
            error={!!errors.userName}
          />
          <CustomInput {...register('email')} placeholder="Email" type="email" helperText={errors.email?.message} error={!!errors.email} />
          <CustomInput
            {...register('password')}
            placeholder="Hasło"
            type="password"
            helperText={errors.password?.message}
            error={!!errors.password}
          />
          <CustomInput
            {...register('confirmPassword')}
            placeholder="Powtórz hasło"
            type="password"
            helperText={errors.confirmPassword?.message}
            error={!!errors.confirmPassword}
          />
          <CustomButton type="submit" className="btn-primary" status={registerFetchStatus}>
            Zarejestruj się
          </CustomButton>
          <ArrowBackIcon className="icon" onClick={handlegoBack} />
        </form>
      </div>
    </div>
  );
};

export default Register;
