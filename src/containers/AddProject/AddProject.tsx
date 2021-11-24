import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import './styles.scss';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomTextArea from '../../components/CustomTextArea/CustomTextArea';
import { MenuItem, Modal, Select } from '@mui/material';
import AsyncAutocomplete from '../../components/AsyncAutocomplete/AsyncAutocomplete';
import { debounce } from 'lodash';
import { findUsers } from '../../api/utils';
import SnackbarUtils from '../../core/utils/SnackbarUtils';
import UserList from '../../components/UsersList/UserList';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { projectMemberEnum } from '../../core/enums/project.member';
import { projectRoleEnum } from '../../core/enums/project.role';

const validationSchema = yup.object({
  name: yup.string().required('Nazwa jest wymagana!'),
  description: yup.string().required('Opis jest wymagany!'),
  dueDate: yup.date().required('Data zakończenia jest wymagana!'),
  assigns: yup.array(),
});

const AddProject: FC<any> = (props) => {
  const [usersOptions, setUsersOptions] = useState<any[]>([]);
  const [usersOptionsLoading, setUsersOptionsLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);

  const defaultValue: any = useMemo(
    () => ({
      name: '',
      description: '',
      dueDate: '',
      assigns: [],
    }),
    []
  );

  const {
    register,
    handleSubmit,
    getValues,
    setValue,

    formState: { errors },
  } = useForm({
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
    const assignsArray: any[] = getValues('assigns');
    if (!assignsArray.find((assign) => assign.id === value.id)) {
      SnackbarUtils.success('Dodano użytkownika');
      assignsArray.push({ ...value, projectRole: projectRoleEnum.DEVELOPER, projectMember: projectMemberEnum.MEMBER });
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
        if (user.id === id) user.projectMember = value;
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
    console.log(values);
  };

  useEffect(() => {
    setValue('assigns', users);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-app-project"
      aria-describedby="modal-modal-description"
      sx={{ overflowY: 'scroll', overflowX: 'hidden', marginBottom: '15px' }}
    >
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
            <UserList
              users={users}
              addtionalActions={(user: any) => {
                return (
                  <>
                    <Select value={user.projectMember} onChange={(e) => handleOnChangeMember(user.id, e.target.value)}>
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
          <CustomInput {...register('assigns')} type="hidden" />
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
