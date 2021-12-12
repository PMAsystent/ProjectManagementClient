import React, { FC } from 'react';
import './styles.scss';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';

const BasicSpeedDial: FC<{ actions: Array<{ handleOnClick: any; name: string; icon: object }> }> = ({ actions }) => {
  return (
    <SpeedDial data-testid={'speedDial'} ariaLabel="Speed dial" icon={<SpeedDialIcon />} sx={{ position: 'fixed', bottom: 15, right: 15 }}>
      {actions.map((action: any) => (
        <SpeedDialAction
          sx={{ color: 'white' }}
          data-testid={'speedDial-action'}
          onClick={action.handleOnClick}
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
        />
      ))}
    </SpeedDial>
  );
};

export default BasicSpeedDial;
