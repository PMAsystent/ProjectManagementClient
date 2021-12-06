import React, { FC } from 'react';
import './styles.scss';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { format } from 'date-fns';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { projectTask } from '../../core/types/api/task.request.types';

const TaskItem: FC<{ task: projectTask }> = ({ task }) => {
  return (
    <>
      <h2 className="task-title">{task.name}</h2>
      <div className="task-priority">
        <p>Priorytet</p>
        <span>
          <FiberManualRecordIcon />
          <FiberManualRecordIcon />
          <FiberManualRecordIcon />
          <FiberManualRecordIcon />
          <FiberManualRecordIcon />
        </span>
      </div>
      <div className="task-dueDate">
        <p>Deadline</p>
        <h4>{format(new Date(task.dueDate) || Date.now(), 'dd.MM.yyyy')}</h4>
      </div>
      <div className="task-circle">
        <CircularProgressbar
          styles={buildStyles({
            backgroundColor: '#292929',
          })}
          background
          backgroundPadding={3}
          value={task.progressPercentage}
          text={`${task.progressPercentage}%`}
        />
      </div>
    </>
  );
};

export default TaskItem;
