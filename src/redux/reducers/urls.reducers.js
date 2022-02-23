import { UrlActionTypes } from "../types/url.types";
import { combineReducers } from "redux";

// URL LIST

const urlListReducer = (state = {urls: []}, action) =>{
    switch (action.type){
        case UrlActionTypes.URL_LIST.REQUEST:
            return {loading : true};
        case UrlActionTypes.URL_LIST.SUCCESS:
            return {loading: false, urls: action.payload};
        case UrlActionTypes.URL_LIST.ERROR:
            return {loading: false, error: action.payload};
        case UrlActionTypes.URL_LIST.RESET:
            return {urls:[]}
        default:
            return state;
    }
}

//  URL ADD

const urlAddReducer = (state = {responce : null}, action) =>{
    switch (action.type){
        case UrlActionTypes.ADD.REQUEST:
            return {loading : true};
        case UrlActionTypes.ADD.SUCCESS:
            return {loading: false, success: true, responce : action.payload};
        case UrlActionTypes.ADD.ERROR:
            return {loading: false, error: action.payload};
        case UrlActionTypes.ADD.RESET:
            return {success: false, responce : null}
        default:
            return state;
    }
}

//  URL DELETE

const urlDeleteReducer = (state = {}, action) =>{
    switch (action.type){
        case UrlActionTypes.DELETE.REQUEST:
            return {loading : true};
        case UrlActionTypes.DELETE.SUCCESS:
            return {loading: false, success: true};
        case UrlActionTypes.DELETE.ERROR:
            return {loading: false, error: action.payload};
        case UrlActionTypes.DELETE.RESET:
            return {}
        default:
            return state;
    }
}

// URL DETAILS

const urlDetailsReducer = (state = { url: {}}, action) =>{
    switch (action.type){
        case UrlActionTypes.DETAILS.REQUEST:
            return {loading : true};
        case UrlActionTypes.DETAILS.SUCCESS:
            return {loading: false, url : action.payload};
        case UrlActionTypes.DETAILS.ERROR:
            return {loading: false, error: action.payload};
        case UrlActionTypes.DETAILS.RESET:
            return {url:{}}
        default:
            return state;
    }
}

// REDIRECT URL

const urlRedirectReducer = (state = { url: null}, action) =>{
    switch (action.type){
        case UrlActionTypes.REDIRECT.REQUEST:
            return {loading : true};
        case UrlActionTypes.REDIRECT.SUCCESS:
            return {loading: false, url : action.payload};
        case UrlActionTypes.REDIRECT.ERROR:
            return {loading: false, error: action.payload};
        case UrlActionTypes.REDIRECT.RESET:
            return {url:{}}
        default:
            return state;
    }
}

// URL EDIT

const urlEditReducer = (state = {}, action) => {
    switch (action.type) {
      case UrlActionTypes.EDIT.REQUEST:
        return { loading: true };
  
      case UrlActionTypes.EDIT.SUCCESS:
        return { loading: false, success: true };
  
      case UrlActionTypes.EDIT.ERROR:
        return { loading: false, error: action.payload };
  
      case UrlActionTypes.EDIT.RESET:
        return {};
  
      default:
        return state;
    }
  };

  const urlReducers = combineReducers({
      list : urlListReducer,
      add: urlAddReducer,
      delete : urlDeleteReducer,
      details: urlDetailsReducer,
      edit: urlEditReducer,
      redirect : urlRedirectReducer
  })

  export default urlReducers