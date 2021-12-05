import React, { FC } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.scss';
import { Controller, useFormContext } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';

const CustomDatePicker: FC<{ label: string; min: any; name: string; error: boolean; helperText: string }> = ({
  label,
  min,
  name,
  error,
  helperText,
}) => {
  const { control } = useFormContext();

  return (
    <div className="custom-date-picker">
      {label && <label htmlFor={name}>{label}</label>}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <ReactDatePicker
            className={`date-picker ${error ? 'date-picker-error' : ''}`}
            minDate={min}
            // placeholderText="Select date"
            onChange={(e) => field.onChange(e)}
            selected={field.value}
          />
        )}
      />
      {helperText && <div className={'helperText'}>{helperText}</div>}
    </div>
  );
};

export default CustomDatePicker;
