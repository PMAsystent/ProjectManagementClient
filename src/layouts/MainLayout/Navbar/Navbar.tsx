import { AppBar, Avatar, Badge, Box, Hidden, IconButton, Toolbar, Tooltip } from '@mui/material';
import { NotificationsNone, Settings, Search, Menu } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { getUserDetailsPath } from 'core/routes';
import './styles.scss';

const Navbar = (props: { onSidebarOpen: any }) => {
  const { onSidebarOpen } = props;

  const history = useHistory();

  const onAvatarClick = () => {
    history.push(getUserDetailsPath);
  };

  return (
    <AppBar elevation={0} className="navbar-root">
      <Toolbar className="navbar-root">
        <Hidden lgUp>
          <IconButton color="inherit" size="medium" onClick={onSidebarOpen}>
            <Menu />
          </IconButton>
        </Hidden>
        <Tooltip title="Search">
          <IconButton className="search-button">
            <Search fontSize="small" className="navbar-icon" id="SEARCH-ICON" />
          </IconButton>
        </Tooltip>
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
        <Tooltip title="Profile">
          <Avatar className="top-avatar" src="https://cdn-icons-png.flaticon.com/512/194/194938.png" onClick={onAvatarClick} />
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
