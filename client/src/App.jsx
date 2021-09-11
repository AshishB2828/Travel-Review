import React, { useEffect, useState } from 'react'
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Room, Star } from '@material-ui/icons'
import axios from 'axios'
import {format} from 'timeago.js'

import Login from './components/Login/Login'; 
import Register from './components/Register/Register';

import './app.css'
const App = () => {
    const myStorage = window.localStorage;
    const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"));
    const [pins, setPins] = useState ([])
    const [currentPlaceId, setCurrentPlaceId] = useState('')
    const [viewport, setViewport] = useState({
        width:"100vw",
        height:"100vh",
        latitude: 47.040182,
        longitude: 17.071727,
        zoom: 4,
      });
    const [newPlace, setNewPlace] = useState('')
    const [title, setTitle] = useState(null);
    const [desc, setDesc] = useState(null);
    const [star, setStar] = useState(0);
    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)

      useEffect(()=>{

        const getPins = async()=>{
            try {
                const {data} = await axios.get("/pins");
                setPins(data)
            } catch (error) {
                console.log(error.response)
            }
        }
        getPins();
      },[])
// handleMarker

      const handleMarkerClick=(id, lat, long)=>{

        setCurrentPlaceId(id)
        setViewport({...viewport, latitude: lat, longitude: long})
      }

      const handleDblClick=(e)=>{
        //   console.log(e.lngLat)
          const [long, lat] = e.lngLat;
          setNewPlace({lat, long});

      }

    //   sending  Post to the server
      const handleSubmit = async (e) => {
        e.preventDefault();
        const newPin = {
          username: currentUser,
          title,
          desc,
          rating: star,
          lat: newPlace.lat,
          long: newPlace.long,
        };
        try {
            const {data} = await axios.post("/pins", newPin);
            setPins([...pins, data]);
            setNewPlace(null);
          } catch (err) {
            console.log(err);
          }
        };
        // Logout
        
        const handleLogout = () => {
            setCurrentUser(null);
            myStorage.removeItem("user");
        };


    return (
        <div className="App">
            <ReactMapGL

                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
                onViewportChange={nextViewport => setViewport(nextViewport)}
              mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
              onDblClick={handleDblClick}
              transitionDuration="200"

            >
          {
           pins.map((pin,index)=>(
            <div key={index}>
            <Marker
              latitude={pin.lat}
              longitude={pin.long}
              offsetLeft={-20}
              offsetTop={-10}
            >
            <Room style={{fontSize: viewport.zoom * 7,
                         cursor: 'pointer',
                         color:pin.username === currentUser ? 'tomato': 'blue'}} 
                onClick={()=>handleMarkerClick(pin._id, pin.lat, pin.long)}
            />
            </Marker>
            {pin._id ===currentPlaceId &&
                <Popup
                latitude={pin.lat}
                longitude={pin.long}
                closeButton={true}
                closeOnClick={false}
                anchor="left"
                onClose={()=> setCurrentPlaceId(null)}

            >
            <div className="card">
                <label htmlFor="">Place</label>
                <h4 className="place"> {pin.title}</h4>
                <label htmlFor="">Review</label>
                <p>{pin.desc}</p>
                <label htmlFor="">Rating</label>
                <div className="star">
                    {Array(pin.rating).fill(<Star className="star" />)}
                </div>
                <label htmlFor="">Information</label>
                <span className="username">Created by <b>{pin.username}</b> </span>
                <span className="date">{format(pin.createdAt)}</span>
            </div>
            </Popup>}
            
                   </div>
               ))
           }

          {newPlace&&currentUser && <Popup
                latitude={newPlace.lat}
                longitude={newPlace.long}
                closeButton={true}
                closeOnClick={false}
                anchor="left"
                onClose={()=> setNewPlace(null)}

            >
                <div>
                <form onSubmit={handleSubmit}>
                  <label>Title</label>
                  <input
                    placeholder="Enter a title"
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label>Description</label>
                  <textarea
                    placeholder="Say us something about this place."
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <label>Rating</label>
                  <select onChange={(e) => setStar(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button type="submit" className="submitButton">
                    Add Pin
                  </button>
                </form>
              </div>
            </Popup>}
            {currentUser ? (
          <button className="button logout" onClick={handleLogout}>
            Log out
          </button>
        ) : (
          <div className="buttons">
            <button className="button login" onClick={() => setShowLogin(true)}>
              Log in
            </button>
            <button
              className="button register"
              onClick={() => setShowRegister(true)}
            >
              Register
            </button>
          </div>
        )}
        {showRegister && <Register setShowRegister={setShowRegister} />}
        {showLogin && (
          <Login
            setShowLogin={setShowLogin}
            setCurrentUsername={setCurrentUser}
            myStorage={myStorage}
          />
        )}
        </ReactMapGL>
        </div>
    )
}

export default App
