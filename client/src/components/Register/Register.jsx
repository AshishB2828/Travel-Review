import React, {  useState } from 'react'
import { Room } from "@material-ui/icons";
import { useDispatch, useSelector } from 'react-redux';

import './Register.css'
import { userRegistration } from '../../redux/action/authActions';
const Register = () => {

    const dispatch = useDispatch()

    const {auth} = useSelector(state => state)

    const [formData, setFormData] = useState({
      username:"", email:"", password:""
    })

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(userRegistration({formData}))
  };
  return (
    <div className="registerContainer">
      <div className="logo">
        <Room className="logoIcon" />
        <span>Travel Assistant</span>
      </div>
      <form onSubmit={handleSubmit}>
        <input 
          autoFocus placeholder="username" 
          onChange={(e)=>setFormData({...formData, username:e.target.value})} />
        <input 
          type="email" 
          placeholder="email" 
          onChange={(e)=>setFormData({...formData, email:e.target.value})} 
           />
        <input
          type="password"
          min="6"
          placeholder="password"
          onChange={(e)=>setFormData({...formData, password:e.target.value})} 
        />
        <button className="registerBtn" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register
