import './styles.scss';
import CustomInput from 'components/CustomInput/CustomInput';
import SubtaskItem from 'components/SubtaskItem/SubtaskItem';
import { projectSubtask } from 'core/types/api/subtask.request.types';
import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import CustomButton from 'components/CustomButton/CustomButton';
import { deleteSubtask, postSubtask, updateSubtaskStatus } from '../../redux/subtask/subtask.slice';
import { selectTaskDetails } from 'redux/task/task.slice';

const validationSchema = yup.object({
  name: yup.string().required('Nazwa jest wymagana').min(3, 'Nazwa musi mieć conajmniej 3 znaki').max(30, 'Nazwa musi mieć mniej niż 30 znaków'),
});

const SubtaskView: FC<{ handleClose: any }> = ({ handleClose }) => {
  const dispatch = useDispatch();
  const taskDetails = useSelector(selectTaskDetails);
  const [helperText, setHelperText] = useState('');
  const [error, setError] = useState(false);
  const [newSubtaskName, setNewSubtaskName] = useState('');
  const [enabledSubtaskId, setEnabledSubtaskId] = useState(0);
  const onAdd = async () => {
    try {
      await validationSchema.validate({ name: newSubtaskName });
      dispatch(postSubtask({ taskId: taskDetails?.id || 0, isDone: false, name: newSubtaskName }));
      setError(false);
      setHelperText('');
      setNewSubtaskName('');
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setError(true);
        setHelperText(err.errors.join('. '));
      }
    }
  };

  const onDelete = (subtaskId: number) => {
    dispatch(deleteSubtask({ taskId: taskDetails?.id || 0, id: subtaskId }));
  };

  const onStateChange = (subtaskId: number, status: boolean) => {
    dispatch(updateSubtaskStatus({ taskId: taskDetails?.id || 0, status: status, id: subtaskId }));
  };

  const onKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      onAdd();
      event.preventDefault();
    }
  };

  const disableOtherInputs = (id: number) => {
    setEnabledSubtaskId(id);
  };

  return (
    <div className="subtasks-container">
      <div className="add-subtask-container">
        <CustomInput
          placeholder={'Wpisz nazwę subtaska'}
          label={'Dodaj subtask'}
          type="text"
          helperText={helperText}
          error={error}
          value={newSubtaskName}
          onKeyPress={(event: any) => {
            onKeyPress(event);
          }}
          onChange={(event: any) => setNewSubtaskName(event.target.value)}
        />
        <CustomButton type="button" className="btn-success" onClick={() => onAdd()}>
          Dodaj
        </CustomButton>
      </div>
      <div className="subtasks-list-container">
        {taskDetails &&
          taskDetails.subtasks.length > 0 &&
          taskDetails.subtasks.map((subtask: projectSubtask) => {
            return (
              <SubtaskItem
                key={subtask.id}
                subtask={subtask}
                onSubtaskDelete={onDelete}
                onSubtaskStateChange={onStateChange}
                setEnabledSubtaskId={disableOtherInputs}
                enabledSubtaskId={enabledSubtaskId}
              />
            );
          })}
      </div>
      <div className="buttons">
        <CustomButton type="button" className="btn-go-back" onClick={() => handleClose()}>
          Wróć
        </CustomButton>
      </div>
    </div>
  );
};

export default SubtaskView;
