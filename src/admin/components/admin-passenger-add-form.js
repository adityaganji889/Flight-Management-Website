import React, { useState } from 'react';
import axios from 'axios';
import CustomizedSnackBar from '../../shared/ui-components/snackbar';
import AdminNavBar from '../components/admin-nav-bar';
import { connect } from "react-redux";
import { Button } from '@material-ui/core';
import './admin-passenger-add-form.css';
const AdminPassengerAddForm = (props) => {
    const [navBarClass, setNavClass] = useState('');
        let navClass = `admin-landing-page-1 ${navBarClass}`;
    let displaySnackBar = false;
    const onNavBarHandler = (className) => {
        setNavClass({
            navBarClass: className
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        let passengerName = (passengerNameRef.value) ? passengerNameRef.value : null;
        let passport = (passportRef.value) ? passportRef.value : null;
        let address = (addressRef.value) ? addressRef.value : null;
        let email = (emailRef.value) ? emailRef.value : null;
        let dob = (dobRef.value) ? dobRef.value: null;
        let flightData = (props.flightData) ? props.flightData: null;
        const passengerDetails = {
            "name": passengerName,
            "pnr": Math.random().toString(36).substring(7),
            "flightid": flightData.flightId,
            "ischeckedin": "false",
            "category": "normal",
            "seatno": null,
            "row": null,
            "id": Math.floor((Math.random()*1000) + 1000),
            "addons": {
                "meal": null,
                "luggage": null,
                "inshop": null
            },
            "address": address,
            "passport": passport,
            "dob": dob,
            "email": email
        };
        axios.post('http://localhost:3001/passengers', passengerDetails).then(res => {
           
                displaySnackBar = true;
            
        }).catch(err => {
            alert("passenger cannot be added");
        })
    }
    let passengerNameRef;
    let emailRef;
    let dobRef;
    let passportRef;
    let addressRef;
    return (
        <div className="admin-landing-page">
            <div className={navClass}>
                <AdminNavBar onNavBarHandler={onNavBarHandler} />
            </div>
            <div className="admin-form-page">
                <div className="admin-seat-1">
                    ADD PASSENGER
                </div>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-div">
                        <label className="labels">Name</label>
                        <input ref={(passengername) => passengerNameRef = passengername} type="text" placeholder="username" />
                    </div>
                    <div className="form-div">
                        <label className="labels">Email</label>
                        <input ref={(passengeremail) => emailRef = passengeremail} type="text" placeholder="Email" />
                    </div>
                    <div className="form-div">
                        <label className="labels-dob">Dob</label>
                        <input ref={(passengerdob) => dobRef = passengerdob} type="text" placeholder="Date of Birth" />
                    </div>
                    <div className="form-div">
                        <label className="labels-passport">Passport</label>
                        <input ref={(passport) => passportRef = passport} placeholder="Passport" type="text" />
                    </div>
                    <div className="form-div">
                        <label className="labels-address">Address</label>
                        <input ref={(address) => addressRef = address} placeholder="Address" type="text" />
                    </div>
                    <div>
                        <Button type="submit" variant="contained" color="secondary" value="Submit" >
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
            {displaySnackBar ? <CustomizedSnackBar open={displaySnackBar} message="Passenger Added!!" /> : ''}
        </div>
    );
}
const mapStateToProps = (state) => {
    return{
    flightData: state.flight.selectedFlightDetails
    };
}
export default connect(mapStateToProps)(AdminPassengerAddForm);