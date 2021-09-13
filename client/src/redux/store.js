import {createStore,applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { authReducer } from './reducer/authReducer'
import { alertReducer } from './reducer/alertReducer'
import { mapReducer } from './reducer/mapReducer'
import { statusReducer } from './reducer/statusReducer'



const userInfo = localStorage.getItem('auth_travel')? JSON.parse(localStorage.getItem('auth_travel')):null
const initialState= {
    auth:{...userInfo}
}

const reducer = combineReducers({
    auth:authReducer,
    alert:alertReducer,
    map:mapReducer,
    status: statusReducer,

})

const store = createStore(reducer,initialState, composeWithDevTools(applyMiddleware(thunk)))

  export const DataProvider = ({children})=>{
    return(
        <Provider store={store}>
            {children}
        </Provider>)
}