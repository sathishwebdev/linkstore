import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import UserDetails from "../components/profile/userDetails";


const Profile = (props) =>{
    const{ user_login } = useSelector(
        (state) => state.users.login
      );

    const navigate = useNavigate()

      useEffect(()=>{
          if(!user_login){
            navigate('/')
          }else if(!user_login.isVerified){
            navigate('/user/verify')
          }
      },[user_login])
    return(
        <div className="App">
            <div className="header " style={{minHeight:"100vh", borderRadius:"0 0 0 0"}} >
                <div className="col-12" >
                    <UserDetails />
                </div>
            </div>
        </div>
        )
}

export default Profile