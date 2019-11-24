import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import LanguageIcon from '@material-ui/icons/Language';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import GitHubIcon from '@material-ui/icons/GitHub';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import TimelineIcon from '@material-ui/icons/Timeline';
import PersonIcon from '@material-ui/icons/Person';
import SyncIcon from '@material-ui/icons/Sync';
import { Link } from 'react-router-dom';

import { setPage } from "../actions";
import { useDispatch, useSelector } from "react-redux";


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: "white",
    color: "black"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Layout(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const appConfig = useSelector(state => state.app);
  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClick = index => {
      dispatch(setPage(index));
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
          <ListItem
          button 
          selected={appConfig.page === 0}
          onClick={() => handleClick(0)}
          component={Link}
          to={"/"}
          ><ListItemIcon><PersonIcon/></ListItemIcon><ListItemText primary="Profil"/></ListItem>
        <ListItem
          button 
          selected={appConfig.page === 1}
          onClick={() => handleClick(1)}
          component={Link}
          to={"/today"}
          ><ListItemIcon><LocalDiningIcon/></ListItemIcon><ListItemText primary="Dzisiejsze spożycie"/></ListItem>
          <ListItem
          button 
          selected={appConfig.page === 2}
          onClick={() => handleClick(2)}
          component={Link}
          to={"/history"}
          ><ListItemIcon><TimelineIcon/></ListItemIcon><ListItemText primary="Historia"/></ListItem>
          <ListItem
          button 
          selected={appConfig.page === 3}
          onClick={() => handleClick(3)}
          component={Link}
          to={"/products"}
          ><ListItemIcon><FastfoodIcon/></ListItemIcon><ListItemText primary="Produkty"/></ListItem>
          <ListItem
          button 
          selected={appConfig.page === 4}
          onClick={() => handleClick(4)}
          component={Link}
          to={"/sync"}
          ><ListItemIcon><SyncIcon/></ListItemIcon><ListItemText primary="Synchronizuj produkty"/></ListItem>
      </List>
      <Divider />
      <List>
      <ListItem
          button 
          component="a"
          href="https://mateusz-nejman.pl/"
          ><ListItemIcon><LanguageIcon/></ListItemIcon><ListItemText primary="Strona autora"/></ListItem>
          <ListItem
          button 
          component="a"
          href="https://github.com/Mateusz-Nejman/FitCalc-Client"
          ><ListItemIcon><GitHubIcon/></ListItemIcon><ListItemText primary="Github"/></ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Fit Calc
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}

Layout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
};

export default Layout;