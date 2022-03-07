import { AnalyticsOutlined, Share } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IconButton } from '../mui'

function UserDetails({user, username}) {
    const [isAdmin, setIsAdmin] = useState(false)
    const dispatch = useDispatch()
    const{ user_login } = useSelector((state) => state.users.login);


    useEffect(() =>{
        if(user_login && user_login.username === user.username){
            setIsAdmin(true)
        }

    },[dispatch, username, user_login])

    const share = async (data) => {
        try {
          await navigator.share(data);
          
        } catch (err) {
          alert("Error: " + err.message);
        }
      };

      console.log(user)

  return (
    <div className="pad d-flex justify-content-center align-items-center" >
        {user ? 
        <>
            <div className="pad" >
                <Avatar sx={{
                    height:"20vw",
                    width: '20vw',
                    maxWidth: "200px",
                    maxHeight:"200px"

                }} />
            </div>

            <div style={{textAlign:"left"}} >
                <h1>{user.name}</h1>
                <small>@{user.username}</small>
               {isAdmin? <p>Views <span style={{color:"white"}}>{user.views}</span></p> : ''}
            </div>

            <div className="pad">
                <IconButton
                    onClick={()=>{
                        share({
                            url: `https://linkru.netlify.app/${username}`,
                        })
                    }}
                >
                     <Share sx={{
                    fontSize :"30px"
                }} />
                </IconButton>

               
                {/* <AnalyticsOutlined sx={{
                    fontSize :"30px"
                }}  /> */}
            </div>

        </> :
        <div className="loader"> </div>
        }
    </div>
  )
}

export default UserDetails