import React from 'react';
import { connect } from 'react-redux';
import FlightCard from '../flight/components/flightCard';
import { getAllFlights } from '../actions/flight.actions';
export class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            allFlightDetails: []
        };
    }
    componentDidMount(){
        this.props.getAllFlights();
    }
    getFlightDetails(){
        if(this.props.allFlightData !== undefined){
            this.setState({
                allFlightDetails: 
                    ['','a']
                
        
            });
            }
    }
render(){
    let allData = this.props && this.props.allFlightData ? this.props.allFlightData : []; 
    let userData = this.props && this.props.userData ? this.props.userData : {};
    let isLoggedIn = (userData.isLoggedIn)? userData.isLoggedIn: null;
    return (
        <div>
            { (isLoggedIn === null) ?<div style={{background: "lightyellow", height: "40px", fontWeight: "bold",color:"tomato"}}>Please Login To Continue!!</div> : ''}
            {allData.map((post,key) => {
            return(
                <div key={key} className="card-parent" style={{padding:"40px 20px"}}>
                <FlightCard role = "dashboard" flightData={post}/>
                </div>
            )
        })
    }
        </div>        
   );
  }
}
const mapStateToProps  = state => {
    return {
        userData: state.auth,
        allFlightData: state.flight.allFlights
    };
}
export default connect(mapStateToProps, {getAllFlights})(Dashboard);