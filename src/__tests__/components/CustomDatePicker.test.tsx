import React, { FC, useMemo } from 'react';
import { render, screen } from 'test-utils';
import CustomDatePicker from 'components/CustomDatePicker/CustomDatePicker';
import * as yup from 'yup';
import { isValid } from 'date-fns';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider } from 'react-hook-form';
import { fireEvent, waitFor } from '@testing-library/react';

describe('Custom Data Picker Tests', () => {
  let Component: FC<{ error: boolean; helperText: string }>;
  beforeEach(() => {
    Component = ({ error, helperText }) => {
      const validationSchema = yup.object({
        dueDate: yup
          .mixed()
          .test('is-date', 'Data zakończenia jest wymagana', (value) => isValid(value))
          .required('Data zakończenia jest wymagana'),
      });

      const defaultValue = {
        dueDate: '',
      };

      const methods = useForm({
        defaultValues: useMemo(() => {
          return defaultValue;
        }, [defaultValue]),
        resolver: yupResolver(validationSchema),
      });

      return (
        <FormProvider {...methods}>
          <CustomDatePicker min={new Date()} name={'dueDate'} label={'Deadline'} helperText={helperText} error={error} />
        </FormProvider>
      );
    };
  });

  it('Should render the component', () => {
    render(<Component helperText={''} error={false} />);
  });

  it('Should render the component with error', () => {
    render(<Component helperText={'error'} error={true} />);
    screen.getByText(/error/i);
  });

  it('Should render the component select date', async() => {
    const component = render(<Component helperText={''} error={false} />);
    const input = component.container.querySelector('.date-picker');
    if (input) {
      fireEvent.change(input, {
        target: { value: '12/29/2021' },
      });
    }
    await waitFor(() => screen.findByDisplayValue('12/29/2021'));
  });
});
