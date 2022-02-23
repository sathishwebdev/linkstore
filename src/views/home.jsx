import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Header from '../components/home/header'
import { PrimaryButton } from '../components/mui/Button'

function Home() {
    const navigate = useNavigate()
    const {user_login } = useSelector(
        (state) => state.users.login
      );

      useEffect(()=>{
        if (user_login) navigate('/user/dashboard')
      },[user_login])
  return (
    <div>
         
        <Header />
        <div className="pad">
            <h1 >GET ANALYTICS FOR YOUR LINKS</h1>
            <PrimaryButton
                 onClick={()=>{
                    navigate('/login')
                }}
                sx={{
                    fontSize:"24px", padding:"16px", borderRadius:"50px"
                }}
            >
                CREATE ACCOUNT
            </PrimaryButton>
        </div>
    
    </div>
  )
}

export default Home