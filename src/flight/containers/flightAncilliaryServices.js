import { Component } from "react";
import React from 'react';
import './flightAncilliaryServices.css';
import  AncilliaryServicesPopup  from '../../shared/popups/ancilliary-services-popup';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';

class FlightAncilliaryServices extends Component{
    constructor(props){
        super(props);
        this.state = {
            openPopup: false
        };
    }
    openAncilliaryPopup = () => {
        this.setState({
            openPopup: true
        });
    }
    render(){
        let selectedPassengerData  = (this.props.selectedPassengerData) ? this.props.selectedPassengerData: {};
        let seatData = (this.props.seatDetails)?(this.props.seatDetails) : [];
        let flightData = (this.props.flightDetails) ? (this.props.flightDetails) : {}

        seatData = seatData.filter((seat) => {
            return (seat.seatnumber === selectedPassengerData.seatno && seat.flightId === flightData.flightId);
        } )[0];
        let mealText = (selectedPassengerData.addons && selectedPassengerData.addons.meal !== null && selectedPassengerData.addons.meal !== '') ? selectedPassengerData.addons.meal : 'No Meals!!';
        let luggageText = (selectedPassengerData.addons && selectedPassengerData.addons.luggage !== null &&selectedPassengerData.addons.luggage !== '') ? `${selectedPassengerData.addons.luggage} Luggage Service` : 'No Luggage Service!!';
        let inShopText = (selectedPassengerData.addons && selectedPassengerData.addons.inshop !== null) ? `Shopped for ${selectedPassengerData.addons.inshop}` : 'No Items Bought!!';
        return (<div> 
            <div className="ancilliary-services-1">
                <p className="summary">Ancilliary Services</p>
                <Fab onClick = { this.openAncilliaryPopup
                } size="medium" color="secondary" aria-label="add">
                    
          <AddIcon />
        </Fab>
            </div>
           {(this.state.openPopup === true) ? <AncilliaryServicesPopup
          id="ringtone-menu"
          keepMounted
          open = {this.state.openPopup}
          selectedPassengerData = {selectedPassengerData}
          selectedSeatData = {seatData}
          onProceed = {() => {
              this.setState({openPopup: false});
              this.props.history.push('/');
            }}
          onCancel = {() => this.setState({openPopup: false})}
      
          
        />: ''
        }
            <div className="ancilliary-services-2">
                <div className="ancilliary-services-2-1">
                <div className="ancilliary-services-2-1-1">
                    <h3>Meal Section</h3>
                    </div>
                    <div className="ancilliary-services-2-1-2">
                       {
                          
                            <p className="p-1-2">{mealText}</p> 
                       } 
                    </div>
                </div>
                <hr />
                <div className="ancilliary-services-2-2">
                <div className="ancilliary-services-2-2-1">
                    <h3>Luggage Section</h3>
                    </div>
                    <div className="ancilliary-services-2-2-2">
                       {
                           <p className="p-1-2">{luggageText}</p> 
                       } 
                    </div>
                </div>
                <hr />
                <div className="ancilliary-services-2-3">
                <div className="ancilliary-services-2-3-1">
                    <h4>Flight In Shop</h4>
                    </div>
                    <div className="ancilliary-services-2-3-2">
                       {
                           <p className="p-1-2">{inShopText}</p> 
                       } 
                    </div>
                </div>
            </div>
            </div>)
    }
}
const mapStateToProps = state => {
    return {
        flightDetails: state.flight.selectedFlightDetails,
        seatDetails: state.flight.seatDetails,
        selectedPassengerData: state.flight.selectedPassengerDetails
    };
}
export default connect(mapStateToProps)(FlightAncilliaryServices);