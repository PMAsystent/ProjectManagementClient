import './styles.scss';
import CustomInput from 'components/CustomInput/CustomInput';
import React, { useMemo } from 'react';
import * as yup from 'yup';
import { useForm, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomButton from 'components/CustomButton/CustomButton';
import { RiArrowGoBackLine } from 'react-icons/ri';

const validationSchema = yup.object({
  firstName: yup.string().required('Imię jest wymagane!'),
  lastName: yup.string().required('Nazwisko jest wymagane!'),
});

export const UserDetails = () => {
  const defaultValue = useMemo(
    () => ({
      firstName: 'Imię',
      lastName: 'Nazwisko',
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

        <div className="buttons-container">
          <CustomButton type="submit" icon={<RiArrowGoBackLine />} className="btn-primary" disabled={!isDirty} onClick={onResetClick}>
            Cofnij zmiany
          </CustomButton>
          <CustomButton type="submit" className="btn-primary" disabled={!(isDirty && isValid)} onClick={onSubmit}>
            Zapisz zmiany
          </CustomButton>
        </div>
      </form>
    </div>
  );
};
