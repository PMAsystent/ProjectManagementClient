import React, { FC } from 'react';
import './styles.scss';
import { Avatar } from '@mui/material';

const UserList: FC<{ users: any[]; addtionalActions: any }> = ({ users, addtionalActions }) => {
  return (
    <div className="users-list-container">
      <div className="users-list-item">
        <div className="info">
          <Avatar sx={{ width: 25, height: 25 }} src="https://cdn-icons-png.flaticon.com/512/194/194938.png" />
          <span>Obecnie zalogowany</span>
        </div>
      </div>
      {users.length > 0 &&
        users.map((user) => {
          return (
            <div className="users-list-item" key={user.id}>
              <div className="info">
                <Avatar sx={{ width: 25, height: 25 }} src="https://cdn-icons-png.flaticon.com/512/194/194938.png" />
                <span>{user.email}</span>
              </div>
              <div className="actions">{addtionalActions(user)}</div>
            </div>
          );
        })}
    </div>
  );
};

export default UserList;
