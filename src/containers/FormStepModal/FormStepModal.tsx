import React, { FC, useEffect, useMemo } from 'react';
import './styles.scss';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomTextArea from '../../components/CustomTextArea/CustomTextArea';
import { Modal } from '@mui/material';
import { useDispatch } from 'react-redux';
import { postStep, putStep } from '../../redux/step/step.slice';

const validationSchema = yup.object({
  name: yup.string().required('Nazwa jest wymagana').min(3, 'Nazwa musi mieć conajmniej 3 znaki'),
  description: yup.string().required('Opis jest wymagany').min(10, 'Opis musi mieć conajmniej 10 znaków'),
});

const FormStepModal: FC<any> = (props) => {
  const projectId = props.projectId;
  const step = props.step;
  const dispatch = useDispatch();

  const defaultValue: any = useMemo(
    () => ({
      name: '',
      description: '',
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
        description: values.description,
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
        description: props.step.description || '',
      });
    }
  }, [methods, props.step]);

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-app-step"
      aria-describedby="modal-modal-description"
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
                <CustomTextArea
                  placeholder={'Wpisz opis'}
                  label={'Opis'}
                  {...methods.register('description')}
                  helperText={methods.formState.errors.description?.message}
                  error={!!methods.formState.errors.description}
                />
              </div>
              <div className="buttons">
                <CustomButton type="button" className="btn-go-back" onClick={props.handleClose}>
                  wróć
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
