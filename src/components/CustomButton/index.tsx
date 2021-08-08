import React, {FC} from 'react';
import "./styles.scss";

const CustomButton: FC<any> = ({...props}) => {
  return (
    <button {...props} />
  );
};

export default CustomButton;
