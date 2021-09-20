import React ,{ Component } from "react";
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import './ancilliary-services-popup.css';
import axios from 'axios';
import {
    FormBuilder,
    FieldGroup,
    FieldControl,
    Validators
  } from "react-reactive-form";
class AncilliaryServicesPopup extends Component {
  ancilliaryForm = FormBuilder.group({
    isMealSelected: [""],
    mealType: ["", Validators.required],
    isLuggageSelected: [""],
    luggageType: ["", Validators.required],
    isShop: [""],
    isElectronics: [""],
    isHandicrafts: [""],
    shopItems: FormBuilder.array(['Earphones', 'wallet'])
  });
  componentDidMount(){
    //
  }
  customValidators() {
    if(this.ancilliaryForm){
    this.ancilliaryForm.valueChanges.subscribe(() => {
      //
    });
  }
  }
  checkDisabled = () => {
    if(this.ancilliaryForm.valid){
      return false;
    } else {
      return true;
    }
  }
  onClickOk = () => {
    let passengerData = (this.props.selectedPassengerData) ? this.props.selectedPassengerData: {};
    let seatData = (this.props.selectedSeatData) ? this.props.selectedSeatData : {};
    let inshop = null;
    if(this.ancilliaryForm.get('isShop').value === "yes"){
      if(this.ancilliaryForm.get("isElectronics").value){
        if(inshop === null){
          inshop = '';
        }
        inshop = inshop + 'Electronics ,';
      } 
      if(this.ancilliaryForm.get("isHandicrafts").value){
        if(inshop === null){
          inshop = '';
        }
        inshop = inshop + ' Handicrafts.';
      } 
    }
    const addons = {
      meal: (this.ancilliaryForm.get('isMealSelected').value === "yes") ? this.ancilliaryForm.get('mealType').value : null,
      luggage: (this.ancilliaryForm.get('isLuggageSelected').value === "yes") ? this.ancilliaryForm.get('luggageType').value : null,
      inshop: inshop
    }
    let url1 = `http://localhost:3001/passengers/${passengerData.id}`;
    axios.put(url1, {
        "name": passengerData.name,
        "pnr": passengerData.pnr,
        "flightid": passengerData.flightid,
        "ischeckedin": passengerData.ischeckedin,
        "category": passengerData.category,
        "seatno": passengerData.seatno,
        "row": passengerData.row,
        "id": passengerData.id,
        "addons": addons,
        "address": passengerData.address,
        "passport": passengerData.passport,
        "dob": passengerData.dob,
        "email": passengerData.email
    }).then(resp => {
      let url2 = `http://localhost:3001/seats/${seatData.id}`;
      axios.put(url2, {
          "id": seatData.id,
          "row": seatData.row,
          "seatnumber": seatData.seatnumber,
          "flightId": seatData.flightId,
          "booked": seatData.booked,
          "occupied": seatData.occupied,
          "category": seatData.category,
          "addons": addons
      }).then(resp => {
          console.log('success');
      }).catch(error => {
          console.log('error');
      });
      this.props.onProceed();
    }).catch(error => {
        console.log('error');
    });
    
  }
  checkDisabled = () => {

  }
  onClickCancel() {
    this.props.onCancel();
  }
render(){
    return (
        <Dialog
              maxWidth='sm'
              fullWidth= {true}
              disableBackdropClick
              disableEscapeKeyDown
              aria-labelledby="confirmation-dialog-title"
              open={this.props.open}
            >
              <DialogTitle className="ancilliary-title" id="confirmation-dialog-title">Add Ancilliary Services</DialogTitle>
              <DialogContent dividers>
              <FieldGroup
        control={this.ancilliaryForm}
        render={({ value, pristine, invalid }) => (
          <div>
            <form onSubmit={() => this.handleSubmit}>
              <FieldControl
                name="isMealSelected"
                render={({
                  handler,
                  pending,
                  touched,
                  hasError
                }) => (
                  <div>
                    <label className="heading-labels">Want a meal? </label>

                    <div>
                        <input {...handler("radio", "yes")} />
                        <label>Yes</label>
                      </div>
                      <div>
                        <input {...handler("radio", "no")} />
                        <label>No</label>
                      </div>
                    {this.ancilliaryForm.get("isMealSelected").value === "yes" ? (
                      <div>
                        <FieldControl
                          name="mealType"
                          render={({
                            handler,
                            pending,
                            touched,

                            hasError
                          }) => (
                            <div>
                              <label className="heading-labels-2">Select meal Type</label>
                              &nbsp;&nbsp;
                              <select {...handler()}>
                                <option value="" disabled>
                                  Select
                                </option>
                                <option value="Veg Meal">Veg Meal</option>
                                <option value="Non Veg Meal">Non Veg Meal</option>
                              </select>
                            </div>
                          )}
                        />
                      </div>
                    ) : ''}
                    {pending && <i className="fa fa-spinner fa-spin" />}
                    <div>
                     
                    </div>
                  </div>
                )}
              />
                 <FieldControl
                name="isLuggageSelected"
                render={({
                  handler,
                  pending,
                  touched,
                  hasError
                }) => (
                  <div>
                    <label className="heading-labels">Have Extra Luggage? </label>

                    <div>
                        <input {...handler("radio", "yes")} />
                        <label>Yes</label>
                      </div>
                      <div>
                        <input {...handler("radio", "no")} />
                        <label>No</label>
                      </div>
                    {this.ancilliaryForm.get("isLuggageSelected").value === "yes" ? (
                      <div>
                        <FieldControl
                          name="luggageType"
                          render={({
                            handler,
                            pending,
                            touched,

                            hasError
                          }) => (
                            <div>
                              <label className="heading-labels-2">Select Luggage Category </label>
                              <select {...handler()}>
                                <option value="" disabled>
                                  Select
                                </option>
                                <option value="30 kg">Upto 30 Kg</option>
                                <option value="50 Kg">Upto 50 Kg</option>
                              </select>
                            </div>
                          )}
                        />
                      </div>
                    ) : ''}
                    
                  </div>
                )}
              />
                <FieldControl
                name="isShop"
                render={({
                  handler,
                  pending,
                  touched,
                  hasError
                }) => (
                  <div>
                    <label className="heading-labels">Want to Buy anything? </label>

                    <div>
                        <input {...handler("radio", "yes")} />
                        <label>Yes</label>
                      </div>
                      <div>
                        <input {...handler("radio", "no")} />
                        <label>No</label>
                      </div>
                    {this.ancilliaryForm.get("isShop").value === "yes" ? (
                      <div>
                        <label className="heading-labels-2">Select Items </label>
                        &nbsp;&nbsp;
                        <FieldControl
                          name="isHandicrafts"
                          render={({
                            handler,
                            pending,
                            touched,

                            hasError
                          }) => (
                            <div>
                              
                              <div>
                        <input {...handler("checkbox")} />
                        <label>Handicrafts</label>
                      </div>
                            </div>
                          )}
                        />
                         <FieldControl
                          name="isElectronics"
                          render={({
                            handler,
                            pending,
                            touched,

                            hasError
                          }) => (
                            <div>
                              
                              <div>
                        <input {...handler("checkbox")} />
                        <label>Electronics</label>
                      </div>
                            </div>
                          )}
                        />
                      </div>
                    ) : ''}
                    
                  </div>
                )}
              />
              <Button variant="contained" color="secondary"  onClick = { () => this.props.onCancel() }  >
                  Cancel
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button  variant="contained" disabled = {this.checkDisabled()} color="primary"  onClick = { 
                  
                  this.onClickOk
                  
                   } >
                  Proceed
                </Button>
            </form>
          </div>
        )}
      />
              </DialogContent>
              <DialogActions>
              </DialogActions>
            </Dialog>
    )
}
}
export default AncilliaryServicesPopup;