import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { passengerForm } from '../../actions/flight.actions';
import { Button } from "@material-ui/core";
import AdminNavBar from '../components/admin-nav-bar';
import './admin-passenger-update-form.css';
import axios from 'axios';
import CustomizedSnackBar from '../../shared/ui-components/snackbar';
class AdminPassengerUpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySnackBar: false,
      navBarClass: ''
    }
  }
  onNavBarHandler = (className) => {
    this.setState({
        navBarClass: className
    })
}
  componentDidMount() {
    if (this.props.selectedPassenger) {
      const selectedPassenger = this.props.selectedPassenger;
      const data = {
        name: selectedPassenger.name,
        email: selectedPassenger.email,
        dob: selectedPassenger.dob,
        passport: selectedPassenger.passport,
        address: selectedPassenger.address
      };
      this.props.passengerForm(data);
    }
  }
  render() {
    let { handleSubmit} = this.props;
    let navClass = `admin-landing-page-1 ${this.state.navBarClass}`;
    return (
      <div className="admin-landing-page">
        <div className = {navClass}>
            <AdminNavBar onNavBarHandler = {this.onNavBarHandler} />
            </div>
        <div className="admin-form-page">
          <div className="admin-seat-1">
            UPDATE PASSENGER DETAILS
                </div>
          <form className="form" onSubmit={handleSubmit(val => {
            const data = {
              name: val.name,
              pnr: val.pnr,
              flightid: val.flightid,
              ischeckedin: val.ischeckedin,
              category: val.category,
              seatno: val.seatno,
              row: val.row,
              id: val.id,
              addons: val.addons,
              address: val.address,
              passport : val.passport,
              dob: val.dob,
              email: val.email
            };
            this.props.passengerForm(data);
            let url1 = `http://localhost:3001/passengers/${data.id}`;
            axios.put(url1, data).then(resp => {
                this.setState({displaySnackBar: true});
            }).catch(error => {
                console.log('error');
            });
          })}>
            <div className="form-div">
              <label className="labels">Name</label>
              <Field disabled={true} className="inputs" name="name" component="input" type="text" placeholder="Name" />
            </div>
            <div className="form-div">
              <label className="labels">Email</label>
              <Field disabled className="inputs" name="email" component="input" type="text" placeholder="Email" />
            </div>
            <div className="form-div">
              <label className="labels-dob">DOB</label>
              <Field className="inputs" name="dob" component="input" type="text" placeholder="Date Of Birth" />
            </div>
            <div className="form-div">
              <label className="labels-passport">Passport</label>

              <Field className="inputs" name="passport" component="input" type="text" placeholder="Passport Details" />

            </div>
            <div className="form-div">
              <label className="labels-address">Address</label>

              <Field className="inputs" name="address" component="input" type="text" placeholder="Address" />

            </div>
            <div>
            </div>
            <div className="admin-update-3">
              <Button variant="contained" color="primary" type="submit" disabled={this.pristine || this.submitting}>Submit</Button>
            </div>
          </form>
        </div>
        {this.state.displaySnackBar ? <CustomizedSnackBar open = {this.state.displaySnackBar} message = "Passenger Details Updated!!" /> : ''}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    selectedPassenger: state.flight.selectedPassengerDetails,
    initialValues: state.flight.selectedPassengerDetails,
    selectedPassengerUpdatedData: state.flight.passengerFormDetails
  };
}
AdminPassengerUpdateForm = reduxForm({
  form: 'initializeFromState' // a unique identifier for this form
})(AdminPassengerUpdateForm);

AdminPassengerUpdateForm = connect(
  mapStateToProps,
  { passengerForm } // bind account loading action creator
)(AdminPassengerUpdateForm)

export default AdminPassengerUpdateForm;