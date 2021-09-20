import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { withRouter } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import './admin-nav-bar.css';
const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    
  },
  drawerPaper: {
    top: '64px',
    width: '240px',
     background: 'darksalmon',
    fontWeight: 'bold',
    color: 'white',
    position: 'sticky'
  },
  toolbar: { 
height: '70px',
paddingTop: '25px',
fontWeight: 'bold',
fontSize: 'medium',
display: 'flex'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const AdminNavBar = (props) => {
  const classes = useStyles();
  const redirect = (index) => {
    if(index===1){
      props.history.push('/admin/flights');
    } else if(index === 0){
      props.history.push('/admin');
    }
  }
  return (
    <div className={classes.root}>
      <div onClick = {props.onNavBarHandler.bind(this, 'removeanimate')} className="navicon d-block d-md-none">
      <ArrowBackRoundedIcon />

      </div>
      <div onClick = {props.onNavBarHandler.bind(this, 'animateclass')} className="navicon d-block d-md-none slideinarrow">
      <ArrowBackRoundedIcon />

      </div>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar}>
          <span className="icon"><PersonIcon/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> Admin 
          </div>
        <Divider />
        <List style = {{display:"flex",flexDirection:"column"}}>
          {['Dashboard', 'Flights'].map((text, index) => (
            <ListItem onClick = {redirect.bind(this, index)} button key={text}>
              <div className = "dashboard-icon-23">
              {index === 0 ? <DashboardIcon/> : (index === 1) ? <FlightTakeoffIcon/> : <ExitToAppIcon/> }
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <ListItemText primary={text} />
              </div>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}
export default withRouter(AdminNavBar);