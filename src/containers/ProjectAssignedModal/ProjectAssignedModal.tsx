import React, { FC, useCallback, useMemo, useState } from 'react';
import { Modal } from '@mui/material';
import CustomButton from '../../components/CustomButton/CustomButton';
import AsyncAutocomplete from '../../components/AsyncAutocomplete/AsyncAutocomplete';
import AssignedUserList from '../../components/AssignedUsersList/AssignedUserList';
import CustomInput from '../../components/CustomInput/CustomInput';
import { debounce } from 'lodash';
import { findUsers } from '../../api/utils';
import SnackbarUtils from '../../core/utils/SnackbarUtils';
import { projectRoleEnum } from '../../core/enums/project.role';
import { projectMemberEnum } from '../../core/enums/project.member';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { projectAssignments } from '../../core/types/api/assigned.request.types';

const validationSchema = yup.object({
  assignedUsers: yup.array(),
});

const ProjectAssignedModal: FC<{ propsUsers: Array<projectAssignments>; open: boolean; handleClose: any }> = ({ propsUsers, open, handleClose }) => {
  const [users, setUsers] = useState<any[]>(propsUsers);
  const [usersOptionsLoading, setUsersOptionsLoading] = useState(false);
  const [usersOptions, setUsersOptions] = useState<any[]>([]);

  const defaultValue: any = useMemo(
    () => ({
      assignedUsers: [],
    }),
    []
  );

  const { register, getValues, handleSubmit } = useForm({
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
    const assignsArray: any[] = getValues('assignedUsers');
    if (!assignsArray.find((assign) => assign.id === value.id)) {
      SnackbarUtils.success('Dodano użytkownika');
      assignsArray.push({ ...value, projectRole: projectRoleEnum.DEVELOPER, memberType: projectMemberEnum.MEMBER });
    } else {
      SnackbarUtils.warning('Użytkownik jest już dodany');
    }
    setUsers(assignsArray);
  };

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-project-assigned"
      aria-describedby="modal-project-assigned"
      sx={{ overflowY: 'scroll', overflowX: 'hidden', marginBottom: '15px' }}
    >
      <div>
        <form onSubmit={handleSubmit(onSubmit)} key={'addProject'}>
          <div className="assigned-project-container">
            <h1>Przypisani Użytkownicy</h1>
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
                // addtionalActions={(user: any) => {
                //   return (
                //     <>
                //       <Select value={user.memberType} onChange={(e) => handleOnChangeMember(user.id, e.target.value)}>
                //         {Object.values(projectMemberEnum).map((value: string) => (
                //           <MenuItem key={value} value={value}>
                //             {value}
                //           </MenuItem>
                //         ))}
                //       </Select>
                //       <Select value={user.projectRole} onChange={(e) => handleOnChangeRole(user.id, e.target.value)}>
                //         {Object.values(projectRoleEnum).map((value: string) => (
                //           <MenuItem key={value} value={value}>
                //             {value}
                //           </MenuItem>
                //         ))}
                //       </Select>
                //       <PersonRemoveIcon onClick={() => handleRemoveUser(user.id)} />
                //     </>
                //   );
                // }}
              />
            </div>
            <div className="buttons">
              <CustomButton type="button" className="btn-go-back" onClick={handleClose}>
                Wróć
              </CustomButton>
            </div>
            <CustomInput {...register('assignedUsers')} type="hidden" />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ProjectAssignedModal;
