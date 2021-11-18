import CustomButton from 'components/CustomButton/CustomButton';
import CustomInput from 'components/CustomInput/CustomInput';
import React, { useEffect, useMemo, useState } from 'react';
import './styles.scss';
import * as yup from 'yup';
import { useForm, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';

const validationSchema = yup.object({
  firstName: yup.string().required('Imię jest wymagane!').min(8, 'Hasło musi być dłuższe niż 8 znaków!'),
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

  const [showFooter, setShowFooter] = useState(false);
  const [checkChanges, setCheckChanges] = useState(false);
  const [canSubmitChanges, setCanSubmitChanges] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setCanSubmitChanges(isValid);
      setShowFooter(isDirty);
      console.log('tyk');
    }, 100);
  }, [checkChanges]);
  const { isDirty, isValid } = useFormState({ control: control });

  const onSubmit = () => {
    console.log('zapis');
  };

  const onResetClick = () => {
    console.log('resett');
    reset();
  };

  return (
    <div className="container">
      <div className="text">
        <h3>Profil użytkownika</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} onChange={() => setCheckChanges(!checkChanges)} key={'login'}>
        <div className="form">
          <CustomInput {...register('firstName')} placeholder="Imię" helperText={errors.firstName?.message} error={errors.firstName != null} />
          <CustomInput {...register('lastName')} placeholder="Nazwisko" helperText={errors.lastName?.message} error={errors.lastName != null} />
        </div>

        {showFooter ? (
          <div className="footer">
            <Button variant="outlined" onClick={onResetClick} className="button-footer">
              Cofnij zmiany
            </Button>
            <Button disabled={canSubmitChanges} variant="outlined" type="submit" className="button-footer">
              Zapisz zmiany
            </Button>
          </div>
        ) : null}
      </form>
    </div>
  );
};
