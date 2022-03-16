import { Share } from '@mui/icons-material';
import React from 'react'
import { Link } from 'react-router-dom'
import { IconButton } from '../mui';

function LinkTable({data, username}) {
    const share = async (data) => {
        try {
          await navigator.share(data);
          
        } catch (err) {
          alert("Error: " + err.message);
        }
      };

  return (
    <div className="d-flex justify-content-center align-items-center flex-column" style={{
        width:"90%",
        padding: "4%"
    }}>
        <h2>Links</h2>
       <div style={{width:"100%", padding: "1%", maxWidth:"600px"}}>
           <table style={{width:"100%"}} >
               <thead>
                   <tr>
                       <th>SI. No.</th>
                       <th>Link</th>
                       <th>Share</th>
                       <th>Clicks</th>
                   </tr>
               </thead>
                <tbody>
                    {
                        data.map(({data, link, views, shorturl}, i)=>(
                            <tr key={i}>
                                <td style={{maxWidth:"20px"}}>{i+1}</td>
                                <td style={{maxWidth:"100px"}}><a className="link" href={`${link}`} target="_blank" rel="noreferrer">{!data? "unreadable link" : data.meta ? data.meta.title : data.og? data.og.title : "title"}</a></td>
                                <td>
                                <IconButton
                        onClick={()=>{
                            share({
                                url: `https://linkru.netlify.app/${username}/${shorturl}`,
                            })
                        }}
                    >
                         <Share sx={{
                        fontSize :"30px"
                    }} />
                    </IconButton>
                                </td>
                                <td>{views}</td>
                            </tr>
                        ))
                    }
                </tbody>
           </table>
       </div>
        
    </div>
  )
}

export default LinkTable