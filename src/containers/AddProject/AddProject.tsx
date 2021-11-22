import React, { FC, useMemo } from 'react';
import './styles.scss';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomTextArea from '../../components/CustomTextArea/CustomTextArea';
import { Modal } from '@mui/material';
import AsyncAutocomplete from "../../components/AsyncAutocomplete/AsyncAutocomplete";

const validationSchema = yup.object({
  name: yup.string().required('Nazwa jest wymagana!'),
  description: yup.string().required('Opis jest wymagany!'),
  dueDate: yup.date().required('Data zakończenia jest wymagana!'),
  assigns: yup.array(),
});

const AddProject: FC<any> = (props) => {
  const defaultValue = useMemo(
    () => ({
      name: '',
      description: '',
      dueDate: '',
      assigns: [],
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

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Modal open={props.open} onClose={props.handleClose} aria-labelledby="modal-app-project" aria-describedby="modal-modal-description">
      <form onSubmit={handleSubmit(onSubmit)} key={'addProject'}>
        <div className="add-project-container">
          <h1>Nowy projekt</h1>
          <div className="project-form">
            <CustomInput label={'Nazwa'} {...register('name')} type="text" helperText={errors.name?.message} error={!!errors.name} />
            <CustomTextArea label={'Opis'} {...register('description')} helperText={errors.description?.message} error={!!errors.description} />
            <CustomInput
              label={'Data zakończenia'}
              {...register('dueDate')}
              type="date"
              helperText={errors.dueDate?.message}
              error={!!errors.dueDate}
            />
          </div>
          <div className="assigns-form">
            <AsyncAutocomplete label={'Dodaj użytkownika'} />
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
    </Modal>
  );
};

export default AddProject;
