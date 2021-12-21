import React, { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const PriorityNameDisplayer: FC<{ priorityFieldName: string }> = ({ priorityFieldName }) => {
  const { watch } = useFormContext();
  const [priorityName, setPriorityName] = useState('NISKI');
  const priorityValue = watch(priorityFieldName, '1');

  useEffect(() => {
    if (priorityValue <= 2) {
      setPriorityName('NISKI');
    } else if (priorityValue <= 4) {
      setPriorityName('ŚREDNI');
    } else {
      setPriorityName('WYSOKI');
    }
  }, [priorityValue]);

  return <h4>{priorityName}</h4>;
};

export default PriorityNameDisplayer;
