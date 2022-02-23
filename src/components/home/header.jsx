import { ChevronRightRounded } from '@mui/icons-material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import header from '../../assets/header.svg'
import { PrimaryButton } from '../mui/Button'

function Header() {
    const navigate = useNavigate()
  return (
    <div className="header" >
        <div className="pad" style={{ textAlign:"left"}}>
            <div className="row align-items-center">
                <div className="col-6">
                    <h1 className="header-text" >
                        GROUP YOUR <span className="link" >LINKS</span>.
                    </h1>
                </div>
                <div className="col-6 col-lg-12">
                    <PrimaryButton
                        className="d-none d-lg-block"
                        onClick={()=>{
                            navigate('/login')
                        }}
                        sx={{
                            borderRadius:"30px",
                            fontSize:"24px",
                            padding:"10px",
                            color:"#331068"
                        }}
                    >
                        GET STARTED
                    </PrimaryButton>
                    <PrimaryButton
                        onClick={()=>{
                        navigate('/user/login')
                        }}
                        className = "d-lg-none"
                        sx={{
                            borderRadius:"50%",
                            float:"right",
                        }}
                    >
                        <ChevronRightRounded sx={{
                            fontSize:"60px"
                        }} />
                    </PrimaryButton>
                </div>
            </div>
        </div>

        <div className="d-none d-lg-block" >
            <img src={header} alt="header" className="header-img"  />
        </div>
    </div>
  )
}

export default Header