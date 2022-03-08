import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Chart from '../components/Insights/chart';
import {useNavigate} from 'react-router-dom'
import { getUsersInsight } from '../redux/actions/users.actions';
import Message from '../containers/Message'

function Analytics() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading, error, insight} = useSelector(state => state.users.insight)
  const {user_login : user} = useSelector(state => state.users.login)
  useEffect(()=>{
    if(!user){
      navigate('/user/login')
    }else if(user.isVerified){
      dispatch(getUsersInsight(user._id))
    }else{
      navigate('/user/verify')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user])


  return (
    <div className="header" style={{
      borderRadius:"0 0 0 0", 
      minHeight:"100vh",
      flexDirection:"column",
      alignItems:"top",
      justifyContent:"normal",
      paddingTop:"80px"
    }}>
        <h1>Analytics</h1>
        {error && <Message type="error" message = {error} />}
        {loading 
          ? <div className='loader'></div> 
          : <div style={{
            width:"100%",

          }}>
            <Chart insight = {!insight? [] : insight.data} /> 
          </div>
        }
    </div>
  )
}

export default Analytics