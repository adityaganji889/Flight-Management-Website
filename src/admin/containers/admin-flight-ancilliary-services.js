import React ,{Component} from 'react';
// import  AncilliaryServicesPopup  from '../../shared/popups/ancilliary-services-popup';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import './admin-flight-ancilliary-services.css';
import FlightAddAncilliaryPopup from '../../shared/popups/flight-add-ancilliary-popup';
import axios from 'axios';
class AdminFlightAncilliaryServices extends Component {
    constructor(props){
        super(props);
        this.state = {
            openPopup: false,
            mealText: '',
            luggageText: '',
            inShopText: ''
        };
    }
    openAncilliaryPopup = () => {
        this.setState({
            openPopup: true
        });
    }
    addAncilliaryService = (meal,luggage,item) => {
        this.setState({
            openPopup: false
        });
        let flightData = (this.props.flightDetails) ? (this.props.flightDetails) : {}
        if(flightData.addons){
            flightData.addons.meal.push(meal);
            flightData.addons.luggage.push(luggage);
            flightData.addons.inshop.push(item);
            console.log(flightData.addons);
        }
        let url = `http://localhost:3001/flights/${flightData.id}`;
        const flightObj = {
      "id": flightData.id,
      "flightId": flightData.flightId,
      "airlineName": flightData.airlineName,
      "From": flightData.From,
      "To": flightData.To,
      "From_name": flightData.From_name,
      "To_name": flightData.To_name,
      "duration": flightData.duration,
      "airlineImage": flightData.airlineImage,
      "startTime": flightData.startTime,
      "endTime": flightData.endTime,
      "From_terminal": flightData.From_terminal,
      "To_terminal": flightData.To_terminal,
      "addons": {
        "meal": flightData.addons.meal,
        "luggage": flightData.addons.luggage,
        "inshop": flightData.addons.inshop
      }
        }
        axios.put(url,flightObj).then((res) => {
            this.props.history.push('/admin');
        }).catch(err => alert("Error Occured"));
    }
render(){

    let flightData = (this.props.flightDetails) ? (this.props.flightDetails) : {}
    let mealText = (flightData.addons && flightData.addons.meal !== null && flightData.addons.meal !== '') ? `Meals available are `+ flightData.addons.meal : '';
    let luggageText = (flightData.addons && flightData.addons.luggage !== null && flightData.addons.luggage !== '') ? `Luggage Service available are `+ flightData.addons.luggage: '';
    let inShopText = (flightData.addons && flightData.addons.inshop !== null) ? `Items available are ${flightData.addons.inshop}` : '';
    return (
        <div> 
            <div className="ancilliary-services-1">
                <p className="summary">Ancilliary Services</p>
                <Fab onClick = { this.openAncilliaryPopup
                } size="medium" color="secondary" aria-label="add">
                    
          <AddIcon />
        </Fab>
            </div>
           {(this.state.openPopup === true) ? <FlightAddAncilliaryPopup
          id="ringtone-menu"
          keepMounted
          open = {this.state.openPopup}
          selectedFlightData = {flightData}
          onCancel = {() => this.setState({openPopup: false})}
          onProceed = { this.addAncilliaryService }
          
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
                    <h3>Flight In Shop</h3>
                    </div>
                    <div className="ancilliary-services-2-3-2">
                       {
                           <p className="p-1-2">{inShopText}</p> 
                       } 
                    </div>
                </div>
            </div>
            </div>
    )
}
}
const mapStateToProps = state => {
    return {
        flightDetails: state.flight.selectedFlightDetails,
        seatDetails: state.flight.seatDetails,
        selectedPassengerData: state.flight.selectedPassengerDetails
    };
}
export default connect(mapStateToProps)(AdminFlightAncilliaryServices);