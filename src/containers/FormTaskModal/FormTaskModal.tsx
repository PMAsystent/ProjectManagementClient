import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import './styles.scss';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomTextArea from '../../components/CustomTextArea/CustomTextArea';
import { Button, MenuItem, Modal, Select, Tooltip } from '@mui/material';
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearTaskDetails,
  clearTaskPostFetchStatus,
  deleteTask,
  getTask,
  postTask,
  putTask,
  selectTaskDetails,
  selectTaskDetailsFetchStatus,
  selectTaskPostFetchStatus,
} from '../../redux/task/task.slice';
import { useCloseModalOnDoneFetchStatus } from '../../core/hooks';
import { isValid } from 'date-fns';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { findUsers } from '../../api/utils.auth';
import CustomDatePicker from '../../components/CustomDatePicker/CustomDatePicker';
import CustomPriorityField from 'components/CustomPriorityField/CustomPriorityField';
import PriorityNameDisplayer from 'components/PriorityNameDisplayer/PriorityNameDisplayer';
import { priorityNumberToString, priorityStringToNumber } from 'core/utils';
import { taskType } from '../../core/enums/task.type';
import AsyncAutocomplete from 'components/AsyncAutocomplete/AsyncAutocomplete';
import AssignedUserList from 'components/AssignedUsersList/AssignedUserList';
import SnackbarUtils from 'core/utils/SnackbarUtils';
import { fetchStates } from 'core/enums/redux.statues';
import { deleteTaskAssignment, postTaskAssignment } from 'redux/taskAssignments/taskAssignments.slice';
import SubtaskView from 'components/SubtaskView/SubtaskView';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FeedIcon from '@mui/icons-material/Feed';
import { selectAccessToken } from '../../redux/auth/auth.slice';
import { projectStep } from '../../core/types/api/step.request.types';
import { selectProjectDetails } from '../../redux/project/project.slice';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';

const validationSchema = yup.object({
  name: yup.string().required('Nazwa jest wymagana').min(3, 'Nazwa musi mieć conajmniej 3 znaki').max(30, 'Nazwa musi mieć mniej niż 30 znaków'),
  description: yup.string(),
  dueDate: yup
    .mixed()
    .test('is-date', 'Data zakończenia jest wymagana', (value) => isValid(value))
    .required('Data zakończenia jest wymagana'),
  stepId: yup.string().required('Step jest wymagany'),
});

const FormTaskModal: FC<any> = (props) => {
  const dispatch = useDispatch();
  const taskPostFetchStatus = useSelector(selectTaskPostFetchStatus);
  const taskDetailsFetchStatus = useSelector(selectTaskDetailsFetchStatus);
  const taskDetails = useSelector(selectTaskDetails);
  const projectDetails = useSelector(selectProjectDetails);
  const [deleteTaskModal, setDeleteTaskModal] = useState<boolean>(false);
  const [step, setStep] = useState<number | ''>(props.stepId || '');
  const [steps, setSteps] = useState<projectStep[]>([]);
  const [usersOptions, setUsersOptions] = useState<any[]>([]);
  const [usersOptionsLoading, setUsersOptionsLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [isTaskDetailsView, setIsTaskDetailsView] = useState(true);
  const accessToken = useSelector(selectAccessToken);
  const defaultValue: any = useMemo(
    () => ({
      name: '',
      description: '',
      dueDate: '',
      priority: 1,
      assignedUsers: [],
      stepId: '',
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
    values.assignedUsers = values.assignedUsers.map((users: any) => ({
      userId: users.id,
    }));
    if (props.task) {
      dispatch(putTask({ ...props.task, ...values }));
    } else {
      dispatch(postTask({ progressPercentage: 0, taskStatus: taskType.TODO, ...values }));
    }
  };

  useEffect(() => {
    setSteps(projectDetails?.projectSteps || []);
    if (props.stepId) {
      methods.setValue('stepId', props.stepId + '');
      methods.clearErrors('stepId');
    }
  }, [methods, projectDetails?.projectSteps, props.stepId]);

  useEffect(() => {
    if (props.task) {
      methods.reset({
        name: props.task.name,
        description: props.task.description,
        dueDate: new Date(props.task.dueDate),
        priority: priorityStringToNumber(props.task.priority),
        stepId: props.task.stepId,
      });
      setStep(props.task.stepId);
    }
  }, [methods, props.task]);

  useEffect(() => {
    if (taskDetailsFetchStatus === fetchStates.FULFILLED) {
      setUsers(taskDetails?.assignedUser || []);
    }
  }, [taskDetails?.assignedUser, taskDetailsFetchStatus]);

  useEffect(() => {
    methods.setValue('assignedUsers', users);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  useEffect(() => {
    if (props.task) {
      dispatch(getTask(+props.task.id));
    } else {
      dispatch(clearTaskDetails());
      setUsers([]);
    }
  }, [dispatch, props.task, props.task?.id]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleOnChangeUsersDebounced = useCallback(
    debounce(async (query) => {
      setUsersOptionsLoading(true);
      const response: any = await findUsers(query, accessToken, props.projectId);
      if (response?.count > 0) {
        setUsersOptions(response.users);
      } else {
        setUsersOptions([]);
      }
      setUsersOptionsLoading(false);
    }, 800),
    []
  );

  const handleCloseDeleteTask = (success: boolean) => {
    setDeleteTaskModal(false);
    if (success) {
      dispatch(deleteTask());
    }
  };

  const handleUserSelect = (e: any, value: any) => {
    let assignsArray: any[] = methods.getValues('assignedUsers');
    if (!assignsArray.find((assign) => assign.id === value.id)) {
      if (props.task) {
        dispatch(postTaskAssignment({ userId: value.id, taskId: props.task.id }));
      }
      assignsArray = assignsArray.concat([{ ...value }]);
    } else {
      SnackbarUtils.warning('Użytkownik jest już dodany');
    }
    setUsers(assignsArray);
  };

  const handleOnChangeStep = (value: any) => {
    setStep(value);
    methods.setValue('stepId', value + '');
    methods.clearErrors('stepId');
  };

  const handleRemoveUser = (id: number) => {
    if (props.task) {
      dispatch(deleteTaskAssignment({ userId: id, taskId: props.task.id }));
    }
    setUsers((users) => users.filter((userState) => userState.id !== id));
  };

  useCloseModalOnDoneFetchStatus({
    status: taskPostFetchStatus,
    clearFunction: clearTaskPostFetchStatus,
    handleClose: props.handleClose,
  });

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
              <h1>
                {props.task ? `${props.task.name} - Edycja` : 'Nowy task'}{' '}
                {props.task && (
                  <Tooltip
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteTaskModal(true);
                    }}
                    title="Usuń Taska"
                  >
                    <DeleteIcon id="delete-task" />
                  </Tooltip>
                )}
              </h1>
              {props.task && (
                <Tooltip title="Przełącz widok">
                  <Button
                    size="medium"
                    endIcon={isTaskDetailsView ? <FormatListNumberedIcon /> : <FeedIcon />}
                    className="btn-switch-view"
                    onClick={() => setIsTaskDetailsView(!isTaskDetailsView)}
                  >
                    {isTaskDetailsView ? 'Subtaski' : 'Task'}
                  </Button>
                </Tooltip>
              )}
              {isTaskDetailsView ? (
                <>
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
                    <div className="task-priority">
                      <p>Priorytet</p>
                      <span className="priority-span">
                        <CustomPriorityField name="priority" />
                        <PriorityNameDisplayer priorityFieldName="priority" />
                      </span>
                    </div>
                  </div>
                  <div className="assigns-form">
                    <div style={{ marginBottom: '10px' }}>Step</div>
                    <Select
                      value={step}
                      className="custom-select"
                      onChange={(e) => handleOnChangeStep(e.target.value)}
                      error={!!methods.formState.errors.step}
                    >
                      {Object.values(steps).map((step) => (
                        <MenuItem key={step.id} value={step.id}>
                          {step.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <div className={'step-error'}>{!!methods.formState.errors.step && 'Step jest wymagany'}</div>
                    <CustomInput style={{ width: '0px', height: '0px' }} {...methods.register('stepId')} type="hidden" />
                    <AsyncAutocomplete
                      name={'findUsers'}
                      label={'Dodaj użytkownika'}
                      nameOptionLabel={'email'}
                      onChange={handleOnChangeUsersDebounced}
                      onSelect={handleUserSelect}
                      options={usersOptions}
                      setOptions={setUsersOptions}
                      loading={usersOptionsLoading}
                      clearOnClose
                    />
                    <div className="label">Użytkownicy</div>
                    <AssignedUserList
                      users={users}
                      includeCurrentUser={false}
                      addtionalActions={(user: any) => {
                        return <PersonRemoveIcon onClick={() => handleRemoveUser(user.id)} />;
                      }}
                    />
                  </div>

                  <CustomInput {...methods.register('assignedUsers')} type="hidden" />

                  <div className="buttons">
                    <CustomButton type="button" className="btn-go-back" onClick={props.handleClose}>
                      Wróć
                    </CustomButton>
                    <CustomButton type="submit" className="btn-success">
                      Zapisz
                    </CustomButton>
                  </div>
                </>
              ) : (
                <SubtaskView handleClose={props.handleClose} />
              )}
            </div>
          </form>
        </FormProvider>
        {deleteTaskModal && (
          <ConfirmationModal
            title={'Usuwanie Task'}
            text={`Czy napewno chcesz usunąć ${props.task?.name}?`}
            open={deleteTaskModal}
            handleClose={handleCloseDeleteTask}
          />
        )}
      </div>
    </Modal>
  );
};

export default FormTaskModal;
