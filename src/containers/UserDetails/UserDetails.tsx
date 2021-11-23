import './styles.scss';
import CustomInput from 'components/CustomInput/CustomInput';
import React, { useMemo, useState } from 'react';
import * as yup from 'yup';
import { useForm, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomButton from 'components/CustomButton/CustomButton';
import { RiArrowGoBackLine } from 'react-icons/ri';

const validationSchemaBasicInfo = yup.object({
  firstName: yup.string().required('Imię jest wymagane!'),
  lastName: yup.string().required('Nazwisko jest wymagane!'),
});

const validationSchemaPassword = yup.object({
  password: yup.string().required('Obecne hasło jest wymagane!'),
  newPassword: yup
    .string()
    .required('Hasło jest wymagane!')
    .min(8, 'Hasło musi być dłuższe niż 8 znaków!')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Hasło musi zawierać dużą literę, cyfrę oraz znak specjalny!'),
});

const validationSchemaEmail = yup.object({
  newEmail: yup.string().email('Email jest niepoprawny!').required('Email jest wymagany!'),
});
export const UserDetails = () => {
  const defaultValueBasicInfo = useMemo(
    () => ({
      firstName: 'Imię',
      lastName: 'Nazwisko',
    }),
    []
  );
  const defaultValuePassword = useMemo(
    () => ({
      password: '',
      newPassword: '',
    }),
    []
  );
  const defaultValueEmail = useMemo(
    () => ({
      newEmail: '',
    }),
    []
  );

  const {
    register: registerBasicInfo,
    handleSubmit: handleSubmitBasicInfo,
    formState: { errors: errorsBasicInfo },
    reset: resetBasicInfo,
    control: controlBasicInfo,
  } = useForm({
    mode: 'onChange',
    defaultValues: useMemo(() => {
      return defaultValueBasicInfo;
    }, [defaultValueBasicInfo]),
    resolver: yupResolver(validationSchemaBasicInfo),
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
    control: controlPassword,
  } = useForm({
    mode: 'onChange',
    defaultValues: useMemo(() => {
      return defaultValuePassword;
    }, [defaultValuePassword]),
    resolver: yupResolver(validationSchemaPassword),
  });
  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: errorsEmail },
    control: controlEmail,
  } = useForm({
    mode: 'onChange',
    defaultValues: useMemo(() => {
      return defaultValueEmail;
    }, [defaultValueEmail]),
    resolver: yupResolver(validationSchemaEmail),
  });

  const { isDirty: isDirtyBasicInfo, isValid: isValidBasicInfo } = useFormState({ control: controlBasicInfo });
  const { isDirty: isDirtyEmail, isValid: isValidEmail } = useFormState({ control: controlEmail });
  const { isDirty: isDirtyPassword, isValid: isValidPassword } = useFormState({ control: controlPassword });

  const onSubmitBasicInfo = (data: any) => {
    console.log('zapis: ', data);
  };
  const onSubmitChangePassword = (data: any) => {
    console.log('zapis hasło: ', data);
  };
  const onSubmitChangeEmail = (data: any) => {
    console.log('zapis email: ', data);
  };

  const onResetClickBasicInfo = async () => {
    resetBasicInfo();
  };

  const [email, setEmail] = useState('przykladowyemail@gmail.com');

  return (
    <div className="container">
      <div className="headline">
        <h1>Profil użytkownika</h1>
      </div>
      <div className="segment">
        <div className="segment-headline">
          <h2>Dane użytkownika</h2>
        </div>
        <div className="segment-content">
          <form onSubmit={handleSubmitBasicInfo(onSubmitBasicInfo)} key={'register'}>
            <div className="input-field">
              <h3>Imię</h3>
              <CustomInput
                {...registerBasicInfo('firstName')}
                placeholder="Imię"
                type="text"
                helperText={errorsBasicInfo.firstName?.message}
                error={!!errorsBasicInfo.firstName}
              />
            </div>
            <div className="input-field">
              <h3>Nazwisko</h3>
              <CustomInput
                {...registerBasicInfo('lastName')}
                placeholder="Nazwisko"
                type="text"
                helperText={errorsBasicInfo.lastName?.message}
                error={!!errorsBasicInfo.lastName}
              />
            </div>

            <div className="buttons-container">
              <CustomButton type="submit" className="btn btn-success" disabled={!(isDirtyBasicInfo && isValidBasicInfo)} onClick={onSubmitBasicInfo}>
                Zapisz zmiany
              </CustomButton>
              <CustomButton
                type="submit"
                icon={<RiArrowGoBackLine />}
                className="btn btn-go-back"
                disabled={!isDirtyBasicInfo}
                onClick={onResetClickBasicInfo}
              >
                Cofnij zmiany
              </CustomButton>
            </div>
          </form>
        </div>
      </div>
      <div className="segment">
        <div className="segment-headline">
          <h2>Bezpieczeństwo</h2>
        </div>
        <div className="segment-content">
          <form onSubmit={handleSubmitPassword(onSubmitChangePassword)} key={'change-password'}>
            <div className="input-field">
              <h3>Obecne hasło</h3>
              <CustomInput
                {...registerPassword('password')}
                type="password"
                placeholder="Obecne hasło"
                helperText={errorsPassword.password?.message}
                error={!!errorsPassword.password}
              />
            </div>
            <div className="input-field">
              <h3>Nowe hasło</h3>
              <CustomInput
                {...registerPassword('newPassword')}
                type="password"
                placeholder="Nowe hasło"
                helperText={errorsPassword.newPassword?.message}
                error={!!errorsPassword.newPassword}
              />
            </div>

            <div className="buttons-container">
              <CustomButton
                type="submit"
                className="btn btn-success"
                disabled={!(isValidPassword && isDirtyPassword)}
                onClick={onSubmitChangePassword}
              >
                Zmień hasło
              </CustomButton>
            </div>
          </form>
        </div>
      </div>
      <div className="segment">
        <div className="segment-headline">
          <h2>Email</h2>
        </div>
        <div className="segment-content">
          <form onSubmit={handleSubmitEmail(onSubmitChangeEmail)} key={'change-email'}>
            <div className="input-field">
              <h3>Obecny email</h3>
              <CustomInput value={email} disabled="true" />
            </div>
            <div className="input-field">
              <h3>Nowy email</h3>
              <CustomInput
                {...registerEmail('newEmail')}
                placeholder="Nowy email"
                type="email"
                helperText={errorsEmail.newEmail?.message}
                error={!!errorsEmail.newEmail}
              />
            </div>

            <div className="buttons-container">
              <CustomButton type="submit" className="btn btn-success" disabled={!(isValidEmail && isDirtyEmail)} onClick={onSubmitChangeEmail}>
                Zmień email
              </CustomButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
