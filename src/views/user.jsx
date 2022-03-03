import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useParams} from 'react-router-dom'
import UserDetails from '../components/profile/userDetails'
import { getUrls } from '../redux/actions/url.actions'
import {Tab, Box} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import {  styled, Tabs } from "@mui/material";
import { IconButton } from '../components/mui'
import { Close, Share} from '@mui/icons-material'
import { Message } from '../containers'


const StyledTabs = styled((props) => (
    <Tabs
      {...props}
      TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
  ))({
    '& .MuiTabs-indicator': {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: '#00fa7d',
    },
  });
  
  const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      textTransform: 'none',
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(15),
      marginRight: theme.spacing(1),
      color: 'rgba(255, 255, 255, 0.7)',
      '&.Mui-selected': {
        color: '#fff',
      },
      '&.Mui-focusVisible': {
        backgroundColor: 'rgba(100, 95, 228, 0.32)',
      },
    }),
  );


function User() {
    const [value, setValue] = useState('0');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    }
    const {username} = useParams()
    const dispatch = useDispatch()

    const {loading, error, urls} = useSelector(state=> state.urls.details)
    const{ user_login } = useSelector((state) => state.users.login);

    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() =>{
        dispatch(getUrls(username))
        if(user_login && user_login.username === username){
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
      
      let u = urls ? urls.urls.reverse() : ''

  return (
    <>
        <div className='header' style={{
            borderRadius: "0 0 0 0",
            minHeight:"100vh",
            paddingTop:"80px"
        }} >
            
            
            
           <div>{isAdmin && <Message type="success" message={`If you are admin got to dashboard to add new links`} />}

               { loading
                    ? <div className="loader"></div>
                    : !urls
                        ? <>
                            {error && <Message type="error" message={error} />}
                            <div className="App">
                                <p>404</p>
                                <small>You Might be Missing !</small>
                                <br/>
                                <Link to="/" className='link' >Go Home</Link>
                            </div>
                          </>
                        : <div className="d-flex flex-column justify-content-center align-items-center">
                            <UserDetails user = {urls.data} username={username} />
                            
                                <TabContext value={value}>
                                    <Box>
                                        <StyledTabs onChange={handleChange} aria-label="Links" value ={value} >
                                            <StyledTab label="Links" value="0" />
                                            <StyledTab label="Blog Posts" value="1" />
                                        </StyledTabs>
                                    </Box>
                                    <TabPanel value="1">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <div className=' loader' ></div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel value="0">
                                        <div style={{maxWidth:"800px"}}>
                                            {
                                                urls.urls.map(({data, link, views, shorturl}, id)=>(
                                                    <div className="link-card" key ={id} >
                                                        {!data? <a href={`https://linkru.netlify.app/${username}/${shorturl}`} target="_blank" rel="noreferrer">Link - {id+1}</a> : <> 
                                                          <div className="col-12 col-sm-3 pad">
                                                               <img src={data.og.image || data.images[0].src} alt={data.og.title || data.meta.title} />
                                                          </div>
                                                          <div className="col-12 col-sm-8" style={{textAlign:"left"}}>
                                                              <h2>
                                                                  <a href={`https://linkru.netlify.app/${username}/${shorturl}`} target="_blank" rel="noreferrer">{data.og.title || data.meta.title}
                                                                   </a>
                                                              </h2>
                                                               <small>
                                                                   {data.og.description || data.meta.description}
                                                               </small>
                                                          <div className="col-12 d-flex justify-content-between align-items-center" style={{
                                                            color:"#5dfd9b"
                                                          }} >
                                                            <div>
                                                              {isAdmin ? <p>
                                                                Views <span style={{color:"white"}} >{views}</span>
                                                              </p>: ''}
                                                            </div>
                                                          
                                                            <IconButton
                                                               onClick={()=>{share({
                                                                 title: data.og.title || data.meta.title,
                                                                 text: `${data.og.title || data.meta.title} - ${data.og.description || data.meta.description} \n\n`,
                                                                 url: `https://linkru.netlify.app/${username}/${shorturl}`,
                                                               })}}
                                                            >
                                                              <Share/>
                                                            </IconButton>
                                                          </div>
                                                           </div>
                                                        </>}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </TabPanel>
                                </TabContext>
                          
                        </div>
                }
           </div>
        </div>
    </>

  )
}

export default User