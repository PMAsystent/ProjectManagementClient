import React, {FC, forwardRef} from 'react';
import "./styles.scss";

const CustomInput = forwardRef(({className ,...props}: any, ref) => {
  return (
    <input className={className} ref={ref} {...props} />
  )
})

export default CustomInput;
