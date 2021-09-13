import axios from 'axios';
import { globalConstants, authConstant } from '../constant/allConstants';

export const userRegistration = ({formData})=> async(dispatch)=>{

   
    try {
      dispatch({type:globalConstants.LOADING, payload:{loading:true}})
      const{data} = await axios.post("/users/register", formData);
      dispatch({type:globalConstants.LOADING, payload:{loading:false}})
        if(data) window.location.href ="/login"
      } catch (err) {
        console.log(err)
      dispatch({type:globalConstants.ALERT, payload:{error:true, message: err?.response?.data?.msg}})
      }
}

export const userLogin =  ({formData})=> async(dispatch)=>{
    
    try {
      dispatch({type:globalConstants.LOADING, payload:{loading:true}})
      const{data} = await axios.post("/users/login", formData);
      dispatch({type:authConstant.AUTH, payload:data})
      dispatch({type:globalConstants.LOADING, payload:{loading:false}})
        console.log(data)
        localStorage.setItem("auth_travel", JSON.stringify(data))
      } catch (err) {
        console.log(err)
      dispatch({type:globalConstants.ALERT, payload:{error:true, message: err?.response?.data?.msg}})
      }
}

export const userLogOut =()=>async(dispatch)=>{

  localStorage.removeItem('auth_travel')
  dispatch({type:authConstant.AUTH, payload:{}})
}