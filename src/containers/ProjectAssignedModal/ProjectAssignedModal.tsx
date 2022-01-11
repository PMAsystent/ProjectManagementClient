import React, { FC, useCallback, useEffect, useState } from 'react';
import './styles.scss';
import { MenuItem, Modal, Select } from '@mui/material';
import CustomButton from '../../components/CustomButton/CustomButton';
import AsyncAutocomplete from '../../components/AsyncAutocomplete/AsyncAutocomplete';
import AssignedUserList from '../../components/AssignedUsersList/AssignedUserList';
import { debounce } from 'lodash';
import { findUsers } from '../../api/utils.auth';
import SnackbarUtils from '../../core/utils/SnackbarUtils';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearProjectAssignmentsDeleteFetchStatus,
  clearProjectAssignmentsPostFetchStatus,
  deleteProjectAssignments,
  getProjectAssignments,
  postProjectAssignments,
  putProjectAssignments,
  selectProjectAssignments,
  selectProjectAssignmentsGetFetchStatus,
} from '../../redux/projectAssignments/projectAssignments.slice';
import { useParams } from 'react-router-dom';
import { projectRoleEnum } from '../../core/enums/project.role';
import { projectMemberEnum } from '../../core/enums/project.member';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { fetchStates } from '../../core/enums/redux.statues';
import { setProjectAssignedUsers } from '../../redux/project/project.slice';
import { projectAssignmentsType } from '../../core/types/api/assigned.request.types';

const ProjectAssignedModal: FC<{ open: boolean; handleClose: any }> = ({ open, handleClose }) => {
  const [usersOptionsLoading, setUsersOptionsLoading] = useState(false);
  const [usersOptions, setUsersOptions] = useState<any[]>([]);
  const dispatch = useDispatch();
  const users = useSelector(selectProjectAssignments);
  const projectAssignmentsGetFetchStatus = useSelector(selectProjectAssignmentsGetFetchStatus);
  const { projectid } = useParams<{ projectid: string }>();

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
    if (!users.find((user) => user.userId === value.id)) {
      dispatch(
        postProjectAssignments({
          userId: value.id,
          projectId: +projectid,
          projectRole: projectRoleEnum.MEMBER.value,
          memberType: projectMemberEnum.DEVELOPER.value,
        })
      );
    } else {
      SnackbarUtils.warning('Użytkownik jest już dodany');
    }
  };

  const onClose = () => {
    dispatch(clearProjectAssignmentsPostFetchStatus());
    dispatch(clearProjectAssignmentsDeleteFetchStatus());
    handleClose();
  };

  const handleRemoveAssignment = (user: any) => {
    dispatch(deleteProjectAssignments({ userId: user.userId, projectId: +projectid }));
  };

  const handleOnChangeMember = (user: projectAssignmentsType, value: string) => {
    dispatch(
      putProjectAssignments({
        userId: user.userId,
        projectId: +projectid,
        memberType: value,
        projectRole: user.projectRole,
      })
    );
  };

  const handleOnChangeRole = (user: projectAssignmentsType, value: string) => {
    dispatch(
      putProjectAssignments({
        userId: user.userId,
        projectId: +projectid,
        memberType: user.memberType,
        projectRole: value,
      })
    );
  };

  useEffect(() => {
    dispatch(getProjectAssignments(+projectid));
  }, [dispatch, projectid]);

  useEffect(() => {
    if (projectAssignmentsGetFetchStatus === fetchStates.FULFILLED) {
      dispatch(setProjectAssignedUsers(users));
    }
  }, [dispatch, projectAssignmentsGetFetchStatus, users]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-project-assigned"
      aria-describedby="modal-project-assigned"
      sx={{ overflowY: 'scroll', overflowX: 'hidden', marginBottom: '15px' }}
    >
      <div>
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
              addtionalActions={(user: any, isCurrentUser = false) => {
                return (
                  <>
                    <Select readOnly={isCurrentUser} value={user.projectRole} onChange={(e) => handleOnChangeRole(user, e.target.value)}>
                      {Object.values(projectRoleEnum).map((role: { name: string; value: string }) => (
                        <MenuItem key={role.value} value={role.value}>
                          {role.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <Select value={user.memberType} onChange={(e) => handleOnChangeMember(user, e.target.value)}>
                      {Object.values(projectMemberEnum).map((member: { name: string; value: string }) => (
                        <MenuItem key={member.value} value={member.value}>
                          {member.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <PersonRemoveIcon onClick={() => handleRemoveAssignment(user)} />
                  </>
                );
              }}
            />
          </div>
          <div className="buttons">
            <CustomButton type="button" className="btn-go-back" onClick={onClose}>
              Zamknij
            </CustomButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProjectAssignedModal;
