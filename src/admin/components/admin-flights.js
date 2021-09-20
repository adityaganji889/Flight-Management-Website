import {connect} from 'react-redux';
import React, { Component, Fragment } from 'react';
import { getAllFlights } from '../../actions/flight.actions'
import FlightCard from '../../flight/components/flightCard';
import AdminNavBar from './admin-nav-bar';
class AdminFlights extends Component{
    constructor(props){
        super(props);
        this.state = {
            navBarClass: ''
        };
    }
    componentDidMount(){
        this.props.getAllFlights();
    }
    onNavBarHandler = (className) => {
        this.setState({
            navBarClass: className
        })
    }
    render(){
        let navClass = `admin-landing-page-1 ${this.state.navBarClass}`;
        let allData = this.props && this.props.allFlightData ? this.props.allFlightData : []; 
    return(
            <div className="admin-landing-page">
            <div className = {navClass}>
            <AdminNavBar onNavBarHandler = {this.onNavBarHandler} />
            </div>
            <div className = "admin-landing-page-2">
            <div>
            {allData.map((post,key) => {
                return (
                    <Fragment key = {key}>
                    <div key={'div1' +key} className="card-parent d-none d-sm-block" style={{padding:"40px 20px",width: "1000px"}}>
                    <FlightCard role="admin_dashboard" flightData={post}/>
                 </div>
                 <div key={'div2' +key} className="d-block d-md-none" >
                 <FlightCard role="admin_dashboard" flightData={post}/>
              </div>
              </Fragment>
                )
            })
        }
            </div>
            </div>
            </div>
           
    )
    
}
}
const mapStateToProps  = state => {
    return {
        allFlightData: state.flight.allFlights
    };
}
export default connect(mapStateToProps, {getAllFlights})(AdminFlights);