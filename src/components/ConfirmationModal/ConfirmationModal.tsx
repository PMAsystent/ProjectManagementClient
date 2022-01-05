import React, { FC } from 'react';
import { Modal } from '@mui/material';
import './styles.scss';
import CustomButton from '../CustomButton/CustomButton';

const ConfirmationModal: FC<{ open: boolean; handleClose: any; element: string }> = ({ open, handleClose, element }) => {
  return (
    <Modal
      open={open}
      onClose={() => handleClose(false)}
      aria-labelledby="modal-app-task"
      aria-describedby="modal-modal-description"
      sx={{ overflowY: 'scroll', overflowX: 'hidden', marginBottom: '15px' }}
    >
      <div className="confirm-container">
        <h1>Usuwanie elementu</h1>
        <p>
          Czy napewno chcesz usunąć <b>{element}</b> ?
        </p>
        <div className="buttons">
          <CustomButton className="btn-success" onClick={() => handleClose(true)}>Tak</CustomButton>
          <CustomButton className="btn-go-back" onClick={() => handleClose(false)}>Anuluj</CustomButton>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
