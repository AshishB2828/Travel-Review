import React, { useEffect, useState } from 'react'
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Room } from '@material-ui/icons'
import {format} from 'timeago.js'
import { useDispatch, useSelector } from 'react-redux';
import { deletePins, getAllPins } from '../../redux/action/mapAction';
import FormCard from '../FormCard/FormCard';
import { globalConstants } from '../../redux/constant/allConstants';

const Map = () => {
    const {auth, map} = useSelector(state => state)
    const {pins} = map
    const dispatch = useDispatch()
    const [currentUser, setCurrentUser] = useState(auth?.username);
    const [currentPlaceId, setCurrentPlaceId] = useState('')
    const [currentPlace, setCurrentPlace] = useState({})
    const [viewport, setViewport] = useState({
        width:"100vw",
        height:"100vh",
        latitude: 47.040182,
        longitude: 17.071727,
        zoom: 4,
      });
    const [newPlace, setNewPlace] = useState("")
      useEffect(()=>{
        dispatch(getAllPins())
      },[dispatch])
// handleMarker

      const handleMarkerClick=(id, lat, long)=>{
        setCurrentPlaceId(id)
        setViewport({...viewport, latitude: lat, longitude: long})

      }

      const handleDblClick=(e)=>{
          const [long, lat] = e.lngLat;
          setNewPlace({lat, long});

      }
      const updateForm =(pin)=>{
          dispatch({type: globalConstants.STATUS, payload:{update:true}})
          setNewPlace(pin)
          setCurrentPlaceId(null)
      }

      const deletePin=(pin)=>{
        dispatch(deletePins({id:pin._id, auth}))
      }
      const handleUpdateClose=()=>{
        dispatch({type: globalConstants.STATUS, payload:{update:false}})
       setNewPlace(null)
        
      }

    return (
        <div className="App">
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
                onViewportChange={nextViewport => setViewport(nextViewport)}
              mapStyle="mapbox://styles/ashish-b/ckqeqhnjn42bv17nwij4l0dcd"
              onDblClick={handleDblClick}
              transitionDuration="200"
            >
          {
           pins?.map((pin,index)=>(
             
          <div key={index}>
            <Marker
              latitude={pin.lat}
              longitude={pin.long}
              offsetLeft={-20}
              offsetTop={-10}
            >
            
            <Room style={{fontSize: viewport.zoom * 7,
                         cursor: 'pointer',
                         color:pin.username === currentUser ? 'tomato': 'blue',
                         zIndex: 0
                         }} 
                onClick={()=>handleMarkerClick(pin._id, pin.lat, pin.long)}
            />
            </Marker>
            {pin._id ===currentPlaceId &&
                <Popup 
                className="popup"
                key={pin._id}
                latitude={pin.lat}
                longitude={pin.long}
                closeButton={true}
                closeOnClick={false}
                anchor="left"
                onClose={()=> setCurrentPlaceId(null)}

            >
            <div className="card-c">
                <label htmlFor="">Place</label>
                <h4 className="place"> {pin.title}</h4>
                <label htmlFor="">Review</label>
                <p>{pin.desc}</p>
                <label htmlFor="">Rating</label>
                <div className="star">
                {
                  pin.rating
                }
                </div>
                <label htmlFor="">Information</label>
                <span className="username">Created by <b>{pin.username}</b> </span>
                <span className="date">{format(pin.createdAt)}</span>
                {auth?.username === pin?.username &&
                <button className="btn btn-primary"onClick={()=>updateForm(pin)}>update</button>}
                {auth?.username === pin?.username &&
                <button className="btn btn-danger mt-2"onClick={()=>deletePin(pin)}>Delete</button>}
            </div>
            </Popup>}
            
          </div>
               ))
           }
           


          {newPlace&&currentUser && <Popup
          className="popup"
                latitude={newPlace.lat}
                longitude={newPlace.long}
                closeButton={true}
                closeOnClick={false}
                anchor="left"
                onClose={handleUpdateClose}

            > <FormCard newPlace={newPlace} setNewPlace={setNewPlace} />
            </Popup>}
        </ReactMapGL>
        </div>
    )
        }
export default Map
