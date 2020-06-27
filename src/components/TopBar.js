import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToAppRounded'
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import HistoryIcon from "@material-ui/icons/History";
import AppIcon from "@material-ui/icons/Apps";
import ArtTrackIcon from "@material-ui/icons/ArtTrack";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter, useHistory } from "react-router-dom";
import { Modal, Button } from "@material-ui/core";
import AccountDialog from './AccountDialog'
import ElevationScrollAppBar from './ElevationScroll'
import HistoryDrawer from "./HistoryDrawer";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  title: {
    flexGrow: 1
  },
  colRoot: {
    display: 'flex',
    flexDirection: 'column'
  },
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  historyDrawer: {
    width: 500,
    maxWidth: '80%'
  },
  appBar: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  subAppBar: {
    width: "100%",
  },
  below: {
    width: '100%',
    paddingTop: '64px',
    overflow: 'hidden',
    [theme.breakpoints.down('xs')]: {
      paddingTop: '56px'
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  backButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    maxWidth: `calc(100% - ${drawerWidth}px - ${
      window.innerWidth - document.body.clientWidth
    }px)`,
    [theme.breakpoints.down("sm")]: {
      maxWidth: `calc(100% - ${
        window.innerWidth - document.body.clientWidth
      }px)`,
    },
  },
  subBarContent: {
    flexGrow: 1,
    padding: theme.spacing(3),
    maxWidth: `calc(100% - ${
      window.innerWidth - document.body.clientWidth
    }px)`,
    backgroundColor: 'white'
  },
}));

const navLabels = ["电影展厅", "表格展示"];
const navIcons = [<AppIcon />, <ArtTrackIcon />];

function loginModal(loginState) {
  if (loginState.data.login) {
    return (<></>)
  }
  return (
    <Modal
      open={loginState.isOpen}>
      <AccountDialog onClose={loginState.loginClose} loginState={loginState} />
    </Modal>
  )
}

function AccountButton(props) {
  return props.loginState.data.login ? (
    <>
      <Hidden smDown implementation="css">
        <Button color="inherit" size="large" onClick={props.handleToggle} startIcon={<HistoryIcon />}>
          <Typography variant="button">历史记录</Typography>
        </Button>
        <div style={{ width: 16, display: 'inline-block' }}></div>
        <Button color="inherit" size="large" onClick={props.loginState.exitLogin} startIcon={<ExitToAppIcon />}>
          <Typography variant="button">注销</Typography>
        </Button>
      </Hidden>

      <Hidden mdUp implementation="css">
        <div style={{ minWidth: 96 }}>
          <IconButton
            color="inherit"
            aria-label="open history"
            onClick={props.handleToggle}
          >
            <HistoryIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="logout"
            onClick={props.loginState.exitLogin}
          >
            <ExitToAppIcon />
          </IconButton>
        </div>
      </Hidden>
    </>
  ) : (
    <>
      <Hidden smDown implementation="css">
        <Button color="inherit" size="large" onClick={props.loginState.loginOpen} startIcon={<AccountCircleIcon />}>
          <Typography variant="button">登录</Typography>
        </Button>
      </Hidden>

      <Hidden mdUp implementation="css">
        <IconButton
          color="inherit"
          aria-label="open login"
          onClick={props.loginState.loginOpen}
        >
          <AccountCircleIcon />
        </IconButton>
      </Hidden>
    </>
  )
}

function HistoryRecords(props) {
  const classes = useStyles()
  const { window } = props
  const container =
    window !== undefined ? () => window().document.body : undefined;
      
  return (props.loginState?.data?.login ?? false) ? (
    <nav>
      {/* 历史记录 */}
      <Drawer
          container={container}
          variant="temporary"
          anchor="right"
          open={props.historyOpen}
          onClose={props.handleHistoryToggle}
          classes={{
            paper: classes.historyDrawer,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <HistoryDrawer onClose={props.handleHistoryToggle} loginState={props.loginState} />
        </Drawer>
    </nav>
  ) : (<></>)
}

function MainTopBar(props) {
  const { window } = props;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [historyOpen, setHistoryOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleHistoryToggle = () => {
    setHistoryOpen(!historyOpen);
  }

  const handleListItemClick = (index) => {
    props.history.replace("?mode=" + index);
  };

  if (isNaN(props.mode) || props.mode < 0 || props.mode >= navLabels.length) {
    handleListItemClick(0);
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {navLabels.map((text, index) => (
          <ListItem
            button
            key={text}
            selected={props.mode === index}
            onClick={() => handleListItemClick(index)}
          >
            <ListItemIcon>{navIcons[index]}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

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
          <Typography className={classes.title} variant="h6" noWrap>
            MVRankings 电影评价网
          </Typography>
          
          <AccountButton {...props} handleToggle={handleHistoryToggle}/>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="main">
        <Hidden mdUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor="left"
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
        <Hidden smDown implementation="css">
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

      <HistoryRecords {...props} historyOpen={historyOpen} handleHistoryToggle={handleHistoryToggle} />

      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
      {loginModal(props.loginState)}
    </div>
  );
}

export default withRouter(MainTopBar);

export function SubTopBar(props) {
  const classes = useStyles();
  const history = useHistory();
  
  const [historyOpen, setHistoryOpen] = React.useState(false);

  const handleHistoryToggle = () => {
    setHistoryOpen(!historyOpen);
  }
  
  const goBack = () => {
    history.replace("/")
  };

  return (
    <div className={classes.colRoot}>
      <CssBaseline />
      <ElevationScrollAppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="arrow back"
            edge="start"
            onClick={goBack}
            className={classes.backButton}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            MVRankings 电影评价网
          </Typography>

          <AccountButton {...props} handleToggle={handleHistoryToggle}/>
        </Toolbar>
      </ElevationScrollAppBar>
      <div className={classes.below}>
        {props.below}
      </div>

      <HistoryRecords {...props} historyOpen={historyOpen} handleHistoryToggle={handleHistoryToggle} />

      <main className={classes.subBarContent}>
        {props.below ? <></> : <div className={classes.toolbar} />}
        {props.children}
      </main>
      {loginModal(props.loginState)}
    </div>
  );
}
