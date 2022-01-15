import React, { useMemo } from 'react';
import CustomInput from 'components/CustomInput/CustomInput';
import CustomButton from 'components/CustomButton/CustomButton';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from 'react-router-dom';
import { sendResetPasswordEmailApi } from '../../api/utils.auth';
import SnackbarUtils from '../../core/utils/SnackbarUtils';
import {getLoginPath} from "../../core/routes";

const validationSchema = yup.object({
  email: yup.string().email('Email jest niepoprawny!').required('Email jest wymagany!'),
  confirmEmail: yup
    .string()
    .oneOf([yup.ref('email')], 'Emaile muszą być takie same!')
    .email('Email jest niepoprawny')
    .required('Email jest wymagany!'),
});

const ForgotPassword = () => {
  const defaultValue = useMemo(
    () => ({
      email: '',
      confirmEmail: '',
    }),
    []
  );
  const history = useHistory();

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
    sendResetPasswordEmailApi({ email: values['email'] })
      .then((response: any) => {
        if (response.data?.isSented) {
          SnackbarUtils.success('Wysłano email do zmiany hasła');
          history.push(getLoginPath);
        } else {
          SnackbarUtils.success('Nie udało się wysłać emaila do zmiany hasła');
        }
      })
      .catch((err) => {
        SnackbarUtils.success('Nie udało się wysłać emaila do zmiany hasła');
      });
  };

  return (
    <div className="container">
      <div className="text">
        <h1>PM ASYSTENT</h1>
        <h3>Przypomnij hasło</h3>
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
          <CustomButton type="submit" className="btn-primary">
            Wyślij kod
          </CustomButton>
          <ArrowBackIcon className="icon" onClick={handlegoBack} />
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
