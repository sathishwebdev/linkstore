import { AnalyticsOutlined, Share } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function UserDetails() {
    const dispatch = useDispatch()
    const {user_login} = useSelector(state => state.users.login)
    const navigate = useNavigate()

    useEffect(()=>{
        if(!user_login){
            navigate('/')
        }
    },[user_login])
  return (
    <div className="pad d-flex justify-content-center align-items-center" >
        {user_login ? 
        <>
            <div className="pad" >
                <Avatar sx={{
                    height:"200px",
                    width: '200px'
                }} />
            </div>

            <div style={{textAlign:"left"}} >
                <h1>{user_login.name}</h1>
                <small>{user_login.email}</small>
            </div>

            <div className="pad">
                <Share sx={{
                    fontSize :"40px"
                }} />
                <AnalyticsOutlined sx={{
                    fontSize :"40px"
                }}  />
            </div>

        </> :
        <div className="loader"> </div>
        }
    </div>
  )
}

export default UserDetails