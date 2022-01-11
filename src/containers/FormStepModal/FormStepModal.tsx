import React, { FC, useEffect, useMemo } from 'react';
import './styles.scss';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { Modal } from '@mui/material';
import { useDispatch } from 'react-redux';
import { postStep, putStep } from '../../redux/step/step.slice';

const validationSchema = yup.object({
  name: yup.string().required('Nazwa jest wymagana').min(3, 'Nazwa musi mieć conajmniej 3 znaki'),
});

const FormStepModal: FC<any> = (props) => {
  const projectId = props.projectId;
  const step = props.step;
  const dispatch = useDispatch();

  const defaultValue: any = useMemo(
    () => ({
      name: '',
    }),
    []
  );

  const methods = useForm({
    defaultValues: useMemo(() => {
      return defaultValue;
    }, [defaultValue]),
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (values: any) => {
    if (step?.id) {
      const putValues = {
        id: step.id,
        name: values.name,
      };

      dispatch(putStep({ ...putValues }));
    } else {
      const postValues = {
        name: values.name,
        projectId: projectId,
      };

      dispatch(postStep({ ...postValues }));
    }

    props.handleClose();
  };

  useEffect(() => {
    if (props.step) {
      methods.reset({
        name: props.step.name,
      });
    }
  }, [methods, props.step]);

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-app-step"
      sx={{ overflowY: 'scroll', overflowX: 'hidden', marginBottom: '15px' }}
    >
      <div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} key={'addProject'}>
            <div className="add-step-container">
              <h1>{step ? `Edytuj step` : `Dodaj step`}</h1>
              <div className="step-form">
                <CustomInput
                  placeholder={step ? step.name : 'Wpisz nazwę'}
                  label={'Nazwa'}
                  {...methods.register('name')}
                  type="text"
                  helperText={methods.formState.errors.name?.message}
                  error={!!methods.formState.errors.name}
                />
              </div>
              <div className="buttons">
                <CustomButton type="button" className="btn-go-back" onClick={props.handleClose}>
                  Wróć
                </CustomButton>
                <CustomButton type="submit" className="btn-success">
                  Zapisz
                </CustomButton>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </Modal>
  );
};

export default FormStepModal;
