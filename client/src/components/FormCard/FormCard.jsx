import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { addPinToMap, updatePin } from '../../redux/action/mapAction'

const FormCard = ({newPlace, setNewPlace}) => {
  
    const dispatch = useDispatch()
    const {auth, map, status} = useSelector(state => state)
    const [formData, setFormData] = useState({title:newPlace?.title? newPlace ?.title:"" ,
                                               desc:newPlace?.desc ? newPlace?.desc:"",
                                               rating:newPlace?.rating ? newPlace?.rating:1,  
                                               lat: newPlace.lat,
                                                long: newPlace.long, username:auth?.username})
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(status.update)
        dispatch(updatePin({formData, pins:map.pins, id:newPlace?._id}))
        else
        dispatch(addPinToMap({formData, pins:map?.pins, }))
        setNewPlace(null)

    }
    return (
        <div>
             <form onSubmit={handleSubmit}>
                  <label>Title</label>
                  <input
                    placeholder="Enter a title"
                    autoFocus
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                  <label>Description</label>
                  <textarea
                    placeholder="Say us something about this place."
                    value={formData.desc}
                    onChange={(e) => setFormData({...formData, desc: e.target.value})}
                  />
                  <label>Rating</label>
                  <select 
                  value={formData.rating}
                   onChange={(e) => setFormData({...formData, rating: e.target.value})}
                    >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button type="submit" className="submitButton">
                   {status.update? "Update":"Add Pin"}
                  </button>
                </form>
        </div>
    )
}

export default FormCard
