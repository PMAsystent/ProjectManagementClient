import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import PriorityPicker from 'components/PriorityPicker/PriorityPicker';
import './styles.scss';

const CustomPriorityField: FC<{ name: string }> = ({ name }) => {
  const { setValue, getValues } = useFormContext();

  const onChange = (n: number) => {
    setValue(name, n);
  };

  return <PriorityPicker value={getValues(name)} onChange={onChange} />;
};

export default CustomPriorityField;
