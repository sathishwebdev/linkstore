import { Share } from '@mui/icons-material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUrlsList } from '../../redux/actions/url.actions';
import AddLink from '../addLink';
import { IconButton } from '../mui';

function Links() {
    const dispatch = useDispatch()
    const{ user_login } = useSelector(
        (state) => state.users.login
      );
    const {loading, error, links} = useSelector(state=> state.urls.list)
    const navigate = useNavigate()

      useEffect(()=>{

          if(!user_login){
            navigate('/')
          }else if(!user_login.isVerified){
            navigate('/user/verify')
          }
          else{
            dispatch(getUrlsList(user_login._id))
          }
         
      },[user_login])
      const share = async (data) => {
        try {
          await navigator.share(data);
          
        } catch (err) {
          alert("Error: " + err.message);
        }
      };
      
      let urls = links ? links.data.reverse() : ''
  return (
    <div>
        {
            loading
                ? <div className="loader" ></div>
                : links 
                    ? links.data.length === 0 
                        ? <div>
                            <p>No Links Found Add Links</p>
                            <AddLink />
                          </div>
                        : <div>
                           <AddLink />
                       
                               {
                                   links.data.map(({data, link, views, shorturl}, id)=>(
                                       <div className="link-card" key ={id} >
                                          { !data? 
                                            <>
                                            <a href={link} target="_blank" rel="noreferrer">Unreadable Link</a> 
                                            <p style={{
                                                 padding:"1%",
                                                 margin:"1%",
                                                 color:"#5dfd9b"
                                               }} >views {views} </p>
                                               <IconButton
                                                  onClick={()=>{share({
                                                    url: `https://linkru.netlify.app/${user_login.username}/${shorturl}`,
                                                  })}}
                                               >
                                                 <Share/>
                                               </IconButton>
                                            </>
                                            : <>
                                             <div className="col-12 col-sm-3 pad">
                                                  <img src={data.og.image || data.images[0].src || ''} alt={data.og.title || data.meta.title || ''} />
                                             </div>
                                             <div className="col-12 col-sm-8" style={{textAlign:"left"}}>
                                                 <h2>
                                                     <a href={link}>{data.og.title || data.meta.title}
                                                      </a>
                                                 </h2>
                                                  <small>
                                                      {data.og.description || data.meta.description}
                                                  </small>
                                            
                                             <div className="col-12 d-flex justify-content-between align-items-center" style={{
                                               color:"#5dfd9b"
                                             }} >
                                               <p style={{
                                                 padding:"1%",
                                                 margin:"1%",
                                                 color:"#5dfd9b"
                                               }} >views {views} </p>
                                               <IconButton
                                                  onClick={()=>{share({
                                                    title: data.og.title || data.meta.title,
                                                    text: `${data.og.title || data.meta.title} - ${data.og.description || data.meta.description} \n\n`,
                                                    url: `https://linkru.netlify.app/${user_login.username}/${shorturl}`,
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
                    : <div>
                        <p>No Links Found Add Links</p>
                        <AddLink />

                      </div>
        }
    </div>
  )
}

export default Links