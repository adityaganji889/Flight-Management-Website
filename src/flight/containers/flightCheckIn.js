import { Typography, Button } from "@material-ui/core";
import React, { Component } from 'react';
import './flightCheckIn.css';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import { getFlightPassengers, storeSelectedPassengerDetails } from '../../actions/flight.actions';
import AirlineSeatReclineExtraIcon from '@material-ui/icons/AirlineSeatReclineExtra';
import SearchIcon from '@material-ui/icons/Search';
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
class FlightCheckIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonLabel: 'Select seat(s)',
            selectedPassenger: null,
            checkedInChecked: false,
            infantChecked: false,
            wheelchairChecked: false,
            tableData: {
                columns: [
                    { title: 'PNR', field: 'pnr' },
                    { title: 'PASSENGER NAME', field: 'passengerName' },
                    { title: 'SEAT NO', field: 'seatNumber' },
                    {
                        title: 'ADD-ONS',
                        field: 'addOns'
                    },
                    { title: 'BOARDING PASS', field: 'boardingPass', type: 'numeric' }
                ],
                data: [
                    { paxNo: '2', passengerName: 'Baran', seatNumber: '-', addOns: 'PROM', boardingPass: '-' },
                ],
            }
        };

    }
    componentDidMount() {
        if (this.props.selectedFlightData) {
            const flightData = this.props.selectedFlightData;
            this.props.getFlightPassengers(flightData.flightId);
        }
    }
    handleSelection(passengerData) {
        if (passengerData.seatNumber !== '-') {
            this.setState({ buttonLabel: 'Update seat(s)' })
        } else {
            this.setState({ buttonLabel: 'Select seat(s)' })
        }
    }
    getTableData = () => {
        const data = [];
        let passengerData = [];
        if(this.props.flightPassengerData.length !== 0) {
            passengerData = this.props.flightPassengerData;
            if(this.state.checkedInChecked === true){
                passengerData = passengerData.filter((data) => {
                    return data.ischeckedin === "true"
                });
            }
        if(this.state.infantChecked === true){
                passengerData = passengerData.filter((data) => {
                    return data.category === "infant"
                });
            }
            if(this.state.wheelchairChecked === true){
                passengerData = passengerData.filter((data) => {
                    return data.category === "wheelchair"
                });
            }
            passengerData.forEach((passengerData) => {
                data.push({
                    pnr: passengerData.pnr, 
                    passengerName: passengerData.name, 
                    seatNumber: (passengerData.seatno !== null) ? passengerData.seatno: '-', 
                    addOns: 'PROM', 
                    boardingPass: (passengerData.ischeckedin === 'true') ? 'Yes' : '-'
                });
    });
}
    return data;
}
    getSeatButtonText = (data) => {
        if(data.seatNumber !== "-")
            return "Change Seat";
        else 
            return "Check In";
    }
    filterPassengerHandler = (name,event) => {
        this.setState({
            ...this.state,
            [name] : event.target.checked
        });
        
    }
    render() {
        const data = [];
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
        if (this.props.flightPassengerData) {
            const passengerData = this.props.flightPassengerData;
            passengerData.forEach((passengerData) => {
                data.push({
                    pnr: passengerData.pnr,
                    passengerName: passengerData.name,
                    seatNumber: (passengerData.seatno !== null) ? passengerData.seatno : '-',
                    addOns: 'PROM',
                    boardingPass: (passengerData.ischeckedin === 'true') ? 'Yes' : '-'
                });
                passengerMappedData.push({
                    "name": passengerData.name,
                    "pnr": passengerData.pnr,
                    "flightid": passengerData.flightid,
                    "ischeckedin": passengerData.ischeckedin,
                    "category": passengerData.category,
                    "seatno": passengerData.seatno,
                    "row": passengerData.row,
                    "id": passengerData.id,
                    "addons": passengerData.addons,
                    "address": passengerData.address,
                    "passport" : passengerData.passport,
                    "dob": passengerData.dob,
                    "email": passengerData.email
                })
            });
        }
        let tableData = (this.props && this.props.flightPassengerData && data.length !== 0) ? {
            columns: [
                { title: 'PNR', field: 'pnr' },
                { title: 'PASSENGER NAME', field: 'passengerName' },
                { title: 'SEAT NO', field: 'seatNumber' },
                {
                    title: 'ADD-ONS',
                    field: 'addOns'
                },
                { title: 'BOARDING PASS', field: 'boardingPass', type: 'numeric' }
            ],
            data: data
        } : {};
        const tableIcons = {
Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
        return (
            <div>
                <div className="flight-checkin-1">
                    <Typography className="title-1" variant="h4">
                        Check-in
                </Typography>
                </div>
                <div className="flight-checkin-2">
                    <img className='image-1' alt="checkin" src={require('../../assets/web.jpg').default}></img>
                </div>
                <div className="flight-checkin-3">
                    <div className="flight-checkin-31">
                    <div className="admin-filter-1">
                        <Typography style={{fontWeight: 'bold'}} className="admin-destination-1">FILTER PASSENGERS</Typography>
                        </div>
                        <div className="admin-filter-2">
                        <FormControlLabel
        control={
            <Checkbox
            value="checkedInChecked"
            onChange = {this.filterPassengerHandler.bind(this,'checkedInChecked')}
            color="primary"
            inputProps={{
              'aria-label': 'secondary checkbox',
            }}
          />
        }
        label="Checked In"
      />
       
      <FormControlLabel
        control={
            <Checkbox
            value="infantChecked"
            onChange = {this.filterPassengerHandler.bind(this,'infantChecked')}
            color="primary"
            inputProps={{
              'aria-label': 'secondary checkbox',
            }}
          />
        }
        label="Infants"
      />
          <FormControlLabel
        control={
            <Checkbox
            value="wheelchairChecked"
            onChange = {this.filterPassengerHandler.bind(this,'wheelchairChecked')}
            color="primary"
            inputProps={{
              'aria-label': 'secondary checkbox',
            }}
          />
        }
        label="Wheelchair"
      />
      </div>
                    </div>

                    <div className="flight-checkin-32">
                        <MaterialTable
                            icons={tableIcons}
                            columns={tableData.columns}
                            data={this.getTableData()}
                            actions={[
                                {
                                    icon: AirlineSeatReclineExtraIcon,
                                    tooltip: 'Check-in',
                                    onClick: (event, rowData) => () => {
                                        this.props.history.push('/flight/seatallocation')
                                    }
                                }
                            ]}
                            components={{
                                Action: props => (
                                    <BootstrapButton style={{fontSize:"smaller"}} onClick={(event) => {
                                        const selectedPassengerData = passengerMappedData.filter(data => data.pnr === props.data.pnr);
                                        this.props.storeSelectedPassengerDetails(selectedPassengerData[0]);
                                        this.props.history.push('/flight/seatallocation')
                                        props.action.onClick(event, props.data)
                                    }} disableRipple variant="contained" color="primary">
                                        {this.getSeatButtonText(props.data)}
                                                      </BootstrapButton>
                                ),
                            }}
                            options={{
                                headerStyle: {
                                    backgroundColor: 'darkslateblue',
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
                                    color:'primary'
                                })
                            }}
                            onSelectionChange={(rows, data) => {
                                if (data.tableData.checked === true) {
                                }
                            }}
                        />
                    </div>
                    <div className="flight-checkin-33">
                        <div className="flight-checkin-331">
                            <p className="note">Note: For checkin and receive boarding pass, please select seat for all segments </p>
                        </div>
                        <div className="flight-checkin-332">
                            {/* <ButtonRoute /> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedFlightData: state.flight.selectedFlightDetails,
        flightPassengerData: state.flight.passengerDetails
    };
}
export default connect(mapStateToProps, { getFlightPassengers, storeSelectedPassengerDetails })(FlightCheckIn)