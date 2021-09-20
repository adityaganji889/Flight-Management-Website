import authReducer from "./auth.reducer";
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import flightReducer from "./flight.reducer";
const rootReducer = combineReducers({
    auth: authReducer,
    flight: flightReducer,
    form: formReducer
});
export default rootReducer;