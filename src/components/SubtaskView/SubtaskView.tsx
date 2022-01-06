import { yupResolver } from '@hookform/resolvers/yup';
import CustomInput from 'components/CustomInput/CustomInput';
import SubtaskItem from 'components/SubtaskItem/SubtaskItem';
import { projectSubtask } from 'core/types/api/subtask.request.types';
import { taskDetailsType } from 'core/types/api/task.request.types';
import { FC, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup.string().required('Nazwa jest wymagana').min(3, 'Nazwa musi mieć conajmniej 3 znaki').max(30, 'Nazwa musi mieć mniej niż 30 znaków'),
});

const SubtaskView: FC<{ task: taskDetailsType }> = ({ task }) => {
  const dispatch = useDispatch();

  const defaultValue: any = useMemo(
    () => ({
      name: '',
    }),
    []
  );

  const methods = useForm({
    defaultValues: useMemo(() => {
      return defaultValue;
    }, [defaultValue]),
    resolver: yupResolver(validationSchema),
  });

  return (
    <div className="subtasks-container">
      <CustomInput
        placeholder={'Wpisz nazwę subtaska'}
        label={'Dodaj subtask'}
        type="text"
        helperText={methods.formState.errors.name?.message}
        error={!!methods.formState.errors.name}
      />

      {task.subtasks?.length > 0 &&
        task.subtasks.map((subtask: projectSubtask) => {
          return <SubtaskItem subtask={subtask} />;
        })}
    </div>
  );
};

export default SubtaskView;
