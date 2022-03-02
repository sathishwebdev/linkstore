import React, { useEffect, useState } from "react";
import * as mui from '@mui/material'

// Redux
import { useSelector, useDispatch } from "react-redux";

// Formik
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { ContentCopy } from "@mui/icons-material";
import * as yup from 'yup'
import { setSnackbar } from "../redux/actions/snackbar.actions";
import { UrlActionTypes } from "../redux/types/url.types";
import { addUrl, getUrlsList } from "../redux/actions/url.actions";
import { CustomizedSnackbars, Loader, Message } from "../containers";
import { Input } from "./mui";
import { PrimaryButton } from "./mui/Button";

//  ADD URL

const AddLink = () =>{
    const dispatch = useDispatch()
    const navigate =useNavigate()
    const {loader, error, success, responce} = useSelector((state) => state.urls.add)
    const {  user_login } = useSelector(
      (state) => state.users.login)
    
    useEffect(()=>{

      if(!user_login){
        navigate("/")
      }

    
      if(success){
          
          const message = "Link Added Successfully!"
          dispatch(setSnackbar(true, "success", message))
          dispatch({type: UrlActionTypes.ADD.RESET})
          dispatch(getUrlsList(user_login._id))
        }
        return () =>{
            dispatch({type: UrlActionTypes.ADD.RESET})
        }
    },[dispatch, success,  user_login])

    const {values, handleSubmit, handleChange, handleBlur, errors, touched} = useFormik({
        initialValues : {url : '', userId : user_login? user_login._id : ''},
        validationSchema: yup.object({
            url : yup.string().required('Give Link to Shrink'),
        }),
        onSubmit : (values,  { setSubmitting, resetForm }) =>{
          
            dispatch(addUrl(values))
            setSubmitting(false);
            resetForm()
        }
    })
    
    return(
        <div className="add-url">
            {error && <Message type="error" message={error}/>}
            {responce && <Message type={responce.error ? "error" : "success"} message={responce.message}/>}
            <CustomizedSnackbars />
              
                <Input
                    type="url"
                    name = 'url'
                    id='url'
                    label="Link"
                    placeholder = "Add your link"
                    value = {values.longUrl}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    margin="normal"
                    className="input"
                    required
                />
               
                <PrimaryButton
                    type="submit"
                    onClick={handleSubmit}
                >
                   { loader ? <Loader /> : "Add"}
                </PrimaryButton><br/>

<small style={{color:"red"}} >{errors.longUrl && touched.longUrl && errors.longUrl}</small>
        </div>
    )
}

export default AddLink