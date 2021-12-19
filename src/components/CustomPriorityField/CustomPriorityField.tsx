import React, { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import PriorityPicker from 'components/PriorityPicker/PriorityPicker';
import './styles.scss';

const CustomPriorityField: FC<{ name: string }> = ({ name }) => {
  const { control } = useFormContext();

  return <Controller control={control} name={name} render={({ field }) => <PriorityPicker {...field} />} />;
};

export default CustomPriorityField;
