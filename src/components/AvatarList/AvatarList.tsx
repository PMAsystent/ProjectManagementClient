import React, { FC, useState } from 'react';
import { Avatar, Stack, Tooltip } from '@mui/material';
import { stringToColor } from 'core/utils';
import { projectAssignmentsType } from 'core/types/api/assigned.request.types';
import AddIcon from '@mui/icons-material/Add';
import ProjectAssignedModal from 'containers/ProjectAssignedModal/ProjectAssignedModal';
import VisibilityGuard from 'core/hoc/VisibilityGuard';

const AvatarList: FC<{ users: Array<projectAssignmentsType>; member: string; disabled?: boolean }> = ({ users, member, disabled }) => {
  const [assignedUsersModalOpen, setAssignedUsersModalOpen] = useState(false);

  return (
    <Stack direction="row" spacing={1}>
      {users.length > 3 ? (
        <>
          {users.slice(0, 3).map((user) => {
            const { userName } = user;
            return (
              <Tooltip key={userName} title={userName}>
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
                  return <div key={userName}>{userName}</div>;
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
            <Tooltip key={userName} title={userName}>
              <Avatar key={userName} sx={{ bgcolor: stringToColor(userName) }}>
                {userName[0].toUpperCase()}
              </Avatar>
            </Tooltip>
          );
        })
      )}
      <VisibilityGuard member={member}>
        <Tooltip title="Edycja przypisanych użytkowników">
          <Avatar
            onClick={() => {
              if (!disabled) setAssignedUsersModalOpen(true);
            }}
            sx={{ cursor: !disabled ? 'pointer' : 'default', bgcolor: !disabled ? 'rgb(255, 153, 0)' : 'rgb(180,177,177)' }}
          >
            <AddIcon />
          </Avatar>
        </Tooltip>
      </VisibilityGuard>
      {assignedUsersModalOpen && <ProjectAssignedModal open={assignedUsersModalOpen} handleClose={() => setAssignedUsersModalOpen(false)} />}
    </Stack>
  );
};

export default AvatarList;
