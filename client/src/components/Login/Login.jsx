import {  Room } from "@material-ui/icons";
import { useDispatch, useSelector } from 'react-redux';
import {  useEffect, useState } from "react";
import "./Login.css";
import { userLogin } from "../../redux/action/authActions";
import { useHistory } from "react-router";
import {Link} from "react-router-dom"


const Login = () => {
  const dispatch = useDispatch()

  const {alert,auth} = useSelector(state => state)
  const {error, message} = alert
  const history = useHistory()
  const [formData, setFormData] = useState({
    username:"",password:""
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(userLogin({formData}))
  };

  useEffect(()=>{
    if(auth?._id)
    history.push('/')
  },[auth?._id])


  return (
    <div className="loginContainer">
      <div className="logo">
        <Room className="logoIcon" />
        <span>Travel Review</span>

      </div>
      <form onSubmit={handleSubmit}>
        {error && message && <small >{message}</small>}
      <input 
          autoFocus placeholder="username" 
          onChange={(e)=>setFormData({...formData, username:e.target.value})} />
      
        <input
          type="password"
          min="6"
          placeholder="password"
          onChange={(e)=>setFormData({...formData, password:e.target.value})} 
        />
        <button className="loginBtn" type="submit">
          Login
        </button>
        <Link style={{"textDecoration":"none"}} to="/register">register</Link>
      </form>
    </div>
  );
}
export default Login