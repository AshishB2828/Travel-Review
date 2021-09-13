import { mapConstant } from "../constant/allConstants";

export const mapReducer = (state ={pins:[], loading: false}, action) =>{
    switch(action.type) {
        case mapConstant.FETCH_PINS:
            return {...state, pins:action.payload}
        case mapConstant.UPDATE_PINS:
            return {...state, pins:state.pins.map(pin=>pin._id===action.payload._id? action.payload:pin)}
        case mapConstant.DELETE_PINS:
            return {...state, pins:state.pins.filter(pin =>pin._id!== action.payload)}    
        default:
            return state
    }
}