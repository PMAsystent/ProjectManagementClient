import React from 'react';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useDispatch } from 'react-redux';
import { logout } from 'redux/auth/auth.slice';

const Dashboard = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <CustomButton onClick={handleLogout} className="btn-primary">
        Wyloguj
      </CustomButton>
    </div>
  );
};

export default Dashboard;
