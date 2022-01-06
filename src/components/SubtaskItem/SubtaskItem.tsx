import { projectSubtask } from 'core/types/api/subtask.request.types';
import { FC } from 'react';

const SubtaskItem: FC<{ subtask: projectSubtask }> = ({ subtask }) => {
  return (
    <div>
      <h1>{subtask.name}</h1>
    </div>
  );
};

export default SubtaskItem;
