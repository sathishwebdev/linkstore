import React, { useEffect } from "react";
import { useNavigate, useParams} from 'react-router-dom'


// Redux
import { useSelector, useDispatch } from "react-redux";
import { UrlActionTypes } from "../redux/types/url.types";
import { Loader} from "../containers";
import { redirectUrl } from "../redux/actions/url.actions";


const Redirect_Url = () =>{
    let {shortId} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {
        loading : loadingRedirect,
        error: errorRedirect, 
        url
    } = useSelector(state=> state.urls.redirect)
console.log(errorRedirect)
    useEffect(()=>{
        dispatch(redirectUrl(shortId))
        if(!errorRedirect){
            
        }else{
            navigate('/error/404')
        }
        return () =>{
            dispatch({type: UrlActionTypes.REDIRECT.RESET})
        }
    },[shortId, dispatch, errorRedirect, navigate])

    const redirect = (link) =>{
        window.location.replace(link)
    }

    if(!url){

    }else{
        redirect(url.url)
    }

    return <div className="header" style={{borderRadius:"0 0 0 0" , minHeight:"100vh"}}>
        {loadingRedirect ? <Loader /> :
        <>
        <p>Redirecting to {url? `${`${url.url}`.substring(0, 20)}...` : ''}</p>
        </>
}</div>

}

export default Redirect_Url