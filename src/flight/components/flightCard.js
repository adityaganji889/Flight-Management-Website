import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom'
import  { storeSelectedFlightDetails }  from '../../actions/flight.actions';
import { connect } from 'react-redux';
import './flightCard.css';

const FlightCard = (props) => {
  let flightData = props.flightData;
  const ButtonRoute = withRouter(({ history }) => (
    <Button variant="contained"
     size="small" color="primary"
      onClick={() => { 
        props.storeSelectedFlightDetails(flightData);
        history.push('/flight') }}
    >
      Check In
    </Button>
  ));
  const InFlightButtonRoute = withRouter(({ history }) => (
    <Button variant="contained"
     size="small" color="secondary"
      onClick={() => {
        props.storeSelectedFlightDetails(flightData);
        history.push('/flight/inflight') }}
    >
      Inflight
    </Button>
  ));
  const AdminPassengerButtonRoute = withRouter(({ history }) => (
    <Button
    variant="contained"
     size="small" color="secondary"
      onClick={() => {
        props.storeSelectedFlightDetails(flightData);
        history.push(`/admin/passengers`) }}
    >
      Passengers
    </Button>
  ));
  const AdminFlightButtonRoute = withRouter(({ history }) => (
    <Button
    variant="contained"
     size="small" color="secondary"
      onClick={() => {
        props.storeSelectedFlightDetails(flightData);
        history.push(`/admin/flightancilliary`) }}
    >
      Ancilliary Services
    </Button>
  ));
  const getCardButttons = () => {
    if(props.role === "dashboard") {
      return (
        <div>
          <ButtonRoute />
          &nbsp;&nbsp;&nbsp;
          <InFlightButtonRoute />
        </div>
      );
    } else if(props.role === "admin_dashboard") {
      return (
        <div>
          <AdminPassengerButtonRoute />
           &nbsp;&nbsp;&nbsp;
          <AdminFlightButtonRoute />
        </div>
      );
    }
  }
  return(
    <Card style={{background: 'lightyellow'}} className="card">
    <div className="container-fluid card-wrapper">
      <div className="row">

        <div className="text col-6 col-md-5 col-lg-5 col-xl-5">
          <img className="image" alt='imag' src={flightData.airlineImage}/><Typography className="text-1">{flightData.airlineName}</Typography>
          <p className="small-text">{flightData.flightId}</p> 

          </div>
          <div className="text col-6 col-md-7 col-lg-7 col-xl-7">
            <div className="row">
            <div className="text col-12 col-md-4 col-lg-4 col-xl-4 from"><Typography className="text-1">{flightData.startTime}</Typography>
          <p className="small-text text-1">{flightData.From}</p> 
        </div>
        <div className=" col-12 col-md-3 col-lg-3 col-xl-3 horizontal-line"></div>
        <div className="text col-12 col-md-4 col-lg-4 col-xl-4To" >
          <div>
          <Typography className="text-1">{flightData.endTime}</Typography>
          <p className="small-text text-1">{flightData.To}</p> 
          </div>
         
          
        </div>
  {(props.role === "admin_dashboard") ? <div style = {{marginLeft: "210px"}} className="text col-12 d-none d-md-block totalduration" >{flightData.duration} </div> : <div className="text col-12 d-none d-md-block totalduration" >{flightData.duration} </div> }
            </div>
          
          </div>
        
      
      </div>
      {/* <div className="text col-12 d-block d-md-none mt-3 totalduration" >{flightData.duration}</div> */}
    </div>

    <hr className="hr" />
    <CardActions className="cardaction">
    {getCardButttons()}
    </CardActions>
  </Card>
  )
}
export default connect(null,{storeSelectedFlightDetails})(FlightCard);