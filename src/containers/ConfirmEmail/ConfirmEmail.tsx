import React, { useEffect } from 'react';
import './styles.scss';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useHistory, useLocation } from 'react-router-dom';
import { getLoginPath } from '../../core/routes';
import { getConfirmEmail, selectGetConfirmEmailFetchStatus } from '../../redux/auth/auth.slice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatues } from '../../core/enums/redux.statues';
import AuthSpinner from '../../components/AuthSpinner/AuthSpinner';

const ConfirmEmail = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const getConfirmEmailFetchStatus = useSelector(selectGetConfirmEmailFetchStatus);

  const handleGotoLoginPage = () => {
    history.push(getLoginPath);
  };

  useEffect(() => {
    const { search } = location;
    if (search) {
      dispatch(getConfirmEmail(search));
    }
  }, [dispatch, location]);

  return (
    <div className="container">
      <div className="text">
        <h1>PM ASYSTENT</h1>
        <h3>Potwierdzenie emaila</h3>
      </div>
      <div className="form">
        <h3 className="email-title">
          {getConfirmEmailFetchStatus === fetchStatues.FULFILLED && 'Email został potwierdzony'}
          {getConfirmEmailFetchStatus === fetchStatues.REJECTED && 'Wystąpił problem z potwierdzeniem'}
          {getConfirmEmailFetchStatus === fetchStatues.PENDING && <AuthSpinner />}
        </h3>
        <CustomButton type="button" className="btn-primary" onClick={handleGotoLoginPage}>
          Przejdź do logowania
        </CustomButton>
      </div>
    </div>
  );
};

export default ConfirmEmail;
