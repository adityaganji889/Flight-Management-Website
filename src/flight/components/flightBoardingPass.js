import React from 'react';
import { BootstrapButton } from '../../shared/ui-components/bootstrapbutton';
import './flightBoardingPass.css';
import { withRouter } from 'react-router-dom';
export const FlightBoardingPass = (props) => {
    const style1 = {
        'marginRight': '20px'
    };
    const ButtonRoutePassenger = withRouter(({ history }) => (
        <BootstrapButton style = {style1} onClick={() => { 
            history.push('/flight') }} disableRipple variant="contained" color="primary">
                                  Passenger List
                          </BootstrapButton>
    ));
    const ButtonRouteInFlight = withRouter(({ history }) => (
        <BootstrapButton onClick={() => { 
            history.push('/flight/inflight') }} disableRipple variant="contained" color="primary">
                                  In Flight
                          </BootstrapButton>
    ));
    return (
        <div className="boarding-pass">
            <div className="boarding-pass-1">
  <div className="transbox">
    <p>Your web check-in is successful.</p>
  </div>
</div>
<div className="boarding-pass-2">
<ButtonRoutePassenger />
<ButtonRouteInFlight />
</div>
        </div>
    )
}