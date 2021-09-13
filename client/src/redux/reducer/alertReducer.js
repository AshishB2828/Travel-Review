import { globalConstants } from "../constant/allConstants";


export const alertReducer =(state={loading: false, error: false}, action)=>{

        switch (action.type) {

            case globalConstants.LOADING:
                return action.payload
            case globalConstants.ALERT:
                 return action.payload
            default:
                return state
        }

}