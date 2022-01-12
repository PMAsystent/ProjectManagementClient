import './styles.scss';
import { projectSubtask } from 'core/types/api/subtask.request.types';
import { FC, useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CircleIcon from '@mui/icons-material/Circle';
import { FormControlLabel, Tooltip } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import CustomInput from 'components/CustomInput/CustomInput';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { updateSubtaskName } from 'redux/subtask/subtask.slice';

const validationSchema = yup.object({
  name: yup.string().required('Nazwa jest wymagana').min(3, 'Nazwa musi mieć conajmniej 3 znaki').max(30, 'Nazwa musi mieć mniej niż 30 znaków'),
});

const SubtaskItem: FC<{
  subtask: projectSubtask;
  onSubtaskDelete: any;
  onSubtaskStateChange: any;
  setEnabledSubtaskId: any;
  enabledSubtaskId: number;
}> = ({ subtask, onSubtaskDelete, onSubtaskStateChange, enabledSubtaskId, setEnabledSubtaskId }) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(subtask.isDone);
  const [helperText, setHelperText] = useState('');
  const [error, setError] = useState(false);
  const [subtaskName, setSubtaskName] = useState(subtask.name);
  const [inputDisabled, setInputDisabled] = useState(true);
  const onAdd = async () => {
    try {
      await validationSchema.validate({ name: subtaskName });
      dispatch(updateSubtaskName({ taskId: subtask.taskId || 0, name: subtaskName, id: subtask.id }));
      setError(false);
      setHelperText('');
      setSubtaskName(subtaskName);
      setInputDisabled(true);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setError(true);
        setHelperText(err.errors.join('. '));
      }
    }
  };

  const onKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      onAdd();
      event.preventDefault();
    }
  };

  const toggleInput = () => {
    setEnabledSubtaskId(subtask.id);
    setInputDisabled(false);
  };

  useEffect(() => {
    if (enabledSubtaskId !== subtask.id) {
      setInputDisabled(true);
    }
  }, [enabledSubtaskId, subtask?.id]);
  return (
    <div className="subtask-item">
      <div className="task-name-container" onDoubleClick={toggleInput}>
        <CircleIcon fontSize="small" />
        <CustomInput
          placeholder={'Wpisz nazwę subtaska'}
          type="text"
          helperText={helperText}
          error={error}
          value={subtaskName}
          readOnly={inputDisabled}
          onKeyPress={(event: any) => {
            onKeyPress(event);
          }}
          onChange={(event: any) => setSubtaskName(event.target.value)}
        />
      </div>
      <div className="buttons-container">
        <FormControlLabel
          label="Zakończony"
          control={
            <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} onClick={(e) => onSubtaskStateChange(subtask.id, !checked)} />
          }
        />
        <Tooltip title="Usuń subtask">
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
