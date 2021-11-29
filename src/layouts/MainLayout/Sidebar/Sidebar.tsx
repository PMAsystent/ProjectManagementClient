import { Drawer, Theme, useMediaQuery } from '@mui/material';
import './styles.scss';
import CustomButton from '../../../components/CustomButton/CustomButton';
import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/auth/auth.slice';
import { Apps } from '@material-ui/icons';
import TreeProjectView from '../../../components/TreeProjectView/TreeProjectView';

const Sidebar = (props: { open: any; onClose: any }) => {
  const { open, onClose } = props;
  const lgUp = useMediaQuery('(min-width:1200px)');
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const content = (
    <div className="sidebar-root">
      <div className="top-logo">
        <a href="/">
          <b>LOGO</b>
        </a>
      </div>
      <div className="project-wrapper">
        <div className="project-block">
          <Apps className="project-icon" />
          <h3>Projekty</h3>
        </div>
      </div>
      <TreeProjectView />
      <div className="logout-button-wrapper">
        <CustomButton onClick={handleLogout} className="btn-secondary">
          <h3> Wyloguj </h3>
        </CustomButton>
      </div>
    </div>
  );

  if (lgUp) {
    return (
      <Drawer anchor="left" open variant="permanent">
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer anchor="left" onClose={onClose} open={open} sx={{ zIndex: (theme: Theme) => theme.zIndex.appBar + 100 }} variant="temporary">
      {content}
    </Drawer>
  );
};

export default Sidebar;
