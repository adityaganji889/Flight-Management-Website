import { AUTH_ACTIONS } from  './../actions/auth.actions'
let loginStatus={
    loginData:[],
    isLoggedIn:false
}
const authReducer = (state = loginStatus, action) => {
    switch(action.type){
        case AUTH_ACTIONS.LOGIN: 
            return {...state, 
                isLoggedIn: true,
                loginData: action.payload
            } 
        case  AUTH_ACTIONS.LOGOUT:
            return {...state,
                isLoggedIn: false,
                loginData: action.payload
            }
        default : return state;
    }
}
export default authReducer;