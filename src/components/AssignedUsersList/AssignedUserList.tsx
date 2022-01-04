import React, { FC } from 'react';
import './styles.scss';
import { Avatar } from '@mui/material';
import { stringToColor } from 'core/utils';
import { selectUser } from 'redux/auth/auth.slice';
import { useSelector } from 'react-redux';
import { useFormContext } from 'react-hook-form';
import { taskAssignmentsType } from 'core/types/api/assigned.request.types';

const AssignedUserList: FC<{ users: any[]; includeCurrentUser?: boolean; addtionalActions?: any }> = ({
  users,
  includeCurrentUser = true,
  addtionalActions,
}) => {
  const currentUser = useSelector(selectUser);
  return (
    <div className="users-list-container">
      {includeCurrentUser === true && currentUser && (
        <div key={currentUser.userName} className="users-list-item">
          <div className="info">
            <Avatar key={currentUser.userName} sx={{ bgcolor: stringToColor(currentUser.userName) }}>
              {currentUser.userName[0].toUpperCase()}
            </Avatar>
            <span>{currentUser?.userName || currentUser?.email}</span>
          </div>
          {addtionalActions && (
            <div className="actions">{addtionalActions(users.find((user) => user.userId === currentUser.userId) || currentUser, true)}</div>
          )}
        </div>
      )}
      {users.length > 0 &&
        users
          .filter((user) => user.userId !== currentUser?.userId)
          .map((user) => {
            return (
              <div key={user.userName} className="users-list-item">
                <div className="info">
                  <Avatar key={user.userName} sx={{ bgcolor: stringToColor(user.userName) }}>
                    {user.userName[0].toUpperCase()}
                  </Avatar>
                  <span>{user?.userName || user?.email}</span>
                </div>
                {addtionalActions && <div className="actions">{addtionalActions(user)}</div>}
              </div>
            );
          })}
    </div>
  );
};

export default AssignedUserList;
