import React from 'react';
import './flightSeatAllocation.css';
import Checkbox from '@material-ui/core/Checkbox';
import CircleChecked from '@material-ui/icons/CheckCircleOutline'; 
import CircleUncheckedFilled from '@material-ui/icons/RadioButtonUnchecked';
import {getFlightSeatDetails} from '../../actions/flight.actions';
import { connect } from 'react-redux';
import { SeatConfirmationPopup } from '../../shared/popups/seat-confirmation-popup';
import axios from 'axios';
import { BootstrapButton } from '../../shared/ui-components/bootstrapbutton'; 

class FlightSeatAllocation extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            flightData: null,
            passengerData: null,
            seatData: null,
            openPopup: null,
            selectedSeat: null,
            previousSeat: null,
            isChecked: null
        };
    }
    componentDidMount(){
        if(this.props.selectedFlightData && this.props.passengerData){
            this.setState({flightData: this.props.selectedFlightData, passengerData: this.props.passengerData, seatData: this.state.seatData});
            this.props.getFlightSeatDetails(this.props.selectedFlightData.flightId);
                }
        if(this.props.selectedPassengerData){
            if(this.props.selectedPassengerData.seatno !== null){
                this.setState({
                    selectedSeat: this.props.selectedPassengerData.seatno,
                    previousSeat: this.props.selectedPassengerData.seatno
                });
            }
        }
    }
    onProceed() {
        this.setState({openPopup: false});
    }
    onCancel() {
        this.setState({openPopup: false});
    }
    seatBookHandler = () => {
        let seatData;
        let passengerData = (this.props.selectedPassengerData !== undefined) ? this.props.selectedPassengerData : {};
        let flightSeatData = (this.props.seatData !== undefined)? this.props.seatData: [];
        if(flightSeatData !== undefined && this.props.selectedPassengerData !== undefined){
            seatData = flightSeatData.filter(seat => 
                seat.seatnumber === this.state.selectedSeat
            )[0];
        }
        if(this.state.previousSeat !== null && (this.state.previousSeat !== this.state.selectedSeat)){
            let previousSeatData = this.props.seatData.filter(seat => seat.seatnumber === this.state.previousSeat)[0];
            let url3 = `http://localhost:3001/seats/${previousSeatData.id}`;
        axios.put(url3, {
            "id": previousSeatData.id,
            "row": previousSeatData.row,
            "seatnumber": previousSeatData.seatnumber,
            "flightId": previousSeatData.flightId,
            "booked": "true",
            "occupied": "false",
            "category": null,
            "addons": {
                "meal": null,
                "luggage": null,
                "inshop": null
            }
        }).then(resp => {
            let url1 = `http://localhost:3001/passengers/${passengerData.id}`;
            axios.put(url1, {
                "name": passengerData.name,
                "pnr": passengerData.pnr,
                "flightid": passengerData.flightid,
                "ischeckedin": "true",
                "category": passengerData.category,
                "seatno": this.state.selectedSeat,
                "row": passengerData.row,
                "id": passengerData.id,
                "addons": {
                    "meal": null,
                    "luggage": null,
                    "inshop": null
                },
                "address": passengerData.address,
                "passport": passengerData.passport,
                "dob": passengerData.dob
            }).then(resp => {
                let url2 = `http://localhost:3001/seats/${seatData.id}`;
                axios.put(url2, {
                    "id": seatData.id,
                    "row": seatData.row,
                    "seatnumber": seatData.seatnumber,
                    "flightId": seatData.flightId,
                    "booked": "true",
                    "occupied": "true",
                    "category": passengerData.category,
                    "addons": {
                        "meal": null,
                        "luggage": null,
                        "inshop": null
                    }
                }).then(resp => {
                    this.props.history.push('/flight/confirmation');
                }).catch(error => {
                    console.log('error');
                });
            }).catch(error => {
                console.log('error');
            });
        }).catch(error => {
            console.log('error');
        });
        } else {
        let url1 = `http://localhost:3001/passengers/${passengerData.id}`;
        axios.put(url1, {
            "name": passengerData.name,
            "pnr": passengerData.pnr,
            "flightid": passengerData.flightid,
            "ischeckedin": "true",
            "category": passengerData.category,
            "seatno": this.state.selectedSeat,
            "row": passengerData.row,
            "id": passengerData.id,
            "addons": {
                "meal": null,
                "luggage": null,
                "inshop": null
            },
            "address": passengerData.address,
            "passport": passengerData.passport,
            "dob": passengerData.dob
        }).then(resp => {
            let url2 = `http://localhost:3001/seats/${seatData.id}`;
            axios.put(url2, {
                "id": seatData.id,
                "row": seatData.row,
                "seatnumber": seatData.seatnumber,
                "flightId": seatData.flightId,
                "booked": "true",
                "occupied": "true",
                "category": passengerData.category,
                "addons": {
                    "meal": null,
                    "luggage": null,
                    "inshop": null
                }
            }).then(resp => {
                this.props.history.push('/flight/confirmation');
            }).catch(error => {
                console.log('error');
            });
        }).catch(error => {
            console.log('error');
        });
    }
        
    }
    getSeatText(){
        if(this.state.selectedSeat !== null) {
            return this.state.selectedSeat;
        } else {
            return 'Select your seat'
        }
    }
    checkButtonStatus(){
        return (this.state.selectedSeat === null && this.state.previousSeat === null) ? true : false
    }
    render(){
        let flightData = (this.props.selectedFlightData !== null) ? this.props.selectedFlightData: {};
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
        let passengerData = (this.props.selectedPassengerData !== undefined) ? this.props.selectedPassengerData : {};
        return(
            <div className="flight-seat">
                <div className="flight-seat-1">
                    SEAT SELECT
                </div>
                <div className="flight-seat-2">
                    <p>{flightData.From_name}&nbsp;&nbsp;-&nbsp;&nbsp;{flightData.To_name}</p>
                </div>
                <div className="flight-seat-3">
                   <div className="flight-seat-31 row">
                    <div className="col-12 col-md-2 col-lg-2 col-xl-2 flight-seat-311">
                        <img className="image-2" alt="plane" src={require('../../assets/flight_black1.png').default} />&nbsp;&nbsp;&nbsp;  <p className="ticket">A320|321</p>
                    </div>
                    <div className="col-12 col-md-9 col-lg-9 col-xl-9 flight-seat-312">
                    <img className="image-5" alt="assigned icon" src={require('../../assets/icons8-ok-24.png').default} />
                    <p className="paragraph-1">Assigned</p>
                    <img className="image-5" alt="assigned icon" src={require('../../assets/icons8-filled-circle-24.png').default} />
                    <p className="paragraph-1">Free</p>
                    <img className="image-5" alt="assigned icon" src={require('../../assets/icons8-filled-circle-24 (1).png').default} />
                    <p className="paragraph-1">Occupied</p>
                    <img className="image-5" alt="assigned icon" src={require('../../assets/filled-circle (2).png').default} />
                    <p className="paragraph-1">Checked In Passengers with Infants</p>
                    </div>
                   </div>
                   <div className="flight-seat-32 row" >
                    <div className="col-12 col-md-2 col-lg-2 col-xl-2 flight-seat-321">
                    <div className="flight-seat-321-text">
                        <p className="small-text-1">Passenger 1</p><p className="big-text">{passengerData.name}</p><p className="small-text-2">{this.getSeatText()}</p>
                    </div>
                    </div>
                    <div className="vertical col-md-1 col-lg-1 col-xl-1 "></div>
                    { (this.state.openPopup !== null) ? <SeatConfirmationPopup
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
          onCancel = {() => this.setState({openPopup: false, selectedSeat: null, isChecked: false})}
          selectedSeat = {this.state.selectedSeat}
        /> : '' }
                    <div className="flight-seat-322 col-12 col-md-9 col-lg-9 col-xl-9 seatallocationwrp">
                    <div className="flight-seat-322-A">
                    <p className="classA d-none d-md-block">A</p>&nbsp;&nbsp;
                    {flightSeatDataRowA.map((row,key) => {
                        let isDisable;
                        let color;
                        switch(row.occupied){
                            case 'false': 
                            isDisable = false;
                            color = "primary";
                            if(this.state.selectedSeat !== null && row.seatnumber !== this.state.selectedSeat){
                                isDisable = true;
                            }
                            break;
                            case 'true':
                            isDisable = true;
                            if(row.category === "infant"){
                                color = "secondary";
                            } else if(row.category === "wheelchair") {
                            color = '#013220'
                            } else {
                                color="disabled"
                            }
                            if(passengerData.seatno === `${key + 1}A`)
                            {   
                                isDisable = false;
                            }
                            break;
                            default:
                        }
                        return (
                            <div key={key} id={`position-relative-id-${key}`} className={`position-relative-${key}`}>
                            <Checkbox  id={`position-checkbox-${key}`} checked = {this.state.selectedSeat === `${key+1}A`} value = {`${key+1}A`} onChange = {(event, value) => { 
                                (this.state.selectedSeat === event.target.value) ? this.setState({isChecked: false,selectedSeat: null}) : 
                                this.setState({isChecked: true,openPopup: true, selectedSeat: `${key+1}A`})}  
                            } disabled = {isDisable} 
                            icon={<CircleUncheckedFilled id={`position-icon-${key}`} height = "20px" color = {color} />}
                            checkedIcon={<CircleChecked />}
                                    /><span id={`position-span-${key}`} className="seatnum d-block d-md-none">{key+1}A</span>
                          </div>
                        );
                    }) }
                    
                    </div>
                    <div className="flight-seat-322-B">
                    <p className="classA d-none d-md-block">B</p>&nbsp;&nbsp;
                    {flightSeatDataRowB.map((row,key) => {
                        let isDisable;
                        let color;
                        switch(row.occupied){
                            case 'false': 
                            isDisable = false;
                            color = "primary";
                            if(this.state.selectedSeat !== null && row.seatnumber !== this.state.selectedSeat){
                                isDisable = true;
                            }
                            break;
                            case 'true':
                            isDisable = true;
                            if(row.category === "infant"){
                            color = "secondary";
                            } else if(row.category === "wheelchair") {
                            color = '#013220'
                            } else {
                                color="disabled"
                            }
                            if(passengerData.seatno === `${key + 1}B`)
                            {   
                                isDisable = false;
                            }
                            break;
                            default:
                        }
                        return (
                            <div key={key} className="position-relative">
                            <Checkbox checked = {this.state.selectedSeat === `${key+1}B`} value = {`${key+1}B`} onChange = {(event, value) => { 
                                (this.state.selectedSeat === event.target.value) ? this.setState({isChecked: false,selectedSeat: null}) : 
                                this.setState({isChecked: true,openPopup: true, selectedSeat: `${key+1}B`})}  
                            } disabled = {isDisable} 
                            icon={<CircleUncheckedFilled height = "20px" color = {color} />}
                            checkedIcon={<CircleChecked />}
                                    />
                                    <span className="seatnum d-block d-md-none">{key+1}B</span>
                                    </div>
                          
                        );
                    }) }
                    </div>
                    <div className="flight-seat-322-C">
                    <p className="classA d-none d-md-block">C</p>&nbsp;&nbsp;
                    {flightSeatDataRowC.map((row,key) => {
                        let isDisable;
                        let color;
                        switch(row.occupied){
                            case 'false': 
                            isDisable = false;
                            color = "primary";
                            if(this.state.selectedSeat !== null && row.seatnumber !== this.state.selectedSeat){
                                isDisable = true;
                            }
                            break;
                            case 'true':
                            isDisable = true;
                            if(passengerData.seatno === `${key + 1}C`)
                            {   
                                isDisable = false;
                            }
                            if(row.category === "infant"){
                                color = "secondary";
                            } else if(row.category === "wheelchair") {
                                color = '#013220'
                            } else {
                                color="disabled"
                            }
                            break;
                            default:
                        }
                        return (
                            <div key={key} className="position-relative">
                            <Checkbox checked = {this.state.selectedSeat === `${key+1}C`} value = {`${key+1}C`} onChange = {(event, value) => { 
                                (this.state.selectedSeat === event.target.value) ? this.setState({isChecked: false,selectedSeat: null}) : 
                                this.setState({isChecked: true,openPopup: true, selectedSeat: `${key+1}C`})}  
                            } disabled = {isDisable} 
                            icon={<CircleUncheckedFilled height = "20px" color = {color} />}
                            checkedIcon={<CircleChecked />}
                                    />
                                    <span className="seatnum d-block d-md-none">{key+1}C</span>
                                    </div>
                                    
                          
                        );
                    }) }
                    </div>
                    <div className="seat-column d-none d-md-block">
                        <p className="column">
                            1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;7&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;8&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;9&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;11&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;12&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;13&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;14&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;15&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;16&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;17&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;18&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;19&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;20
                        </p>
                    </div>
                    <div className="flight-seat-322-D">
                    <p className="classA d-none d-md-block">D</p>&nbsp;&nbsp;
                    {flightSeatDataRowD.map((row,key) => {
                        let isDisable;
                        let color;
                        switch(row.occupied){
                            case 'false': 
                            isDisable = false;
                            color = "primary";
                            if(this.state.selectedSeat !== null && row.seatnumber !== this.state.selectedSeat){
                                isDisable = true;
                            }
                            break;
                            case 'true':
                            isDisable = true;
                            if(row.category === "infant"){
                                color = "secondary";
                            } else if(row.category === "wheelchair") {
                            color = '#013220'
                            } else {
                                color="disabled"
                            }
                            if(passengerData.seatno === `${key + 1}D`)
                            {   
                                isDisable = false;
                            }
                            break;
                            default:
                        }
                        return (
                            <div key={key} className="position-relative">
                            <Checkbox checked = {this.state.selectedSeat === `${key+1}D`} value = {`${key+1}D`} onChange = {(event, value) => { 
                                (this.state.selectedSeat === event.target.value) ? this.setState({isChecked: false,selectedSeat: null}) : 
                                this.setState({isChecked: true,openPopup: true, selectedSeat: `${key+1}D`})}  
                            } disabled = {isDisable} 
                            icon={<CircleUncheckedFilled height = "20px" color = {color} />}
                            checkedIcon={<CircleChecked />}
                                    />
                                    <span className="seatnum d-block d-md-none">{key+1}D</span>
                                    </div>
                          
                        );
                    }) }
                    
                    </div>
                    <div className="flight-seat-322-E">
                    <p className="classA d-none d-md-block">E</p>&nbsp;&nbsp;
                    {flightSeatDataRowE.map((row,key) => {
                        let isDisable;
                        let color;
                        switch(row.occupied){
                            case 'false': 
                            isDisable = false;
                            color = "primary";
                            if(this.state.selectedSeat !== null && row.seatnumber !== this.state.selectedSeat){
                                isDisable = true;
                            }
                            break;
                            case 'true':
                            isDisable = true;
                            if(row.category === "infant"){
                                color = "secondary";
                            } else if(row.category === "wheelchair") {
                                color = '#013220'
                            } else {
                                color="disabled"
                            }
                            if(passengerData.seatno === `${key + 1}E`)
                            {   
                                isDisable = false;
                            }
                            break;
                            default:
                        }
                        return (
                            <div key={key} className="position-relative">
                            <Checkbox checked = {this.state.selectedSeat === `${key+1}E`} value = {`${key+1}E`} onChange = {(event, value) => { 
                                (this.state.selectedSeat === event.target.value) ? this.setState({isChecked: false,selectedSeat: null}) : 
                                this.setState({isChecked: true,openPopup: true, selectedSeat: `${key+1}E`})}  
                            } disabled = {isDisable} 
                            icon={<CircleUncheckedFilled height = "20px" color = {color} />}
                            checkedIcon={<CircleChecked />}
                                    />
                                    <span className="seatnum d-block d-md-none">{key+1}E</span>
                                    </div>
                          
                        );
                    }) }
                    </div>
                    <div className="flight-seat-322-F">
                    <p className="classA d-none d-md-block">F</p>&nbsp;&nbsp;
                    {flightSeatDataRowF.map((row,key) => {
                        let isDisable;
                        let color;
                        switch(row.occupied){
                            case 'false': 
                            isDisable = false;
                            color = "primary";
                            if(this.state.selectedSeat !== null && row.seatnumber !== this.state.selectedSeat){
                                isDisable = true;
                            }
                            break;
                            case 'true':
                            isDisable = true;
                            if(row.category === "infant"){
                                color = "secondary";
                            } else if(row.category === "wheelchair") {
                            color = '#013220'
                            } else {
                                color="disabled"
                            }
                            if(passengerData.seatno === `${key + 1}F`)
                            {   
                                isDisable = false;
                            }
                            break;
                            default:
                        }
                        return (
                            <div key={key} className="position-relative">
                            <Checkbox checked = {this.state.selectedSeat === `${key+1}F`} value = {`${key+1}F`} onChange = {(event, value) => { 
                                (this.state.selectedSeat === event.target.value) ? this.setState({isChecked: false,selectedSeat: null}) : 
                                this.setState({isChecked: true,openPopup: true, selectedSeat: `${key+1}F`})}  
                            } disabled = {isDisable} 
                            icon={<CircleUncheckedFilled height = "20px" color = {color} />}
                            checkedIcon={<CircleChecked />}
                                    />
                                      <span className="seatnum d-block d-md-none">{key+1}F</span>
                                    </div>
                          
                        );
                    }) }
                    </div>
                    </div>
                    </div>
                </div>
                <div className="flight-seat-4">
                    <BootstrapButton disabled = {this.checkButtonStatus()} onClick = { this.seatBookHandler
                } color="primary">Continue</BootstrapButton>
                </div>
            </div>
        )
        
        }
}
const mapStateToProps = state => {
    return {
        passengerData: state.flight.passengerDetails,
        selectedFlightData: state.flight.selectedFlightDetails,
        seatData: state.flight.seatDetails,
        selectedPassengerData: state.flight.selectedPassengerDetails
    };
}
export default connect(mapStateToProps, {getFlightSeatDetails})(FlightSeatAllocation);