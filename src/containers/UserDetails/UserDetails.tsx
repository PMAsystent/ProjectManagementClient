import CustomInput from 'components/CustomInput/CustomInput';
import React, { useMemo } from 'react';
import './styles.scss';
import * as yup from 'yup';
import { useForm, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';

const validationSchema = yup.object({
  firstName: yup.string().required('Imię jest wymagane!'),
  lastName: yup.string().required('Nazwisko jest wymagane!'),
});

export const UserDetails = () => {
  const defaultValue = useMemo(
    () => ({
      firstName: 'Imię',
      lastName: 'Naziwsko',
    }),
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: useMemo(() => {
      return defaultValue;
    }, [defaultValue]),
    resolver: yupResolver(validationSchema),
  });

  const { isDirty, isValid } = useFormState({ control });

  const onSubmit = (data: any) => {
    console.log('zapis: ', data);
  };

  const onResetClick = async () => {
    reset();
  };

  return (
    <div className="container">
      <div className="text">
        <h3>Profil użytkownika</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} key={'login'}>
        <div className="form">
          <CustomInput {...register('firstName')} placeholder="Imię" helperText={errors.firstName?.message} error={!!errors.firstName} />
          <CustomInput {...register('lastName')} placeholder="Nazwisko" helperText={errors.lastName?.message} error={!!errors.lastName} />
        </div>

        <div className="footer">
          <Button variant="outlined" disabled={!isDirty} onClick={onResetClick} className="button-footer">
            Cofnij zmiany
          </Button>
          <Button variant="outlined" disabled={!(isDirty && isValid)} type="submit" className="button-footer">
            Zapisz zmiany
          </Button>
        </div>
      </form>
    </div>
  );
};
