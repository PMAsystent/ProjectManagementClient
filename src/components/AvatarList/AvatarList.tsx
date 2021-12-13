import React, { FC, useState } from 'react';
import { Avatar, Stack, Tooltip } from '@mui/material';
import { stringToColor } from '../../core/utils';
import { projectAssignments } from '../../core/types/api/assigned.request.types';
import AddIcon from '@mui/icons-material/Add';
import ProjectAssignedModal from '../../containers/ProjectAssignedModal/ProjectAssignedModal';

const AvatarList: FC<{ users: Array<projectAssignments> }> = ({ users }) => {
  const [assignedUsersModalOpen, setAssignedUsersModalOpen] = useState(false);

  return (
    <Stack direction="row" spacing={1}>
      {users.length > 3 ? (
        <>
          {users.slice(0, 3).map((user) => {
            const { userName } = user;
            return (
              <Tooltip title={userName}>
                <Avatar key={userName} sx={{ bgcolor: stringToColor(userName) }}>
                  {userName[0].toUpperCase()}
                </Avatar>
              </Tooltip>
            );
          })}
          <Tooltip
            title={
              <>
                {users.slice(3).map((user) => {
                  const { userName } = user;
                  return <div>{userName}</div>;
                })}
              </>
            }
          >
            <Avatar onClick={() => {}}>+{users.length - 3}</Avatar>
          </Tooltip>
        </>
      ) : (
        users.map((user) => {
          const { userName } = user;
          return (
            <Tooltip title={userName}>
              <Avatar key={userName} sx={{ bgcolor: stringToColor(userName) }}>
                {userName[0].toUpperCase()}
              </Avatar>
            </Tooltip>
          );
        })
      )}
      <Tooltip title="Edycja przypisanych użytkowników">
        <Avatar onClick={() => setAssignedUsersModalOpen(true)} sx={{ cursor: 'pointer', bgcolor: 'rgb(255, 153, 0)' }}>
          <AddIcon />
        </Avatar>
      </Tooltip>
      <ProjectAssignedModal propsUsers={users || []} open={assignedUsersModalOpen} handleClose={() => setAssignedUsersModalOpen(false)} />
    </Stack>
  );
};

export default AvatarList;
