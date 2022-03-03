import axios from 'axios';
import {getConfig} from '../config'
import { UrlActionTypes } from '../types/url.types';
const BASE_URL = process.env.REACT_APP_BASE_URL

//  GET LIST

export const getUrlsList = (value) => async (dispatch, getState) =>{
 
    try{
        dispatch({
            type: UrlActionTypes.URL_LIST.REQUEST
        })

        const {data} = await axios.get(`${BASE_URL}/api/links/?userId=${value}`, getConfig(getState()))
        
        dispatch({
            type : UrlActionTypes.URL_LIST.SUCCESS,
            payload: data,
        })

    }catch(error){
        dispatch({
            type: UrlActionTypes.URL_LIST.ERROR,
            payload : 
                error.response && error.response.data.detail
                ? error.response.data.detail : error.message
        })
    }
}

//  ADD URL

export const addUrl = (values) => async (dispatch, getState) =>{
    try{
        dispatch({
            type: UrlActionTypes.ADD.REQUEST
        })

       let {data} = await axios.post(`${BASE_URL}/api/links/add`, values, getConfig(getState()))
       
        dispatch({
            type: UrlActionTypes.ADD.SUCCESS,
            payload: data,
        })
    }catch(error){
        dispatch({
            type: UrlActionTypes.ADD.ERROR,
            payload : 
                error.response && error.response.data.detail
                ? error.response.data.detail : error.message
        })
    }
}

// DELETE URLS

export const deleteUrl = (values) => async (dispatch, getState) =>{
    try{
        dispatch({
            type: UrlActionTypes.DELETE.REQUEST
        })

        
        await axios.post(`${BASE_URL}/api/shorty/deleteurls/?user=${values.user}`, values, getConfig(getState()))

        dispatch({
            type: UrlActionTypes.DELETE.SUCCESS
        })
    }catch(error){
        dispatch({
            type: UrlActionTypes.DELETE.ERROR,
            payload : 
                error.response && error.response.data.detail
                ? error.response.data.detail : error.message
        })
    }
}

// GET URLS BY USERNAME

export const getUrls = (username) => async (dispatch) =>{
    try{
        dispatch({
            type: UrlActionTypes.DETAILS.REQUEST
        })

        const {data} = await axios.get(`${BASE_URL}/api/links/user/${username}`)

        dispatch({
            type: UrlActionTypes.DETAILS.SUCCESS,
            payload : data
        })
    }catch(error){
        dispatch({
            type: UrlActionTypes.DETAILS.ERROR,
            payload : 
                error.response && error.response.data.detail
                ? error.response.data.detail : error.message
        })
    }
}

// EDIT URL

export const editUrl = (id, values) => async (dispatch, getState) =>{
    try{
        dispatch({
            type: UrlActionTypes.EDIT.REQUEST
        })

        await axios.put(`${BASE_URL}/api/shorty/edit/${id}`, values, getConfig(getState()))

        dispatch({
            type: UrlActionTypes.EDIT.SUCCESS
        })
    }catch(error){
        dispatch({
            type: UrlActionTypes.EDIT.ERROR,
            payload : 
                error.response && error.response.data.detail
                ? error.response.data.detail : error.message
        })
    }
}

// REDIRECT URL 

export const redirectUrl = (url) => async (dispatch)=>{
    try{
        dispatch({
            type: UrlActionTypes.REDIRECT.REQUEST
        })

       let {data} =  await axios.get(`${BASE_URL}/api/links/redirect/${url}`)

        dispatch({
            type: UrlActionTypes.REDIRECT.SUCCESS,
            payload : data
        })   

    }catch(error){
        dispatch({
            type: UrlActionTypes.REDIRECT.ERROR,
            payload : 
                error.response && error.response.data.detail
                ? error.response.data.detail : error.message
        })
    }
}