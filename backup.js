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
         key={pin._id}
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
    