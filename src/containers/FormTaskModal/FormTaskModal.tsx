import React, { FC, useEffect, useMemo } from 'react';
import './styles.scss';
import * as yup from 'yup';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomTextArea from '../../components/CustomTextArea/CustomTextArea';
import { Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { clearTaskPostFetchStatus, postTask, putTask, selectTaskPostFetchStatus } from '../../redux/task/task.slice';
import { useCloseModalOnDoneFetchStatus } from '../../core/hooks';
import { isValid } from 'date-fns';
import CustomDatePicker from '../../components/CustomDatePicker/CustomDatePicker';
import CustomPriorityField from 'components/CustomPriorityField/CustomPriorityField';
import PriorityNameDisplayer from 'components/PriorityNameDisplayer/PriorityNameDisplayer';
import { priorityNumberToString, priorityStringToNumber } from 'core/utils';
import { taskType } from '../../core/enums/task.type';

const validationSchema = yup.object({
  name: yup.string().required('Nazwa jest wymagana').min(3, 'Nazwa musi mieć conajmniej 3 znaki').max(30, 'Nazwa musi mieć mniej niż 30 znaków'),
  description: yup.string(),
  dueDate: yup
    .mixed()
    .test('is-date', 'Data zakończenia jest wymagana', (value) => isValid(value))
    .required('Data zakończenia jest wymagana'),
});

const FormTaskModal: FC<any> = (props) => {
  const dispatch = useDispatch();
  const stepId = props.stepId;
  const taskPostFetchStatus = useSelector(selectTaskPostFetchStatus);

  const defaultValue: any = useMemo(
    () => ({
      name: '',
      description: '',
      dueDate: '',
      priority: 1,
    }),
    []
  );

  const methods = useForm({
    defaultValues: useMemo(() => {
      return defaultValue;
    }, [defaultValue]),
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (values: any) => {
    values.priority = priorityNumberToString(values.priority);
    if (props.task) {
      dispatch(putTask({ ...props.task, ...values }));
    } else {
      dispatch(postTask({ stepId: stepId, progressPercentage: 0, taskStatus: taskType.TODO, ...values }));
    }
  };

  useEffect(() => {
    if (props.task) {
      methods.reset({
        name: props.task.name,
        description: props.task.description,
        dueDate: new Date(props.task.dueDate),
        priority: priorityStringToNumber(props.task.priority),
      });
    }
  }, [methods, props.task]);

  useCloseModalOnDoneFetchStatus({ status: taskPostFetchStatus, clearFunction: clearTaskPostFetchStatus, handleClose: props.handleClose });

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-app-task"
      aria-describedby="modal-modal-description"
      sx={{ overflowY: 'scroll', overflowX: 'hidden', marginBottom: '15px' }}
    >
      <div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} key={'addtask'}>
            <div className="add-task-container">
              <h1>Nowy task</h1>
              <div className="task-form">
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
                <CustomDatePicker
                  placeholder={'mm/dd/yyyy'}
                  min={new Date()}
                  name={'dueDate'}
                  label={'Deadline'}
                  helperText={methods.formState.errors.dueDate?.message}
                  error={!!methods.formState.errors.dueDate}
                />
              </div>
              <div className="task-priority">
                <p>Priorytet</p>
                <span className="priority-span">
                  <CustomPriorityField name="priority" />
                  <PriorityNameDisplayer priorityFieldName="priority" />
                </span>
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

export default FormTaskModal;
