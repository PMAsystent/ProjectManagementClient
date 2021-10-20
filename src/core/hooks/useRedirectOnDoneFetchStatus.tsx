import { FC, useEffect } from 'react';
import { fetchStatues } from '../enums/redux.statues';
import { history } from 'core/utils';
import { useDispatch } from 'react-redux';

const useRedirectOnDoneFetchStatus: FC<{ status: string | null; path: string; clearFunction: any }> = ({ status, path, clearFunction }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === fetchStatues.FULFILLED) history.push(path);
  }, [status, path]);

  useEffect(() => {
    return () => {
      dispatch(clearFunction());
    };
  }, [dispatch, clearFunction]);

  return null;
};

export default useRedirectOnDoneFetchStatus;
