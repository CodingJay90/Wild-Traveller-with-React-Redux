import { combineReducers } from 'redux'
import locationReducer from './reducers/locationReducer'
import authReducer from './reducers/authReducer'

export default combineReducers({
    location: locationReducer,
    auth: authReducer
})