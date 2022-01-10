import './styles.scss';
import { projectSubtask } from 'core/types/api/subtask.request.types';
import { FC, useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CircleIcon from '@mui/icons-material/Circle';
import { FormControlLabel, Tooltip } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
const SubtaskItem: FC<{ subtask: projectSubtask; onSubtaskDelete: any; onSubtaskStateChange: any }> = ({
  subtask,
  onSubtaskDelete,
  onSubtaskStateChange,
}) => {
  const [checked, setChecked] = useState(subtask.isDone);

  return (
    <div className="subtask-item">
      <div className="task-name-container">
        <CircleIcon fontSize="small" />
        <span>{subtask.name}</span>
      </div>
      <div className="buttons-container">
        <FormControlLabel
          label="Zakończony"
          control={
            <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} onClick={(e) => onSubtaskStateChange(subtask.id, !checked)} />
          }
        />
        <Tooltip title="Usuń Projekt">
          <DeleteIcon
            fontSize="medium"
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
