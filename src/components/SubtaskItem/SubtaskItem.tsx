import './styles.scss';
import { projectSubtask } from 'core/types/api/subtask.request.types';
import { FC } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CircleIcon from '@mui/icons-material/Circle';
import { Tooltip } from '@mui/material';
import CustomButton from 'components/CustomButton/CustomButton';

const SubtaskItem: FC<{ subtask: projectSubtask; onSubtaskDelete: any }> = ({ subtask, onSubtaskDelete }) => {
  return (
    <div className="subtask-item">
      <div className="task-name-container">
        <CircleIcon fontSize="small" />
        <span>{subtask.name}</span>
      </div>
      <div className="buttons-container">
        <Tooltip title="Usuń Projekt">
          <DeleteIcon
            onClick={() => {
              onSubtaskDelete(subtask.id);
            }}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default SubtaskItem;
