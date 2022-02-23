import { Close, Menu } from "@mui/icons-material"
import {IconButton } from "@mui/material"
import { useState } from "react"
import logo from '../assets/logo.svg'
import { Link, useLocation, useNavigate } from "react-router-dom"
import Button, { PrimaryButton, SecondaryButton } from "./mui/Button"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../redux/actions/users.actions"
import NavModel  from "../model/navModel"
import AccountMenu from "./NavBar/AccountMenu"

const NavBar = () =>{
    const location = useLocation()
    const navigate = useNavigate()
    const{ user_login } = useSelector(
      (state) => state.users.login
    );
  
    return       <div
        className='nav'
    >
    <div className="d-flex justify-content-around align-items-center " >
    <Link to="/" style={{color:"white", textDecoration:"none"}} ><img style={{margin:"4%"}} src={logo} height="50px" alt="logo" /></Link>
       <Link to="/" style={{color:"white", textDecoration:"none"}} > <h1 style={{marginLeft:"10px", marginTop:"10px"}} >LINK STORE</h1></Link>
    </div>
    <div className="d-flex align-items-center"  >
    {NavModel.map(({name,path}, id)=>(
       <Link
       key={id}
       style={{
         margin:'1%'
       }}
        to={path}
        className="btn btn-link"
       >
        {name}
        </Link>
     )) }
  { !user_login 
    ? <> {location.pathname === "/user/login" 
        ? "" 
        : <SecondaryButton
            onClick={()=>{
                navigate('/user/login')
            }}
                sx={{
                    width:"100px",
                    borderRadius:"50px"
                }}
          >
              Login
          </SecondaryButton>
      }
        {location.pathname === "/user/signup" 
        ? "" 
        :  <PrimaryButton
              onClick={()=>{
                  navigate('/user/signup')
              }}
          >
              SignUp
          </PrimaryButton>}</>
          
        :
        
        <div style={{marginRight:"20px"}}>
          <AccountMenu name = {user_login.name[0]} title={user_login.name} />
        </div>

        }
    </div>
    </div>
     
  }
  

  const CollapesNav = () =>{
   
    const [navStatus, setNavStatus] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const{ user_login } = useSelector(
      (state) => state.users.login
    );
  
    const CloseMenu = () =>{
      document.getElementById('c-nav').style.transform = 'translateY(-100vh)'
      setNavStatus(false)
    }
  
    const OpenMenu = () =>{
      document.getElementById('c-nav').style.transform = 'translateY(0vh)'
      setNavStatus(true)
    }
  
    return <>
    <div className='nav-btn' >
      <IconButton
        onClick={!navStatus ? OpenMenu : CloseMenu}
      >
        {!navStatus ? <><Menu fontSize= "large"/>  </> :<Close sx={{color:'whitesmoke'}} fontSize='large' />}
      </IconButton>
      <Link to="/" style={{color:"white", textDecoration:"none"}} > <h1>LINK STORE</h1></Link>
      <h5 style={{marginLeft:"auto", marginRight:"20px", color:"#a0a0a0"}} >{user_login && user_login.name }</h5>
    </div>
      <div
      className='collopse-nav' id="c-nav"
      >
     {NavModel.map(({name,path}, id)=>(
       <Button
       key={id}
       sx={{
         margin:'5%'
       }}
       onClick={CloseMenu}
        href={path}
       >
        {name}
        </Button>
     )) }
     { !user_login 
    ? <> {location.pathname === "/user/login" 
        ? "" 
        : <SecondaryButton
            onClick={()=>{
                navigate('/user/login')
            }}
                sx={{
                    width:"100px",
                    borderRadius:"50px"
                }}
          >
              Login
          </SecondaryButton>
      }
        {location.pathname === "/user/signup" 
        ? "" 
        :  <PrimaryButton
              onClick={()=>{
                  navigate('/user/signup')
              }}
          >
              SignUp
          </PrimaryButton>}</>
          
        :
        <Button
        onClick={()=>{
          dispatch(logout())
        }}
        sx={{
          backgroundColor:"#ff5145"
        }}
      >
        Logout
      </Button>

        }
  
      </div>
    </>
  
  }

  export{
      NavBar,
      CollapesNav
  }