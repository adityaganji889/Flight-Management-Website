export const AUTH_ACTIONS = {
    LOGIN: "LOG_IN",
    LOGOUT: "LOG_OUT"
}

export const storeLoginData = data => dispatch =>{
    dispatch({type: AUTH_ACTIONS.LOGIN , payload:data} );
}
export const logoutUser = data => dispatch => {
    dispatch({type: AUTH_ACTIONS.LOGOUT, payload:data});
}