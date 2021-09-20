import React from 'react';
import { connect } from 'react-redux';
import { storeSelectedFlightDetails,getFlightPassengers, getFlightSeatDetails, storeSelectedPassengerDetails } from '../../actions/flight.actions';
import Checkbox from '@material-ui/core/Checkbox';
import { BootstrapButton } from '../../shared/ui-components/bootstrapbutton';
import CircleUncheckedFilled from '@material-ui/icons/RadioButtonUnchecked';
import './flightInServices.css';
import { SeatConfirmationPopup } from '../../shared/popups/seat-confirmation-popup';
class FlightInServices extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedPassenger: null,
            isChecked: false,
            openPopup: false,
            selectedSeat: null
        };
    }
    componentDidMount() {
        if (this.props.selectedFlightData) {
            const flightData = this.props.selectedFlightData;
            this.props.getFlightPassengers(flightData.flightId);
            this.props.getFlightSeatDetails(this.props.selectedFlightData.flightId);
        }
    }
    changed = (event, values) => {
        this.setState({
            selectedPassenger : values
        });
      };
      checkButtonStatus = () => {
          if(this.state.selectedPassenger === undefined || this.state.selectedPassenger === null){
              return true;
          } else {
              return false;
          }
      }
render(){
   let passengerData;
   if(passengerData){}
   let selectedPassenger;
    if(this.props.passengerData) {
        passengerData = this.props.passengerData;
        passengerData = passengerData.filter(data => data.ischeckedin === "true");
    }
    if(this.state.selectedPassenger){
        selectedPassenger = this.state.selectedPassenger;
    }
    let flightSeatData = (this.props.seatData !== undefined)? this.props.seatData: [];
    let flightSeatDataRowA = (flightSeatData !== undefined) ? flightSeatData.filter((data) => {
        return data.row === 'A';
    }): [];
    let flightSeatDataRowB = (flightSeatData !== undefined) ? flightSeatData.filter((data) => {
        return data.row === 'B';
    }): [];
    let flightSeatDataRowC = (flightSeatData !== undefined) ? flightSeatData.filter((data) => {
        return data.row === 'C';
    }): [];
    let flightSeatDataRowD = (flightSeatData !== undefined) ? flightSeatData.filter((data) => {
        return data.row === 'D';
    }): [];
    let flightSeatDataRowE = (flightSeatData !== undefined) ? flightSeatData.filter((data) => {
        return data.row === 'E';
    }): [];
    let flightSeatDataRowF = (flightSeatData !== undefined) ? flightSeatData.filter((data) => {
        return data.row === 'F';
    }): [];
    let from_n,to_n;
    if(this.props.selectedFlightData.flightId==="15-134"){
        from_n="BLR";
        to_n="JPR";
    }
    else if(this.props.selectedFlightData.flightId==="34-787"){
        from_n="PUN";
        to_n="IXC";
    }
    else if(this.props.selectedFlightData.flightId==="98-554"){
        from_n="JPR";
        to_n="HYD";
    }
    else if(this.props.selectedFlightData.flightId==="46-875"){
        from_n="DEL";
        to_n="PAT";
    }
      return (
        <div className="flight-seat">
                <div className="flight-seat-1">
                    INFLIGHT
                </div>
                <div className="flight-seat-2">
                    <p>{from_n}&nbsp;&nbsp; - &nbsp;&nbsp;{to_n}</p>
                </div>
                <div className="flight-seat-3">
                   <div className="flight-seat-31 row">
                    <div className="col-12 col-md-2 col-lg-2 col-xl-2 flight-seat-311">
                        <img className="image-2" alt="plane" src={require('../../assets/flight_black1.png').default} />&nbsp;&nbsp;&nbsp;  <p className="ticket">A320|321</p>
                    </div>
                    <div style={{marginLeft: 40}} className="col-12 col-md-9 col-lg-9 col-xl-9 flight-seat-312">
                    <img className="image-5" alt="assigned icon" src={require('../../assets/icons8-ok-24.png').default} />
                    <p className="paragraph-1">Selected Passenger</p> &nbsp;&nbsp;&nbsp;&nbsp;
                    <img className="image-5" alt="assigned icon" src={require('../../assets/icons8-filled-circle-24.png').default} />
                    <p className="paragraph-1">Veg meal</p> &nbsp;&nbsp;&nbsp;&nbsp;
                    <img className="image-5" alt="assigned icon" src={require('../../assets/icons8-filled-circle-24 (3).png').default} />
                    <p className="paragraph-1">Non Veg meal</p> &nbsp;&nbsp;&nbsp;&nbsp;
                    <img className="image-5" alt="assigned icon" src={require('../../assets/icons8-filled-circle-24 (1).png').default} />
                    <p className="paragraph-1">No Meal</p> &nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                   </div>
                   <div className="flight-seat-32 row" >
                    <div style = {{marginRight: "20px"}} className="col-12 col-md-2 col-lg-2 col-xl-2 flight-seat-321">
                    <div className="flight-seat-321-text">
                        <p className="small-text-1">Select Passenger</p>
                        
    
    {(selectedPassenger !== undefined && selectedPassenger !== null) ? (<div className="flight-seat-321-text">
                        <p className="big-text">{selectedPassenger.name}</p><p className="small-text-2">{selectedPassenger.seatno}</p>
                    </div>
    ) : ''}

                    </div>
                    </div>
                    <div className="vertical"></div>
                    { (this.state.openPopup !== null && this.state.selectedPassenger!==null) ? <SeatConfirmationPopup
          classes={{
            paper: {
                width: '80%',
                maxHeight: 435,
            }
          }}
          id="ringtone-menu"
          keepMounted
          open = {this.state.openPopup}
          onProceed = {() => {
              this.setState({openPopup: false, isChecked: true})

            }}
          source="inflight"
          passengerData = {this.state.selectedPassenger}
          onCancel = {() => this.setState({openPopup: false, selectedSeat: null, isChecked: false,selectedPassenger: null})}
          selectedSeat = {this.state.selectedSeat}
        /> : '' }
                    <div className="flight-seat-322 col-12 col-md-9 col-lg-9 col-xl-9 seatallocationwrp">
                    <div className="flight-seat-322-A">
                    <p className="classA d-none d-md-block">A</p>&nbsp;&nbsp;
                    {flightSeatDataRowA.map((row,key) => {
                        let isDisable;
                        let color;
                        if(row.occupied === "true"){
                            isDisable = false;
                        } else {
                            isDisable = true;
                        }
                        if(row.addons){
                        switch(row.addons.meal){
                            case 'Allergen meal': 
                            color = "#E67E22";
                            break;
                            case 'Veg Meal':
                            color = "primary";
                            break;
                            case 'Non Veg Meal':
                            color = "secondary";
                            break;
                            case null:
                            case '':
                            color="disabled";
                            break;
                            default:
                        }
                    }
                        return (
                            <div key={key} className="position-relative">
                            <Checkbox checked = {this.state.selectedSeat === `${key+1}A`} value = {`${key+1}A`} onChange = {(event, value) => { 
                                const selectedPassenger = this.props.passengerData.filter(passengerData => 
                                    passengerData.seatno === `${key+1}A`
                                    )[0];
                                (this.state.selectedSeat === event.target.value) ? this.setState({isChecked: false,selectedSeat: null,selectedPassenger: null}) : 
                                this.setState({isChecked: true,openPopup: true, selectedSeat: `${key+1}A`,selectedPassenger: selectedPassenger});}  
                            } disabled = {isDisable} 
                            icon={<CircleUncheckedFilled height = "20px" color = {color} />}
                                    /><span className="seatnum d-block d-md-none">{key+1}A</span>
                                    </div>
                          
                        );
                    }) }
                    
                    </div>
                    <div className="flight-seat-322-B">
                    <p className="classA d-none d-md-block">B</p>&nbsp;&nbsp;
                    {flightSeatDataRowB.map((row,key) => {
                       
                        let isDisable;
                        let color;
                        if(row.occupied === "true"){
                            isDisable = false;
                        } else {
                            isDisable = true;
                        }
                        if(row.addons){
                        switch(row.addons.meal){
                            case 'Allergen meal': 
                            color = "#E67E22";
                            break;
                            case 'Veg Meal':
                            color = "primary";
                            break;
                            case 'Non Veg Meal':
                            color = "secondary";
                            break;
                            case null:
                            case '':
                            color="disabled";
                            break;
                            default:
                        }
                    }
                        return (
                            <div key={key} className="position-relative">
                            <Checkbox checked = {this.state.selectedSeat === `${key+1}B`} value = {`${key+1}B`} onChange = {(event, value) => { 
                                const selectedPassenger = this.props.passengerData.filter(passengerData => 
                                    passengerData.seatno === `${key+1}B`
                                    )[0];
                                (this.state.selectedSeat === event.target.value) ? this.setState({isChecked: false,selectedSeat: null,selectedPassenger: null}) : 
                                this.setState({isChecked: true,openPopup: true, selectedSeat: `${key+1}B`,selectedPassenger: selectedPassenger});}  
                            } disabled = {isDisable} 
                            icon={<CircleUncheckedFilled height = "20px" color = {color} />}
                                    /><span className="seatnum d-block d-md-none">{key+1}B</span>
                                    </div>
                          
                        );
                    }) }
                    </div>
                    <div  className="flight-seat-322-C">
                    <p className="classA d-none d-md-block">C</p>&nbsp;&nbsp;
                    {flightSeatDataRowC.map((row,key) => {
                        let isDisable;
                        let color;
                        if(row.occupied === "true"){
                            isDisable = false;
                        } else {
                            isDisable = true;
                        }
                        if(row.addons){
                        switch(row.addons.meal){
                            case 'Allergen meal': 
                            color = "#E67E22";
                            break;
                            case 'Veg Meal':
                            color = "primary";
                            break;
                            case 'Non Veg Meal':
                            color = "secondary";
                            break;
                            case null:
                            case '':
                            color="disabled";
                            break;
                            default:
                        }
                    }
                        return (
                            <div key={key} className="position-relative">
                            <Checkbox value = {`${key+1}C`} onChange = {(event, value) => { 
                                const selectedPassenger = this.props.passengerData.filter(passengerData => 
                                    passengerData.seatno === `${key+1}C`
                                    )[0];
                                (this.state.selectedSeat === event.target.value) ? this.setState({isChecked: false,selectedSeat: null,selectedPassenger: null}) : 
                                this.setState({isChecked: true,openPopup: true, selectedSeat: `${key+1}C`,selectedPassenger: selectedPassenger});}  
                            } disabled = {isDisable} 
                            icon={<CircleUncheckedFilled height = "20px" color = {color} />}
                                    /><span className="seatnum d-block d-md-none">{key+1}C</span>
                                    </div>
                                    
                          
                        );
                    }) }
                    </div>
                    <div style = {{paddingLeft: 30}} className="seat-column d-none d-md-block">
                        <p className="column">
                            1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;7&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;8&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;9&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;11&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;12&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;13&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;14&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;15&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;16&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;17&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;18&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;19&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;20
                        </p>
                    </div>
                    <div  className="flight-seat-322-D">
                    <p className="classA d-none d-md-block">D</p>&nbsp;&nbsp;
                    {flightSeatDataRowD.map((row,key) => {
                        let isDisable;
                        let color;
                        if(row.occupied === "true"){
                            isDisable = false;
                        } else {
                            isDisable = true;
                        }
                        if(row.addons){
                        switch(row.addons.meal){
                            case 'Allergen meal': 
                            color = "#E67E22";
                            break;
                            case 'Veg Meal':
                            color = "primary";
                            break;
                            case 'Non Veg Meal':
                            color = "secondary";
                            break;
                            case null:
                            case '':
                            color="disabled";
                            break;
                            default:
                        }
                    }
                        return (
                            <div key={key} className="position-relative">
                            <Checkbox value = {`${key+1}D`} onChange = {(event, value) => { 
                                const selectedPassenger = this.props.passengerData.filter(passengerData => 
                                    passengerData.seatno === `${key+1}D`
                                    )[0];
                                (this.state.selectedSeat === event.target.value) ? this.setState({isChecked: false,selectedSeat: null,selectedPassenger: null}) : 
                                this.setState({isChecked: true,openPopup: true, selectedSeat: `${key+1}D`,selectedPassenger: selectedPassenger});}  
                            } disabled = {isDisable} 
                            icon={<CircleUncheckedFilled height = "20px" color = {color} />}
                                    /><span className="seatnum d-block d-md-none">{key+1}D</span>
                                    </div>
                          
                        );
                    }) }
                    
                    </div>
                    <div className="flight-seat-322-E">
                    <p className="classA d-none d-md-block">E</p>&nbsp;&nbsp;
                    {flightSeatDataRowE.map((row,key) => {
                        let isDisable;
                        let color;
                        if(row.occupied === "true"){
                            isDisable = false;
                        } else {
                            isDisable = true;
                        }
                        if(row.addons !== null){
                        switch(row.addons.meal){
                            case 'Allergen meal': 
                            color = "#E67E22";
                            break;
                            case 'Veg Meal':
                            color = "primary";
                            break;
                            case 'Non Veg Meal':
                            color = "secondary";
                            break;
                            case null:
                            case '':
                            color="disabled";
                            break;
                            default:
                        }
                    } else {
                        color = "disabled";
                    }
                        return (
                            <div key={key} className="position-relative">
                            <Checkbox value = {`${key+1}E`} onChange = {(event, value) => { 
                                const selectedPassenger = this.props.passengerData.filter(passengerData => 
                                    passengerData.seatno === `${key+1}E`
                                    )[0];
                                (this.state.selectedSeat === event.target.value) ? this.setState({isChecked: false,selectedSeat: null,selectedPassenger: null}) : 
                                this.setState({isChecked: true,openPopup: true, selectedSeat: `${key+1}E`,selectedPassenger: selectedPassenger});}  
                            } disabled = {isDisable} 
                            icon={<CircleUncheckedFilled height = "20px" color = {color} />}
                                    /><span className="seatnum d-block d-md-none">{key+1}E</span>
                                    </div>
                          
                        );
                    }) }
                    </div>
                    <div className="flight-seat-322-F">
                    <p className="classA d-none d-md-block">F</p>&nbsp;&nbsp;
                    {flightSeatDataRowF.map((row,key) => {
                        let isDisable;
                        let color;
                        if(row.occupied === "true"){
                            isDisable = false;
                        } else {
                            isDisable = true;
                        }
                        if(row.addons){
                        switch(row.addons.meal){
                            case 'Allergen meal': 
                            color = "#E67E22";
                            break;
                            case 'Veg Meal':
                            color = "primary";
                            break;
                            case 'Non Veg Meal':
                            isDisable = true;
                            color = "secondary";
                            break;
                            case null:
                            case '':
                            color="disabled";
                            break;
                            default:
                        }
                    }
                        return (
                            <div key={key} className="position-relative">
                            <Checkbox value = {`${key+1}F`} onChange = {(event, value) => { 
                                const selectedPassenger = this.props.passengerData.filter(passengerData => 
                                    passengerData.seatno === `${key+1}F`
                                    )[0];
                                (this.state.selectedSeat === event.target.value) ? this.setState({isChecked: false,selectedSeat: null,selectedPassenger: null}) : 
                                this.setState({isChecked: true,openPopup: true, selectedSeat: `${key+1}F`,selectedPassenger: selectedPassenger});}  
                            } disabled = {isDisable} 
                            icon={<CircleUncheckedFilled height = "20px" color = {color} />}
                                    /><span className="seatnum d-block d-md-none">{key+1}F</span>
                                    </div>
                          
                        );
                    }) }
                    </div>
                    </div>
                    </div>
                </div>
                <div className="flight-seat-4">
                    <BootstrapButton disabled = {this.checkButtonStatus()} onClick = { () => {
                        this.props.storeSelectedPassengerDetails(this.state.selectedPassenger);
                        this.props.history.push('/flight/ancilliary');
                    }
                } color="primary">Ancilliary Services</BootstrapButton>
                </div>
            </div>
      );
}
}
const mapStateToProps = state => {
    return {
        selectedFlightData: state.flight.selectedFlightDetails,
        passengerData: state.flight.passengerDetails,
        seatData: state.flight.seatDetails,
    };
}
export default connect(mapStateToProps, {getFlightPassengers, getFlightSeatDetails, storeSelectedPassengerDetails})(FlightInServices);