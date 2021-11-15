import { Drawer, Theme, useMediaQuery } from '@mui/material';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import './styles.scss';
import CustomButton from '../CustomButton/CustomButton';
import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/auth.slice';

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
        <b>LOGO</b>
      </div>
      <TreeView
        aria-label="Apps navigator"
        className="sidebar-tree"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        <TreeItem nodeId="1" label="App1">
          <TreeItem nodeId="2" label="Task1" />
        </TreeItem>
        <TreeItem nodeId="3" label="App2">
          <TreeItem nodeId="4" label="Task2" />
          <TreeItem nodeId="5" label="Task3">
            <TreeItem nodeId="6" label="Subtask1" />
          </TreeItem>
        </TreeItem>
      </TreeView>
      <CustomButton onClick={handleLogout} className="btn-primary">
        Wyloguj
      </CustomButton>
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
