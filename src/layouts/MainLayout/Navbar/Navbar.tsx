import { AppBar, Avatar, Badge, Box, Hidden, IconButton, TextField, Toolbar, Tooltip } from '@mui/material';
import { NotificationsNone, Settings, Search, Menu } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { getDashboardPath, getUserDetailsPath } from 'core/routes';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'redux/auth/auth.slice';
import { stringToColor } from '../../../core/utils';
import React, { useEffect, useState } from 'react';
import { changeProjectSearch, changeTaskSearch } from '../../../redux/shared/shared.slice';

const Navbar = (props: { onSidebarOpen: any }) => {
  const [value, setValue] = useState('');
  const { onSidebarOpen } = props;
  const currentUser = useSelector(selectUser);
  const history = useHistory();
  const dispatch = useDispatch();

  const onAvatarClick = () => {
    history.push(getUserDetailsPath);
  };

  const handleOnSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (history.location.pathname === getDashboardPath) {
      dispatch(changeProjectSearch(e.target.value));
    } else if (history.location.pathname.includes('/project/')) {
      dispatch(changeTaskSearch(e.target.value));
    }
  };

  useEffect(() => {
    dispatch(changeProjectSearch(''));
    dispatch(changeTaskSearch(''));
  }, [dispatch, history.location.pathname]);

  return (
    <AppBar elevation={0} className="navbar-root">
      <Toolbar className="navbar-root">
        <Hidden lgUp>
          <IconButton color="inherit" size="medium" onClick={onSidebarOpen}>
            <Menu />
          </IconButton>
        </Hidden>
        <Box className={'search-box'} sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Search fontSize="small" className="navbar-icon" id="SEARCH-ICON" />
          <TextField
            id="search"
            variant="standard"
            value={value}
            onChange={handleOnSearchChange}
            disabled={!history.location.pathname.includes('/project/') && history.location.pathname !== getDashboardPath}
          />
        </Box>
        <Box sx={{ flexGrow: 20 }} />
        <Tooltip title="Notifications">
          <IconButton color="inherit">
            <Badge badgeContent={4} className="navbar-badge">
              <NotificationsNone className="navbar-icon" />
            </Badge>
          </IconButton>
        </Tooltip>
        <Tooltip title="Settings">
          <IconButton color="inherit">
            <Settings className="navbar-icon" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edycja profilu">
          {currentUser ? (
            <Avatar className="top-avatar" sx={{ bgcolor: stringToColor(currentUser.userName) }} onClick={onAvatarClick}>
              {currentUser.userName[0].toUpperCase()}
            </Avatar>
          ) : (
            <Avatar className="top-avatar" src="https://cdn-icons-png.flaticon.com/512/194/194938.png" onClick={onAvatarClick} />
          )}
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
