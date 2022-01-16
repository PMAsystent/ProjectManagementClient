import React, { FC, useEffect, useState } from 'react';
import './styles.scss';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { format } from 'date-fns';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { projectPutTaskType } from '../../core/types/api/task.request.types';
import { taskPriority } from '../../core/enums/task.priority';
import FormTaskModal from '../../containers/FormTaskModal/FormTaskModal';

const TaskItem: FC<{ task: projectPutTaskType; disabled?: boolean }> = ({ task, disabled }) => {
  const [editTaskModal, setEditTaskModal] = useState(false);
  const [priority, setPriority] = useState<{ orange: number[]; white: number[] }>({
    orange: [],
    white: [],
  });

  useEffect(() => {
    if (task.priority === taskPriority.LOW)
      setPriority({
        orange: [1],
        white: [2, 3, 4, 5],
      });

    if (task.priority === taskPriority.MEDIUM)
      setPriority({
        orange: [1, 2, 3],
        white: [4, 5],
      });

    if (task.priority === taskPriority.HIGH)
      setPriority({
        orange: [1, 2, 3, 4, 5],
        white: [],
      });
  }, [task]);

  return (
    <div className="task">
      <span
        style={{ cursor: disabled ? 'default' : 'pointer' }}
        className="task-title"
        onClick={(e) => {
          e.stopPropagation();
          if (!disabled) setEditTaskModal(true);
        }}
      >
        <h2>{task.name}</h2>
      </span>
      <div className="task-priority">
        <p>Priorytet</p>
        <span>
          {priority.orange.map((n) => (
            <FiberManualRecordIcon className="circle-orange" key={n} />
          ))}
          {priority.white.map((n) => (
            <FiberManualRecordIcon key={n} />
          ))}
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
      {editTaskModal && task && <FormTaskModal task={task} open={editTaskModal} handleClose={() => setEditTaskModal(false)} />}
    </div>
  );
};

export default TaskItem;
