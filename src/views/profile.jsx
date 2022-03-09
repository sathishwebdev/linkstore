import { Divider, styled, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import {Tab, Box} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Links from "../components/profile/links";
import UserDetails from "../components/profile/userDetails";

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

const Profile = (props) =>{
    const{ user_login } = useSelector(
        (state) => state.users.login
      );

      const [value, setValue] = useState('0');

      const navigate = useNavigate()

      useEffect(()=>{
          if(!user_login){
            navigate('/')
          }else if(!user_login.isVerified){
            navigate('/user/verify')
          }
      },[user_login])

      const handleChange = (event, newValue) => {
        setValue(newValue);
      }

    return(
        <div className="App">
            <div className="header" style={{
                minHeight:"100vh",
                borderRadius:"0 0 0 0",
                flexDirection:"column",
                justifyContent:"unset",
                paddingTop:"80px"
              }} >
                <Divider sx={{color:"black"}} />
                <div className="col-12" >
                  <UserDetails user={user_login} username={user_login? user_login.username : ""}/>
                </div>
                <TabContext value={value}>
  <Box>
    <StyledTabs onChange={handleChange} aria-label="Links"
    value ={value} 
    >
      <StyledTab label="Links" value="0" />
      <StyledTab label="Blog Posts" value="1" />
      
    </StyledTabs>
  </Box>
  <TabPanel value="1">
    <div style={{width:"100%",}}>
        <h2>Blog posts</h2>
        <small style={{color:"red"}}>UNDER DEVELOPEMENT PROCESS...</small>
      <p>Here, you could add your blog's sitemap so we would fetch your sitemap and show your blog posts here. And you don't have to update as long as sitemap valid. It will be auto-update your blog posts</p>

    </div>
    </TabPanel>
  <TabPanel value="0">
    <div style={{maxWidth:"800px"}}>
      <Links/>
    </div>
  </TabPanel>
</TabContext>
               
            </div>
        </div>
        )
}

export default Profile