import React, { FC, useState } from 'react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import './styles.scss';
const PriorityPicker: FC<{ value: number; onChange: any }> = ({ value, onChange }) => {
  const [priority, setPriority] = useState<{ key: number; isSelected: boolean; isHovered: boolean }[]>([
    { key: 1, isSelected: value >= 1, isHovered: false },
    { key: 2, isSelected: value >= 2, isHovered: false },
    { key: 3, isSelected: value >= 3, isHovered: false },
    { key: 4, isSelected: value >= 4, isHovered: false },
    { key: 5, isSelected: value >= 5, isHovered: false },
  ]);

  const handleOnPriorityHover = (key: any) => {
    setPriority(
      priority.map((x) => {
        x.isHovered = x.key <= key;
        return x;
      })
    );
  };
  const handleOnPriorityClick = (key: any) => {
    setPriority(
      priority.map((x) => {
        x.isHovered = false;
        x.isSelected = x.key <= key;
        return x;
      })
    );
    onChange(key);
  };
  const handleOnPriorityHoverEnd = (key: any) => {
    setPriority(
      priority.map((x) => {
        x.isHovered = false;
        return x;
      })
    );
  };
  return (
    <>
      {priority.map((x) => (
        <FiberManualRecordIcon
          key={x.key}
          data-key={x.key}
          data-testid={x.isSelected ? 'active' : ''}
          className={x.isHovered ? 'circle-orange-hover' : x.isSelected ? 'circle-orange' : 'circle'}
          onMouseOver={(event) => handleOnPriorityHover(event.currentTarget.getAttribute('data-key'))}
          onMouseLeave={(event) => handleOnPriorityHoverEnd(event.currentTarget.getAttribute('data-key'))}
          onClick={(event) => handleOnPriorityClick(event.currentTarget.getAttribute('data-key'))}
        />
      ))}
    </>
  );
};

export default PriorityPicker;
