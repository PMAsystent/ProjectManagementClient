import { Drawer, Theme, useMediaQuery } from '@mui/material';
import './styles.scss';
import CustomButton from '../../../components/CustomButton/CustomButton';
import React from 'react';
import { useDispatch } from 'react-redux';
import { logout, postLogout } from '../../../redux/auth/auth.slice';
import { Apps } from '@material-ui/icons';
import TreeProjectView from '../../../components/TreeProjectView/TreeProjectView';
import { getDashboardPath } from '../../../core/routes';
import { useHistory } from 'react-router-dom';

const Sidebar = (props: { open: any; onClose: any }) => {
  const { open, onClose } = props;
  const lgUp = useMediaQuery('(min-width:1200px)');
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(postLogout());
    dispatch(logout());
  };

  const handleGotoHomepage = () => {
    history.push(getDashboardPath);
  };

  const content = (
    <div className="sidebar-root">
      <div className="top-logo" onClick={handleGotoHomepage}>
        <b>PM ASYSTENT</b>
      </div>
      <div className="project-wrapper">
        <div className="project-block" onClick={handleGotoHomepage}>
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
