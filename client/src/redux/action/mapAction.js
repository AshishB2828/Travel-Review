import axios from 'axios'
import { globalConstants,mapConstant } from '../constant/allConstants'

export const addPinToMap=({formData,pins})=>async(dispatch)=>{

  try {
    const{data}= await axios.post("/pins", formData);
    const newArray= [...pins, data.newPin]
    dispatch({type:mapConstant.FETCH_PINS, payload:newArray})
          } catch (err) {
            console.log(err);
          }


}

export const getAllPins=()=>async(dispatch)=>{
    
    console.log("get All to Pins")
   try {
    dispatch({type:globalConstants.LOADING, payload:{loading:true}})
    const {data} = await axios.get("/pins");
    // console.log(data)
    dispatch({type:mapConstant.FETCH_PINS, payload: data})
    dispatch({type:globalConstants.LOADING, payload:{loading:false}})
   } catch (error) {
    console.log(error.response)
   }
   
}


export const updatePin =({formData, pins, id})=> async(dispatch)=>{

  // TODO --move this to reducer
  const newArray = pins.map(pin=> pin._id === id ? {_id:id,...formData} : pin)
  console.log(id)
  console.log(newArray)

  try {
      dispatch({type:mapConstant.PINS_LOADING, payload:{loading:true}})
      const {data} = await axios.put(`/pins/update/${id}`, formData)
      dispatch({type:mapConstant.UPDATE_PINS, payload:data.updatedPin})
      dispatch({type:mapConstant.PINS_LOADING, payload:{loading:false}})
      dispatch()
      console.log(data)
  } catch (error) {
    console.log(error.response)
  }
}

export const deletePins =({id})=> async(dispatch)=>{

  console.log("delete")

  dispatch({type: mapConstant.DELETE_PINS, payload:id})

  try {
      const {data} = await axios.delete(`/pins/delete/${id}`)
      console.log(data)
  } catch (error) {
    console.log(error.response)
  }
}