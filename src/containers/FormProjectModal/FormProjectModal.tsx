import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import './styles.scss';
import * as yup from 'yup';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomTextArea from '../../components/CustomTextArea/CustomTextArea';
import { MenuItem, Modal, Select } from '@mui/material';
import AsyncAutocomplete from '../../components/AsyncAutocomplete/AsyncAutocomplete';
import { debounce } from 'lodash';
import { findUsers } from '../../api/utils';
import SnackbarUtils from '../../core/utils/SnackbarUtils';
import AssignedUserList from '../../components/AssignedUsersList/AssignedUserList';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { projectMemberEnum } from '../../core/enums/project.member';
import { projectRoleEnum } from '../../core/enums/project.role';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearProjectPostFetchStatus,
  clearProjectPutFetchStatus,
  postProject,
  putProject,
  selectProjectPostFetchStatus,
  selectProjectPutFetchStatus,
} from '../../redux/project/project.slice';
import { useCloseModalOnDoneFetchStatus } from '../../core/hooks';
import { isValid } from 'date-fns';
import CustomDatePicker from '../../components/CustomDatePicker/CustomDatePicker';
import { selectUser } from '../../redux/auth/auth.slice';

const validationSchema = yup.object({
  name: yup.string().required('Nazwa jest wymagana').min(3, 'Nazwa musi mieć conajmniej 3 znaki'),
  description: yup.string().required('Opis jest wymagany').min(20, 'Opis musi mieć conajmniej 20 znaków'),
  dueDate: yup
    .mixed()
    .test('is-date', 'Data zakończenia jest wymagana', (value) => isValid(value))
    .required('Data zakończenia jest wymagana'),
  assignedUsers: yup.array(),
});

const FormProjectModal: FC<any> = (props) => {
  const dispatch = useDispatch();
  const [usersOptions, setUsersOptions] = useState<any[]>([]);
  const [usersOptionsLoading, setUsersOptionsLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const projectPostFetchStatus = useSelector(selectProjectPostFetchStatus);
  const projectPutFetchStatus = useSelector(selectProjectPutFetchStatus);
  const currentUser = useSelector(selectUser);

  const defaultValue: any = useMemo(
    () => ({
      name: '',
      description: '',
      dueDate: '',
      assignedUsers: [],
    }),
    []
  );

  const methods = useForm({
    defaultValues: useMemo(() => {
      return defaultValue;
    }, [defaultValue]),
    resolver: yupResolver(validationSchema),
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleOnChangeUsersDebounced = useCallback(
    debounce(async (query) => {
      setUsersOptionsLoading(true);
      const response: any = await findUsers(query);
      if (response?.count > 0) {
        setUsersOptions(response.users);
      } else {
        setUsersOptions([]);
      }
      setUsersOptionsLoading(false);
    }, 800),
    []
  );

  const handleUserSelect = (e: any, value: any) => {
    const assignsArray: any[] = methods.getValues('assignedUsers');
    if (value.id === currentUser?.userId) {
      SnackbarUtils.warning('Zalogowany użytkownik jest już dodany');
    } else if (!assignsArray.find((assign) => assign.id === value.id)) {
      SnackbarUtils.success('Dodano użytkownika');
      assignsArray.push({ ...value, projectRole: projectRoleEnum.MEMBER.value, memberType: projectMemberEnum.DEVELOPER.value });
    } else {
      SnackbarUtils.warning('Użytkownik jest już dodany');
    }
    setUsers(assignsArray);
  };

  const handleRemoveUser = (id: number) => {
    setUsers((users) => users.filter((userState) => userState.id !== id));
  };

  const handleOnChangeMember = (id: number, value: string) => {
    setUsers((users) =>
      users.map((user) => {
        if (user.id === id) user.memberType = value;
        return user;
      })
    );
  };

  const handleOnChangeRole = (id: number, value: string) => {
    setUsers((users) =>
      users.map((user) => {
        if (user.id === id) user.projectRole = value;
        return user;
      })
    );
  };

  const onSubmit = (values: any) => {
    if (!props.project) {
      values.assignedUsers = values.assignedUsers.map((users: any) => ({
        userId: users.id,
        projectRole: users.projectRole,
        memberType: users.memberType,
      }));
      dispatch(postProject(values));
    } else {
      dispatch(putProject({ id: props.project.id, ...values }));
    }
  };

  useEffect(() => {
    methods.setValue('assignedUsers', users);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  useEffect(() => {
    if (props.project) {
      methods.reset({
        name: props.project.name,
        description: props.project.description,
        dueDate: new Date(props.project.dueDate),
      });
    }
  }, [methods, props.project]);

  useCloseModalOnDoneFetchStatus({ status: projectPostFetchStatus, clearFunction: clearProjectPostFetchStatus, handleClose: props.handleClose });
  useCloseModalOnDoneFetchStatus({ status: projectPutFetchStatus, clearFunction: clearProjectPutFetchStatus, handleClose: props.handleClose });

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-app-project"
      aria-describedby="modal-modal-description"
      sx={{ overflowY: 'scroll', overflowX: 'hidden', marginBottom: '15px' }}
    >
      <div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} key={'addProject'}>
            <div className={props.project ? 'edit-project-container' : 'add-project-container'}>
              <h1>{props.project ? `${props.project.name} - Edycja` : 'Nowy projekt'}</h1>
              <div className="project-form">
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
              {!props.project && (
                <>
                  <div className="assigns-form">
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
                      addtionalActions={(user: any, isCurrentUser = false) => {
                        return (
                          <>
                            <Select
                              value={isCurrentUser ? projectRoleEnum.SUPER_MEMBER.value : user.projectRole}
                              onChange={(e) => handleOnChangeRole(user.id, e.target.value)}
                              readOnly={isCurrentUser}
                            >
                              {Object.values(projectRoleEnum).map((role: { name: string; value: string }) => (
                                <MenuItem key={role.value} value={role.value}>
                                  {role.name}
                                </MenuItem>
                              ))}
                            </Select>
                            <Select
                              value={isCurrentUser ? projectMemberEnum.MANAGER.value : user.memberType}
                              onChange={(e) => handleOnChangeMember(user.id, e.target.value)}
                              readOnly={isCurrentUser}
                            >
                              {Object.values(projectMemberEnum).map((member: { name: string; value: string }) => (
                                <MenuItem key={member.value} value={member.value}>
                                  {member.name}
                                </MenuItem>
                              ))}
                            </Select>
                            {!isCurrentUser && <PersonRemoveIcon onClick={() => handleRemoveUser(user.id)} />}
                          </>
                        );
                      }}
                    />
                  </div>
                  <CustomInput {...methods.register('assignedUsers')} type="hidden" />
                </>
              )}
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

export default FormProjectModal;
