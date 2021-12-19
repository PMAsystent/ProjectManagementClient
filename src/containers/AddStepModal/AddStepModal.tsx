import React, { FC, useMemo } from 'react';
import './styles.scss';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomTextArea from '../../components/CustomTextArea/CustomTextArea';
import { Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccessToken } from '../../redux/auth/auth.slice';
import { postStep } from '../../api/utils';
import SnackbarUtils from '../../core/utils/SnackbarUtils';
import { getProjects } from '../../redux/project/project.slice';

const validationSchema = yup.object({
  name: yup.string().required('Nazwa jest wymagana').min(3, 'Nazwa musi mieć conajmniej 3 znaki'),
  description: yup.string().required('Opis jest wymagany').min(10, 'Opis musi mieć conajmniej 10 znaków'),
});

const AddStepModal: FC<any> = (props) => {
  const accessToken = useSelector(selectAccessToken);
  const projectId = props.projectId;
  const dispatch = useDispatch();

  const getProjectId = () => {
    return projectId;
  };

  const getAccessToken = () => {
    return accessToken;
  };

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
    const accessToken = getAccessToken();
    const projectId = getProjectId();

    await postStep({ ...values, projectId }, accessToken)
      .then((response) => {
        if (response.data) {
          SnackbarUtils.success('Dodano step');
          dispatch(getProjects());
          props.handleClose();
        }
      })
      .catch((error) => {
        SnackbarUtils.error('Nie udało się dodać stepa');
      });
  };

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
              <h1>Nowy step</h1>
              <div className="step-form">
                <CustomInput
                  placeholder={'Wpisz nazwę'}
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

export default AddStepModal;
