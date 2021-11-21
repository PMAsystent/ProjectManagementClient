import React, { FC } from 'react';
import './styles.scss';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';

const BasicSpeedDial: FC<any> = (props) => {
  return (
    <SpeedDial ariaLabel="Speed dial" icon={<SpeedDialIcon />} sx={{ position: 'fixed', bottom: 15, right: 15 }}>
      {props.actions.map((action: any) => (
        <SpeedDialAction onClick={action.handleOnClick} key={action.name} icon={action.icon} tooltipTitle={action.name} />
      ))}
    </SpeedDial>
  );
};

export default BasicSpeedDial;
