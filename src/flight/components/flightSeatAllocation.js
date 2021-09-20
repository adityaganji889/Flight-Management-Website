import React,{useState,useEffect} from 'react';
import './flightSeatAllocation.css';
import Checkbox from '@material-ui/core/Checkbox';
import CircleChecked from '@material-ui/icons/CheckCircleOutline'; 
import CircleUncheckedFilled from '@material-ui/icons/RadioButtonUnchecked';
import {getFlightSeatDetails} from '../../actions/flight.actions';
import { connect } from 'react-redux';
import { SeatConfirmationPopup } from '../../shared/popups/seat-confirmation-popup';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { BootstrapButton } from '../../shared/ui-components/bootstrapbutton'; 
import Axios from 'axios';
const FlightSeatAllocation=(props)=>{
         const [obj,setObj]=useState({
            flightData: null,
            passengerData: null,
            seatData: null,
            openPopup: null,
            selectedSeat: null,
            isChecked: null
        });

    useEffect(()=>{
        if(props.selectedFlightData && props.passengerData){
            setObj({flightData: props.selectedFlightData, passengerData: props.passengerData, seatData: seatData});
            props.getFlightSeatDetails(props.selectedFlightData.id);
        }
        if(props.selectedPassengerData){
            console.log(props.selectedPassengerData);
            if(props.selectedPassengerData.seatNumber !== "-"){
                this.setState({
                    selectedSeat: props.selectedPassengerData.seatNumber
                });
            }
        }
    },[]);
    onProceed=()=>{
        setObj({openPopup:false});
    }
    onCancel=()=>{
        setObj({openPopup:false});
    }
    getSeatText=()=>{
        if(obj.selectedSeat !== null) {
            return obj.selectedSeat;
        } else {
            return 'Select your seat'
        }
    }
        let flightSeatData = (props.seatData !== undefined)? props.seatData: [];
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
        let passengerData = (props.selectedPassengerData !== undefined) ? props.selectedPassengerData : {};
        console.log(passengerData);
        // let seatData = (flightSeatData !== undefined && this.props.selectedSeat !== undefined) ? flightSeatData.filter((seat) => {seat.seatNumber === this.props.selectedSeat}) : {};
        if(flightSeatData !== undefined && props.selectedPassengerData !== undefined){
            let seatData = flightSeatData.filter(seat => 
                seat.seatnumber === obj.selectedSeat
            )[0];
            console.log(seatData);
        }
        return(
            <div class="flight-seat">
                <div class="flight-seat-1">
                    SEAT SELECT
                </div>
                <div class="flight-seat-2">
                    <p>{flightData.From_name}&nbsp;&nbsp;-&nbsp;&nbsp;{flightData.To_name}</p>
                </div>
                <div class="flight-seat-3">
                   <div class="flight-seat-31">
                    <div class="flight-seat-311">
                        <img class="image-2" alt="plane" src={require('../../assets/flight_black1.png')} />&nbsp;&nbsp;&nbsp;  <p class="ticket">A320|321</p>
                    </div>
                    <div class="flight-seat-312">
                    <img class="image-5" alt="assigned icon" src={require('../../assets/icons8-ok-24.png')} />
                    <p class="paragraph-1">Assigned</p> &nbsp;&nbsp;&nbsp;&nbsp;
                    <img class="image-5" alt="assigned icon" src={require('../../assets/icons8-filled-circle-24.png')} />
                    <p class="paragraph-1">Free</p> &nbsp;&nbsp;&nbsp;&nbsp;
                    <img class="image-5" alt="assigned icon" src={require('../../assets/icons8-filled-circle-24 (1).png')} />
                    <p class="paragraph-1">Occupied</p> &nbsp;&nbsp;&nbsp;&nbsp;
                    <img class="image-5" alt="assigned icon" src={require('../../assets/icons8-filled-circle-24 (1).png')} />
                    <p class="paragraph-1">Passengers with Infants</p> &nbsp;&nbsp;&nbsp;&nbsp;
                    <img class="image-5" alt="assigned icon" src={require('../../assets/icons8-filled-circle-24 (1).png')} />
                    <p class="paragraph-1">Passengers with Wheelchair</p> &nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                   </div>
                   <div class="flight-seat-32" >
                    <div class="flight-seat-321">
                    <div class="flight-seat-321-text">
                        <p class="small-text-1">Passenger 1</p><p class="big-text">{passengerData.passengerName}</p><p class="small-text-2">{this.getSeatText()}</p>
                    </div>
                    </div>
                    <div class="vertical"></div>
                    <SeatConfirmationPopup
          classes={{
            paper: {
                width: '80%',
                maxHeight: 435,
            }
          }}
          id="ringtone-menu"
          keepMounted
          open = {openPopup}
          onProceed = {() => {
              setObj({openPopup:false, 
                      isChecked:true});

            }}
          onCancel = {() => {setObj({openPopup: false, selectedSeat: null, isChecked: false})}}
        //   value={value}
          selectedSeat = {obj.selectedSeat}
        />
                    <div class="flight-seat-322">
                    <div class="flight-seat-322-A">
                    <p class="classA">A</p>&nbsp;&nbsp;
                    {flightSeatDataRowA.map((row,key) => {
                        let isDisable;
                        let color;
                        switch(row.occupied){
                            case 'false': 
                            isDisable = false;
                            color = "primary";
                            if(obj.selectedSeat !== null && row.seatnumber !== obj.selectedSeat){
                                isDisable = true;
                            }
                            break;
                            case 'true':
                            isDisable = true;
                            color = "disabled"
                            if(passengerData.seatNumber === `${key + 1}A`)
                            {   
                                isDisable = false;
                            }
                            break;
                            default:
                        }
                        return (
                            <Checkbox checked = {obj.selectedSeat === `${key+1}A`} value = {`${key+1}A`} onChange = {(event, value) => { 
                                (obj.selectedSeat === event.target.value) ? setObj({isChecked: false,selectedSeat: null}) : 
                                setObj({isChecked: true,openPopup: true, selectedSeat: `${key+1}A`})}  
                            } disabled = {isDisable} 
                            icon={<CircleUncheckedFilled height = "20px" color = {color} />}
                            checkedIcon={<CircleChecked />}
                                    />
                          
                        );
                    }) }
                    
                    </div>
                    <div class="flight-seat-322-B">
                    <p class="classA">B</p>&nbsp;&nbsp;
                    {flightSeatDataRowB.map((row,key) => {
                        let isDisable;
                        let color;
                        switch(row.occupied){
                            case 'false': 
                            isDisable = false;
                            color = "primary";
                            if(obj.selectedSeat !== null && row.seatnumber !== obj.selectedSeat){
                                isDisable = true;
                            }
                            break;
                            case 'true':
                            isDisable = true;
                            if(passengerData.seatNumber === `${key + 1}B`)
                            {   
                                isDisable = false;
                            }
                            color = "disabled"
                            break;
                            default:
                        }
                        return (
                            <Checkbox checked = {obj.selectedSeat === `${key+1}B`} value = {`${key+1}B`} onChange = {(event, value) => { 
                                (obj.selectedSeat === event.target.value) ? setObj({isChecked: false,selectedSeat: null}) : 
                                setObj({isChecked: true,openPopup: true, selectedSeat: `${key+1}B`})}  
                            } disabled = {isDisable} 
                            icon={<CircleUncheckedFilled height = "20px" color = {color} />}
                            checkedIcon={<CircleChecked />}
                                    />
                          
                        );
                    }) }
                    </div>
                    <div class="flight-seat-322-C">
                    <p class="classA">C</p>&nbsp;&nbsp;
                    {flightSeatDataRowC.map((row,key) => {
                        let isDisable;
                        let color;
                        switch(row.occupied){
                            case 'false': 
                            isDisable = false;
                            color = "primary";
                            if(obj.selectedSeat !== null && row.seatnumber !== obj.selectedSeat){
                                isDisable = true;
                            }
                            break;
                            case 'true':
                            isDisable = true;
                            if(passengerData.seatNumber === `${key + 1}C`)
                            {   
                                isDisable = false;
                            }
                            color = "disabled"
                            break;
                            default:
                        }
                        return (
                            <Checkbox checked = {obj.selectedSeat === `${key+1}C`} value = {`${key+1}C`} onChange = {(event, value) => { 
                                (obj.selectedSeat === event.target.value) ? setObj({isChecked: false,selectedSeat: null}) : 
                                setObj({isChecked: true,openPopup: true, selectedSeat: `${key+1}C`})}  
                            } disabled = {isDisable} 
                            icon={<CircleUncheckedFilled height = "20px" color = {color} />}
                            checkedIcon={<CircleChecked />}
                                    />
                                    
                          
                        );
                    }) }
                    </div>
                    <div class="seat-column">
                        <p class="column">
                            1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;7&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;8&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;9&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;11&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;12&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;13&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;14&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;15&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;16&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;17&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;18&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;19&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;20
                        </p>
                    </div>
                    <div class="flight-seat-322-D">
                    <p class="classA">D</p>&nbsp;&nbsp;
                    {flightSeatDataRowD.map((row,key) => {
                        let isDisable;
                        let color;
                        switch(row.occupied){
                            case 'false': 
                            isDisable = false;
                            color = "primary";
                            if(obj.selectedSeat !== null && row.seatnumber !== obj.selectedSeat){
                                isDisable = true;
                            }
                            break;
                            case 'true':
                            isDisable = true;
                            color = "disabled"
                            if(passengerData.seatNumber === `${key + 1}D`)
                            {   
                                isDisable = false;
                            }
                            break;
                            default:
                        }
                        return (
                            <Checkbox checked = {this.state.selectedSeat === `${key+1}D`} value = {`${key+1}D`} onChange = {(event, value) => { 
                                (obj.selectedSeat === event.target.value) ? setObj({isChecked: false,selectedSeat: null}) : 
                                setObj({isChecked: true,openPopup: true, selectedSeat: `${key+1}D`})}  
                            } disabled = {isDisable} 
                            icon={<CircleUncheckedFilled height = "20px" color = {color} />}
                            checkedIcon={<CircleChecked />}
                                    />
                          
                        );
                    }) }
                    
                    </div>
                    <div class="flight-seat-322-E">
                    <p class="classA">E</p>&nbsp;&nbsp;
                    {flightSeatDataRowE.map((row,key) => {
                        let isDisable;
                        let color;
                        switch(row.occupied){
                            case 'false': 
                            isDisable = false;
                            color = "primary";
                            if(obj.selectedSeat !== null && row.seatnumber !== obj.selectedSeat){
                                isDisable = true;
                            }
                            break;
                            case 'true':
                            isDisable = true;
                            if(passengerData.seatNumber === `${key + 1}E`)
                            {   
                                isDisable = false;
                            }
                            color = "disabled"
                            break;
                            default:
                        }
                        return (
                            <Checkbox checked = {obj.selectedSeat === `${key+1}E`} value = {`${key+1}E`} onChange = {(event, value) => { 
                                (obj.selectedSeat === event.target.value) ? setObj({isChecked: false,selectedSeat: null}) : 
                                setObj({isChecked: true,openPopup: true, selectedSeat: `${key+1}E`})}  
                            } disabled = {isDisable} 
                            icon={<CircleUncheckedFilled height = "20px" color = {color} />}
                            checkedIcon={<CircleChecked />}
                                    />
                          
                        );
                    }) }
                    </div>
                    <div class="flight-seat-322-F">
                    <p class="classA">F</p>&nbsp;&nbsp;
                    {flightSeatDataRowF.map((row,key) => {
                        let isDisable;
                        let color;
                        switch(row.occupied){
                            case 'false': 
                            isDisable = false;
                            color = "primary";
                            if(obj.selectedSeat !== null && row.seatnumber !== obj.selectedSeat){
                                isDisable = true;
                            }
                            break;
                            case 'true':
                            isDisable = true;
                            color = "disabled"
                            if(passengerData.seatNumber === `${key + 1}F`)
                            {   
                                isDisable = false;
                            }
                            break;
                            default:
                        }
                        return (
                            <Checkbox checked = {obj.selectedSeat === `${key+1}F`} value = {`${key+1}F`} onChange = {(event, value) => { 
                                (obj.selectedSeat === event.target.value) ? setObj({isChecked: false,selectedSeat: null}) : 
                                setObj({isChecked: true,openPopup: true, selectedSeat: `${key+1}F`})}  
                            } disabled = {isDisable} 
                            icon={<CircleUncheckedFilled height = "20px" color = {color} />}
                            checkedIcon={<CircleChecked />}
                                    />
                          
                        );
                    }) }
                    </div>
                    </div>
                    </div>
                </div>
                <div class="flight-seat-4">
                    <BootstrapButton onClick = { () => {
                        props.history.push('/flight/confirmation');
                        let url1 = `http://localhost:3001/passengers?q=${passengerData.pnr}`;
                        let data = {
                            ...passengerData,
                            seatno: obj.selectedSeat
                        }
                        axios.put(url1, data);
                    }
                } color="primary">Continue</BootstrapButton>
                </div>
            </div>
        )
        
}
const mapStateToProps = (state) => {
    return {
        passengerData: state.flight.passengerDetails,
        selectedFlightData: state.flight.selectedFlightDetails,
        seatData: state.flight.seatDetails,
        selectedPassengerData: state.flight.selectedPassengerDetails
    };
}
export default connect(mapStateToProps, {getFlightSeatDetails})(FlightSeatAllocation);