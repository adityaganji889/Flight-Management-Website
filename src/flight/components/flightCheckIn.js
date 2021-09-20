import { Typography, Icon, Button } from "@material-ui/core";
import React,{useState,useEffect} from 'react';
import './flightCheckIn.css';
import { FlightSeatAllocation } from "./flightSeatAllocation";
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import { getFlightPassengers, storeSelectedPassengerDetails } from '../../actions/flight.actions';
import { withRouter } from 'react-router-dom';
import AirlineSeatReclineExtraIcon from '@material-ui/icons/AirlineSeatReclineExtra';
const FlightCheckIn=(props)=>{
        const[obj,setObj] = useState({
            buttonLabel: 'Select seat(s)',
            selectedPassenger: null,
            tableData: {
                columns: [
                    { title: 'PNR', field: 'pnr' },
                    { title: 'PASSENGER NAME', field: 'passengerName' },
                    { title: 'SEAT NO', field: 'seatNumber' },
                    {
                        title: 'ADD-ONS',
                        field: 'addOns'
                        // lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
                    },
                    { title: 'BOARDING PASS', field: 'boardingPass', type: 'numeric' }
                ],
                data: [
                    { paxNo: '2', passengerName: 'Baran', seatNumber: '-', addOns: 'PROM', boardingPass: '-' },
                ],
            }
        });

    useEffect(()=>{
        if (props.selectedFlightData) {
            const flightData = props.selectedFlightData;
            props.getFlightPassengers(flightData.id);
        }
    },[]);
    handleSelection=(passengerData)=>{
        if(passengerData.seatNumber !== '-'){
            setObj({buttonLabel: 'Update seat(s)'})
        } else {
            setObj({buttonLabel: 'Select seat(s)'})
        }
    }
        console.log("selectedFlightData selectedFlightData Checkin 11", this.props.selectedFlightData);
        const data =[];
        const passengerMappedData = [];
        const BootstrapButton = withStyles({
            root: {
                boxShadow: 'none',
                textTransform: 'none',
                fontSize: 12,
                padding: '6px 12px',
                border: '1px solid',
                lineHeight: 1.5,
                backgroundColor: '#007bff',
                borderColor: '#007bff',
                fontFamily: [
                    '-apple-system',
                    'BlinkMacSystemFont',
                    '"Segoe UI"',
                    'Roboto',
                    '"Helvetica Neue"',
                    'Arial',
                    'sans-serif',
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"',
                    '"Segoe UI Symbol"',
                ].join(','),
                '&:hover': {
                    backgroundColor: '#0069d9',
                    borderColor: '#0062cc',
                },
                '&:active': {
                    boxShadow: 'none',
                    backgroundColor: '#0062cc',
                    borderColor: '#005cbf',
                },
                '&:focus': {
                    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
                },
            },
        })(Button);
        const ButtonRoute = withRouter(({ history }) => (
            <BootstrapButton onClick={() => { 
                // this.props.storeSelectedPassengerDetails()
                history.push('/flight/seatallocation') }} disableRipple variant="contained" color="primary">
                                      Select seat
                              </BootstrapButton>
        ));
        if(props.flightPassengerData) {
            const passengerData = props.flightPassengerData;
            passengerData.forEach((passengerData) => {
                data.push({
                    pnr: passengerData.pnr, 
                    passengerName: passengerData.name, 
                    seatNumber: (passengerData.seatno !== null) ? passengerData.seatno: '-', 
                    addOns: 'PROM', 
                    boardingPass: (passengerData.ischeckedin === 'true') ? 'Yes' : '-'
                });
                // passengerMappedData.push({
                //     "name": passengerData.name,
                //     "pnr": passengerData.pnr,
                //     "flightid": passengerData.flightid,
                //     "ischeckedin": passengerData.ischeckedin,
                //     "category": passengerData.category,
                //     "seatno": passengerData.seatno,
                //     "addons": passengerData.addOns,
                //     "row": passengerData.row,
                // })
            });
         }
        let tableData = (props && props.flightPassengerData && data.length !== 0) ? { 
            columns: [
                { title: 'PNR', field: 'pnr' },
                { title: 'PASSENGER NAME', field: 'passengerName' },
                { title: 'SEAT NO', field: 'seatNumber' },
                {
                    title: 'ADD-ONS',
                    field: 'addOns'
                    // lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
                },
                { title: 'BOARDING PASS', field: 'boardingPass', type: 'numeric' }
            ],
            data: data
         } : {};

        return (
            <div>
                {/* <Router>
                    
                        <Switch>
                        <Route exact path = "/flight" Component = {FlightCheckIn} />
                        <Route exact path="/seatallocation" component={FlightSeatAllocation} />
                        </Switch>
                    
                   
                </Router> */}
                <div class="flight-checkin-1">
                    <Typography class="title-1" variant="h4">
                        Check-in
                </Typography>
                </div>
                <div class="flight-checkin-2">
                    <img class='image-1' alt="checkin" src={require('../../assets/web.jpg').default}></img>
                </div>
                <div class="flight-checkin-3">
                    <div class="flight-checkin-31">
                        <div class="flight-checkin-311">
                            <Typography class="destination-1">DEL</Typography>
                            <Icon class="icon-1" style={{}}>
                                <ArrowRightAltIcon />
                            </Icon>
                            <Typography class="destination-2">JAI</Typography>
                        </div>
                        <div class="flight-checkin-311">
                            <Typography class="destination-3">DELHI(T1)<span> - </span></Typography>
                            <Typography class="destination-4">&nbsp;JAIPUR(T2)&nbsp;</Typography><span class="dot"> .&nbsp; </span>
                        </div>
                    </div>

                    <div class="flight-checkin-32">
                        <MaterialTable
                            columns={tableData.columns}
                            data={tableData.data}
                            actions={[
                                {
                                  icon: AirlineSeatReclineExtraIcon,
                                  tooltip: 'Check-in',
                                  onClick: (event, rowData) => () => { 
                                      console.log('rowdata----9999', rowData);
                                    this.props.history.push('/flight/seatallocation') }}
                              ]}
                            components={{
                                Action: props => (
                                    <BootstrapButton onClick={(event) => {
                                        // const selectedPassengerData  = passengerMappedData.filter(data => data.pnr === props.data.pnr);
                                        // this.props.storeSelectedPassengerDetails(selectedPassengerData);
                                        props.history.push('/flight/seatallocation') 
                                        props.action.onClick(event, props.data)
                                        }} disableRipple variant="contained" color="primary">
                                                              Select seat
                                                      </BootstrapButton>
                                ),
                              }}
                            options={{
                                headerStyle: {
                                    backgroundColor: 'black',
                                    color: '#FFF'
                                },
                                showTitle: false,
                                paging: false,
                                maxBodyHeight: 300,
                                actionsColumnIndex: -1,
                                actionsCellStyle: {
                                    width: '100px'
                                },
                                showSelectAllCheckbox: false,
                                rowStyle: rowData => ({
                                    backgroundColor: (this.state.selectedPassenger && this.state.selectedPassenger.tableData.checked === true && this.state.selectedPassenger.tableData.id === rowData.tableData.id) ? '#EEE' : '#FFF',
                                    border: (this.state.selectedPassenger && this.state.selectedPassenger.tableData.checked === true && this.state.selectedPassenger.tableData.id === rowData.tableData.id) ? '3px solid orange' : null
                                }),
                                selectionProps: rowData => ({
                                    //     disabled: this.state.selectedPassenger !== null,
                                    color: 'primary'
                                })
                            }}
                            onSelectionChange={(rows, data) => {
                                console.log(data);
                                if(data.tableData.checked === true){
                                    //this.handleSelection(data);
                                    console.log(this.state);
                                }
                            }}
                        />
                    </div>
                    <div class="flight-checkin-33">
                        <div class="flight-checkin-331">
                            <p class="note">Note: For checkin and receive boarding pass, please select seat for all segments </p>
                        </div>
                        <div class="flight-checkin-332">
                            {/* <ButtonRoute /> */}
                        </div>
                    </div>
                </div>
            </div>
        )
}
const mapStateToProps=(state)=> { 
    return {
        selectedFlightData: state.flight.selectedFlightDetails,
        flightPassengerData: state.flight.passengerDetails
    };
}
export default connect(mapStateToProps ,{getFlightPassengers , storeSelectedPassengerDetails})(FlightCheckIn)