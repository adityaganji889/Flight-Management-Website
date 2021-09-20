import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import FlightTakeoffRoundedIcon from '@material-ui/icons/FlightTakeoffRounded';
import Login from './login';
import './header.css';
import { withRouter } from 'react-router';
const Header=(props)=>{
  const navigateToDashboard = () =>{
    props.history.push('/');
  }
  return (
    <div className="root">
      <AppBar style = {{background: "red"}} position="static">
        <Toolbar>
          <IconButton onClick={navigateToDashboard} edge="start" className="menuButton" color="inherit" aria-label="menu">
              <FlightTakeoffRoundedIcon/>
          </IconButton>
          <Typography id="myflight-text" variant="h6" className="title" >
            Flight-Management
          </Typography>
          <Button color="inherit"><Login/></Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(Header);