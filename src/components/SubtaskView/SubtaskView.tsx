import './styles.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomInput from 'components/CustomInput/CustomInput';
import SubtaskItem from 'components/SubtaskItem/SubtaskItem';
import { projectSubtask } from 'core/types/api/subtask.request.types';
import { taskDetailsType } from 'core/types/api/task.request.types';
import React, { FC, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import CustomButton from 'components/CustomButton/CustomButton';
import { postSubtask } from '../../redux/subtask/subtask.slice';

const validationSchema = yup.object({
  name: yup.string().required('Nazwa jest wymagana').min(3, 'Nazwa musi mieć conajmniej 3 znaki').max(30, 'Nazwa musi mieć mniej niż 30 znaków')
});

const SubtaskView: FC<{ task: taskDetailsType,handleClose:any }> = ({ task,handleClose }) => {
  const dispatch = useDispatch();
  const [helperText, setHelperText] = useState('');
  const [error, setError] = useState(false);

  const onSubmit = (values: any) => {
    dispatch(postSubtask({ taskId: task.id, isDone: false, ...values }));
  };
  return (
    <div className='subtasks-container'>
          <div className='add-subtask-container'>
            <CustomInput
              placeholder={'Wpisz nazwę subtaska'}
              label={'Dodaj subtask'}
              type='text'
              helperText={helperText}
              error={error}
            />
            <CustomButton type='submit' className='btn-success'>
              Dodaj
            </CustomButton>
          </div>
          <div className='subtasks-list-container'>
            {task.subtasks?.length > 0 &&
              task.subtasks.map((subtask: projectSubtask) => {
                return <SubtaskItem subtask={subtask} />;
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
