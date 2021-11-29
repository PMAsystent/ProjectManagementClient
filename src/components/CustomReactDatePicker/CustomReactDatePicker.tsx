import React, { FC } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.scss';
import { Controller } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';

const CustomReactDatePicker: FC<any> = ({ label, control, min, name, error, helperText, ...props }) => {
  return (
    <div className="custom-date-picker">
      {label && <label htmlFor={props.name}>{label}</label>}
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

export default CustomReactDatePicker;
