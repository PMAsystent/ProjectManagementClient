import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import './styles.scss';
import * as yup from 'yup';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
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
import { clearProjectPostFetchStatus, postProject, selectProjectPostFetchStatus } from '../../redux/project/project.slice';
import { useCloseModalOnDoneFetchStatus } from '../../core/hooks';
import { isValid } from 'date-fns';
import CustomDatePicker from '../../components/CustomDatePicker/CustomDatePicker';

const validationSchema = yup.object({
  name: yup.string().required('Nazwa jest wymagana').min(3, 'Nazwa musi mieć conajmniej 3 znaki'),
  description: yup.string().required('Opis jest wymagany').min(20, 'Opis musi mieć conajmniej 20 znaków'),
  dueDate: yup
    .mixed()
    .test('is-date', 'Data zakończenia jest wymagana', (value) => isValid(value))
    .required('Data zakończenia jest wymagana'),
  assignedUsers: yup.array(),
});
const AddTaskModal: FC<any> = (props) => {
  const dispatch = useDispatch();
  const [usersOptions, setUsersOptions] = useState<any[]>([]);
  const [usersOptionsLoading, setUsersOptionsLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [priority, setPriority] = useState<{ key: number; isSelected: boolean; isHovered: boolean }[]>([
    { key: 1, isSelected: true, isHovered: false },
    { key: 2, isSelected: false, isHovered: false },
    { key: 3, isSelected: false, isHovered: false },
    { key: 4, isSelected: false, isHovered: false },
    { key: 5, isSelected: false, isHovered: false },
  ]);
  const [priorityName, setPriorityName] = useState('NISKI');
  const projectPostFetchStatus = useSelector(selectProjectPostFetchStatus);

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
    if (!assignsArray.find((assign) => assign.id === value.id)) {
      SnackbarUtils.success('Dodano użytkownika');
      assignsArray.push({ ...value, projectRole: projectRoleEnum.DEVELOPER, memberType: projectMemberEnum.MEMBER });
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

  const handleOnPriorityHover = (key: any) => {
    setPriority(
      priority.map((x) => {
        if (x.key <= key) {
          x.isHovered = true;
        } else {
          x.isHovered = false;
        }
        return x;
      })
    );
  };
  const handleOnPriorityClick = (key: any) => {
    setPriority(
      priority.map((x) => {
        x.isHovered = false;
        if (x.key <= key) {
          x.isSelected = true;
        } else {
          x.isSelected = false;
        }
        return x;
      })
    );
    if (key < 3) {
      setPriorityName('NISKI');
    } else if (key < 5) {
      setPriorityName('ŚREDNI');
    } else {
      setPriorityName('WYSOKI');
    }
  };
  const handleOnPriorityHoverEnd = (key: any) => {
    setPriority(
      priority.map((x) => {
        x.isHovered = false;
        return x;
      })
    );
  };

  const onSubmit = (values: any) => {
    values.assignedUsers = values.assignedUsers.map((users: any) => ({
      userId: users.id,
      projectRole: users.projectRole,
      memberType: users.memberType,
    }));
    dispatch(postProject(values));
  };

  useEffect(() => {
    methods.setValue('assignedUsers', users);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  useCloseModalOnDoneFetchStatus({ status: projectPostFetchStatus, clearFunction: clearProjectPostFetchStatus, handleClose: props.handleClose });

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
            <div className="add-project-container">
              <h1>Nowy task</h1>
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
              <div className="task-priority">
                <p>Priorytet</p>
                <span>
                  {priority.map((x) => (
                    <FiberManualRecordIcon
                      key={x.key}
                      data-key={x.key}
                      className={x.isHovered ? 'circle-orange-hover' : x.isSelected ? 'circle-orange' : 'circle'}
                      onMouseOver={(event) => handleOnPriorityHover(event.currentTarget.getAttribute('data-key'))}
                      onMouseLeave={(event) => handleOnPriorityHoverEnd(event.currentTarget.getAttribute('data-key'))}
                      onClick={(event) => handleOnPriorityClick(event.currentTarget.getAttribute('data-key'))}
                    />
                  ))}
                  <h4>{priorityName}</h4>
                </span>
              </div>
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
                  addtionalActions={(user: any) => {
                    return (
                      <>
                        <Select value={user.memberType} onChange={(e) => handleOnChangeMember(user.id, e.target.value)}>
                          {Object.values(projectMemberEnum).map((value: string) => (
                            <MenuItem key={value} value={value}>
                              {value}
                            </MenuItem>
                          ))}
                        </Select>
                        <Select value={user.projectRole} onChange={(e) => handleOnChangeRole(user.id, e.target.value)}>
                          {Object.values(projectRoleEnum).map((value: string) => (
                            <MenuItem key={value} value={value}>
                              {value}
                            </MenuItem>
                          ))}
                        </Select>
                        <PersonRemoveIcon onClick={() => handleRemoveUser(user.id)} />
                      </>
                    );
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
            </div>
          </form>
        </FormProvider>
      </div>
    </Modal>
  );
};

export default AddTaskModal;
