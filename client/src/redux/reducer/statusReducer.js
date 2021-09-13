import { globalConstants } from "../constant/allConstants";


export const statusReducer =(state={update:false}, action)=>{

    switch(action.type){
        case globalConstants.STATUS:
            return action.payload
        default:
            return state
    }
}