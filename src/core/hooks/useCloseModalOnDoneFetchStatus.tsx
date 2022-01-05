import { FC, useEffect } from 'react';
import { fetchStates } from '../enums/redux.statues';
import { useDispatch } from 'react-redux';

const useCloseModalOnDoneFetchStatus: FC<{ status: string | null; clearFunction: any; handleClose: any }> = ({
  status,
  clearFunction,
  handleClose,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === fetchStates.FULFILLED) handleClose();
  }, [handleClose, status]);

  useEffect(() => {
    return () => {
      dispatch(clearFunction());
    };
  }, [dispatch, clearFunction]);

  return null;
};

export default useCloseModalOnDoneFetchStatus;
