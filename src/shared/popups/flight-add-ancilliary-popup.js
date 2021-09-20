import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import React from 'react';

const FlightAddAncilliaryPopup = (props) => {
    let mealRef;
    let luggageRef;
    let inShopRef;
    return(
        <Dialog
        maxWidth='sm'
        fullWidth={true}
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby="confirmation-dialog-title"
        open={props.open}
      >
        <DialogTitle className="ancilliary-title" id="confirmation-dialog-title">Add Ancilliary Services</DialogTitle>
        <DialogContent dividers>
    <div>
      <form onSubmit={() => this.handleSubmit}>
            <div>
              <label className="heading-labels">Enter meal: </label>
              <input ref={(mealname) => mealRef = mealname} type="text" />
            </div>
            <br/>
            <div>
              <label className="heading-labels">Enter Luggage Service: </label>
              <input ref={(luggagename) => luggageRef = luggagename} type="text" />
              
            </div>
            <br/>
            <div>
              <label className="heading-labels">InShop Items: </label>
              <input ref={(itemname) => inShopRef = itemname} type="text" />
            
            </div>
            <br/>
        <Button  onClick = { () => props.onCancel() } variant="contained" color="secondary">
            Cancel
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button onClick = {() => props.onProceed(mealRef.value,luggageRef.value,inShopRef.value)} variant="contained"  color="primary" >
            Proceed
          </Button>
      </form>
    </div>
  

        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    )
}
export default FlightAddAncilliaryPopup;