import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
export class SeatConfirmationPopup extends React.Component{
  onClickOk() {
    this.props.onProceed();
  }
  onClickCancel() {
    this.props.onCancel();
  }
  getDialogTitle = ()=> {
    if(this.props.source === "inflight"){
      return "Selected Passenger"
    } else {
      return "Selected Seat"
    }
  }
  getDialogContent(){
    if(this.props.source !== "inflight" ){
    return(
      <div>
        {this.props.selectedSeat}
      </div>
    );
    } else {
      if(this.props.passengerData !== undefined){
      return(
        <div>
        <div>
          {this.props.passengerData.name}
        </div>
        <div>
          {this.props.passengerData.seatno}
        </div>
        </div>
      );
    }
  }
  }
    render(){
        return (
            <Dialog
              disableBackdropClick
              disableEscapeKeyDown
              maxWidth="xs"
            //   onEntering={handleEntering}
              aria-labelledby="confirmation-dialog-title"
              open={this.props.open}
            >
              <DialogTitle id="confirmation-dialog-title">{this.getDialogTitle()}</DialogTitle>
              <DialogContent dividers>{this.getDialogContent()}
              </DialogContent>
              <DialogActions>
                <Button onClick = { () => this.props.onCancel() } color="primary">
                  Cancel
                </Button>
                <Button onClick = { () => this.props.onProceed() } color="primary">
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          );
    }
}