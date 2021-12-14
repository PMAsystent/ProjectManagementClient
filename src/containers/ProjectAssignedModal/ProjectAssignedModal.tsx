import React, { FC, useCallback, useEffect, useState } from 'react';
import { Modal } from '@mui/material';
import CustomButton from '../../components/CustomButton/CustomButton';
import AsyncAutocomplete from '../../components/AsyncAutocomplete/AsyncAutocomplete';
import AssignedUserList from '../../components/AssignedUsersList/AssignedUserList';
import { debounce } from 'lodash';
import { findUsers } from '../../api/utils';
import SnackbarUtils from '../../core/utils/SnackbarUtils';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearProjectAssignmentsDeleteFetchStatus,
  clearProjectAssignmentsPostFetchStatus,
  deleteProjectAssignments,
  getProjectAssignments,
  postProjectAssignments,
  selectProjectAssignments,
  selectProjectAssignmentsDeleteFetchStatus,
  selectProjectAssignmentsPostFetchStatus,
} from '../../redux/projectAssignments/projectAssignments.slice';
import { useParams } from 'react-router-dom';
import { projectRoleEnum } from '../../core/enums/project.role';
import { projectMemberEnum } from '../../core/enums/project.member';
import { getProject } from '../../redux/project/project.slice';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

const ProjectAssignedModal: FC<{ open: boolean; handleClose: any }> = ({ open, handleClose }) => {
  const [usersOptionsLoading, setUsersOptionsLoading] = useState(false);
  const [usersOptions, setUsersOptions] = useState<any[]>([]);
  const dispatch = useDispatch();
  const users = useSelector(selectProjectAssignments);
  const projectAssignmentsPostFetchStatus = useSelector(selectProjectAssignmentsDeleteFetchStatus);
  const projectAssignmentsDeleteFetchStatus = useSelector(selectProjectAssignmentsPostFetchStatus);

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
          projectRole: projectRoleEnum.DEVELOPER,
          memberType: projectMemberEnum.MEMBER,
        })
      );
    } else {
      SnackbarUtils.warning('Użytkownik jest już dodany');
    }
  };

  const onClose = () => {
    if (projectAssignmentsPostFetchStatus !== null || projectAssignmentsDeleteFetchStatus !== null) {
      dispatch(getProject(+projectid));
      dispatch(clearProjectAssignmentsPostFetchStatus());
      dispatch(clearProjectAssignmentsDeleteFetchStatus());
    }
    handleClose();
  };

  const handleRemoveAssignment = (user: any) => {
    dispatch(deleteProjectAssignments({ userId: user.userId, projectId: +projectid }));
  };

  useEffect(() => {
    dispatch(getProjectAssignments(+projectid));
  }, [dispatch, projectid]);

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
              addtionalActions={(user: any) => {
                return (
                  <>
                    <PersonRemoveIcon onClick={() => handleRemoveAssignment(user)} />
                  </>
                );
              }}
            />
          </div>
          <div className="buttons">
            <CustomButton type="button" className="btn-go-back" onClick={onClose}>
              Wróć
            </CustomButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProjectAssignedModal;
