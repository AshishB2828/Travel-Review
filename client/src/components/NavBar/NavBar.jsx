import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import{userLogOut}from '../../redux/action/authActions'

const NavBar = () => {

    const {auth} = useSelector(state => state)
    const dispatch = useDispatch()
    const handleLogOut = () => {
       
        dispatch(userLogOut())
    }



    return (
        <nav className="navbar navbar-expand navbar-light">
        <div className="container-xl">
            <span className="navbar-brand">
                <span className="fw-bold text-secondary">
                    Travel Review
                </span>
            </span>

            <div className="justify-content-end align-center" >
                <div className="navbar-nav">
                        {
                        auth?.username && 
                        <li className="nav-item nav-link cursor ">{auth?.username}</li>
                        }
                        {
                         auth?.username ?
                        <li className="nav-item nav-link "
                        onClick={handleLogOut}
                        >Logout</li>
                        :<Link to="/login" className="nav-item nav-link ">Login</Link>
                         }
                        <a href="https://github.com/AshishB2828/Travel-Review" target="_blank" className="nav-item nav-link ">git</a>
                </div>
            </div>
        </div>
    </nav>
    )
}

export default NavBar
