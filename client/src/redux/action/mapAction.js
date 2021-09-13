import axios from 'axios'
import { deleteAPI, getAPI, postAPI, putAPI } from '../../utils/requestAPIS';
import { globalConstants,mapConstant } from '../constant/allConstants'

export const addPinToMap=({formData,pins,auth})=>async(dispatch)=>{

  try {
    const{data}= await postAPI("pins", formData,auth?.token);
    const newArray= [...pins, data.newPin]
    dispatch({type:mapConstant.FETCH_PINS, payload:newArray})
          } catch (err) {
            console.log(err);
          }


}

export const getAllPins=()=>async(dispatch)=>{
    
   try {
    dispatch({type:globalConstants.LOADING, payload:{loading:true}})
    const {data} = await getAPI('pins', null)
    dispatch({type:mapConstant.FETCH_PINS, payload: data})
    dispatch({type:globalConstants.LOADING, payload:{loading:false}})
   } catch (error) {
    console.log(error.response)
   }
   
}


export const updatePin =({formData, auth, id})=> async(dispatch)=>{


  
  dispatch({type: globalConstants.STATUS, payload:{update:false}})
  try {
      dispatch({type:mapConstant.PINS_LOADING, payload:{loading:true}})
      const {data} = await putAPI(`pins/update/${id}`, formData, auth?.token)
      dispatch({type:mapConstant.UPDATE_PINS, payload:data.updatedPin})
      dispatch({type:mapConstant.PINS_LOADING, payload:{loading:false}})

  } catch (error) {
    console.log(error.response)
  }
}

export const deletePins =({id,auth})=> async(dispatch)=>{

  
  dispatch({type: mapConstant.DELETE_PINS, payload:id})

  try {
      const {data} = await deleteAPI(`pins/delete/${id}`, auth?.token)
      console.log(data)
  } catch (error) {
    console.log(error.response)
  }
}