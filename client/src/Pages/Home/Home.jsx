import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import Map from '../../components/Map/Map'
import NavBar from '../../components/NavBar/NavBar'

const Home = () => {

    const {auth} = useSelector(state => state)
    const history = useHistory()
    useEffect(() => {

        if(!auth?.username)
            history.push('/login')
    },[auth?.username])
    return (
        <div>
          <NavBar />
          <Map/>
        </div>
    )
}

export default Home
