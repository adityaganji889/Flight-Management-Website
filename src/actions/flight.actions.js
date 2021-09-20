import axios from 'axios';
export const FLIGHT_ACTIONS = {
    GETALLFLIGHTS: 'GET_ALL_FLIGHTS',
    GETSELECTEDFLIGHT: 'GET_SELECTED_FLIGHT',
    GETFLIGHTPASSENGERS: 'GET_FLIGHT_PASSENGERS',
    GETFLIGHTSEATS: 'GET_FLIGHT_SEATS',
    GETSELECTEDPASSENGER: 'GET_SELECTED_PASSENGER'
};
export const getAllFlights = ()  => dispatch => {
    const url = 'http://localhost:3001/flights';
    axios.get(url).then((res)=> {
        if(res){
            dispatch({
                type: FLIGHT_ACTIONS.GETALLFLIGHTS,
                payload: res.data
            });
        }
    })
    .catch((exception) => {
        console.log('error');
    })
}
export const storeSelectedFlightDetails = data => dispatch => {
    dispatch({type: FLIGHT_ACTIONS.GETSELECTEDFLIGHT, payload: data});
}
export const storeSelectedPassengerDetails = data => dispatch => {
    dispatch({
        type: FLIGHT_ACTIONS.GETSELECTEDPASSENGER,
        payload: data
    })
}

export const getFlightPassengers = id => dispatch => {
    const url = 'http://localhost:3001/passengers';
    axios.get(url).then((res) => {
        if(res){
            const selectedFlightPassengers = res.data.filter((data) => {
                return data.flightid === id;
            });
            dispatch({
                type: FLIGHT_ACTIONS.GETFLIGHTPASSENGERS,
                 payload: selectedFlightPassengers
            });
        }
    })
    .catch((exception) => {
        console.log('error');
    })
}
export const passengerForm = data => dispatch => {
    dispatch({
        type: 'PASSENGER_FORM',
        payload: data
    })
}
export const getFlightSeatDetails = id => dispatch => {
    const url = 'http://localhost:3001/seats';
    axios.get(url).then((res) => {
        if(res){
            const seatDetails = res.data.filter((data) => {
                return id === data.flightId;
            });
            dispatch({
                type: FLIGHT_ACTIONS.GETFLIGHTSEATS,
                payload: seatDetails
            });
        }
    })
    .catch((exception) => {
        console.log('error');
    })
}

