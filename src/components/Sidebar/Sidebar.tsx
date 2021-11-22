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
import { Apps } from '@material-ui/icons';

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
      <div className="project-wrapper">
        <div className="project-block">
          <Apps className="project-icon" />
          <h3>Projekty</h3>
        </div>
      </div>
      <TreeView
        aria-label="Apps navigator"
        className="sidebar-tree"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        <TreeItem nodeId="1" label="App1">
          <TreeItem nodeId="2" label="Task1" className="tree-item-task" />
        </TreeItem>
        <TreeItem nodeId="3" label="App2">
          <TreeItem nodeId="4" label="Task2" className="tree-item-task" />
          <TreeItem nodeId="5" label="Task3" className="tree-item-task" />
        </TreeItem>
      </TreeView>
      <div className="logout-button-wrapper">
        <CustomButton onClick={handleLogout} className="btn-secondary">
          <h3>Wyloguj</h3>
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
