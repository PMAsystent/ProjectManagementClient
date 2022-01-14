import './styles.scss';
import CustomInput from 'components/CustomInput/CustomInput';
import React, { useEffect, useMemo } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomButton from 'components/CustomButton/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, postNewPassword, selectUser } from 'redux/auth/auth.slice';

const validationSchemaPassword = yup.object({
  password: yup.string().required('Obecne hasło jest wymagane!'),
  newPassword: yup
    .string()
    .required('Hasło jest wymagane!')
    .min(8, 'Hasło musi być dłuższe niż 8 znaków!')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Hasło musi zawierać dużą literę, cyfrę oraz znak specjalny!'),
  newPasswordConfirm: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Hasła muszą być takie same!')
    .required('Potwierdzenie hasła jest wymagane!'),
});

const UserDetails = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);

  const defaultValuePassword = useMemo(
    () => ({
      password: '',
      newPassword: '',
      newPasswordConfirm: '',
    }),
    []
  );

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
  } = useForm({
    defaultValues: useMemo(() => {
      return defaultValuePassword;
    }, [defaultValuePassword]),
    resolver: yupResolver(validationSchemaPassword),
  });

  const onSubmitChangePassword = (values: any) => {
    if (currentUser) {
      const payload = {
        oldPassword: values.password,
        newPassword: values.newPassword,
        userName: currentUser.userName,
        email: currentUser.email,
      };
      dispatch(postNewPassword(payload));
    }
  };

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <div className="user-details-container">
      <div className="headline">
        <h1>Profil użytkownika</h1>
      </div>
      <div className="segments-container">
        <div className="segment">
          <div className="segment-headline">
            <h2>Hasło</h2>
          </div>
          <div className="segment-content">
            <form onSubmit={handleSubmitPassword(onSubmitChangePassword)} key={'change-password'}>
              <div className="input-field">
                <h3>Obecne hasło</h3>
                <CustomInput
                  {...registerPassword('password')}
                  type="password"
                  className="dark"
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
                  className="dark"
                  placeholder="Nowe hasło"
                  helperText={errorsPassword.newPassword?.message}
                  error={!!errorsPassword.newPassword}
                />
                <CustomInput
                  {...registerPassword('newPasswordConfirm')}
                  type="password"
                  className="dark"
                  placeholder="Potwierdź nowe hasło"
                  helperText={errorsPassword.newPasswordConfirm?.message}
                  error={!!errorsPassword.newPasswordConfirm}
                />
              </div>

              <div className="buttons-container">
                <CustomButton type="submit" className="btn btn-success">
                  Zmień hasło
                </CustomButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
