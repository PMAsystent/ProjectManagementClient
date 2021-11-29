import React, { forwardRef } from 'react';
import './styles.scss';

const CustomTextArea = forwardRef(({ label, helperText, error, ...props }: any, ref) => {
  return (
    <div className={`custom-textarea`}>
      {label && <label htmlFor={props.name}>{label}</label>}
      <textarea className={`${error ? 'error' : ''}`} ref={ref} {...props} />
      {helperText && <div className="helperText">{helperText}</div>}
    </div>
  );
});

export default CustomTextArea;
