import { globalConstants , authConstant} from "../constant/allConstants";


export const authReducer =(state={loading: false, error: false}, action)=>{

        switch (action.type) {

            case authConstant.AUTH:
                return action.payload
            default:
                return state
        }

}