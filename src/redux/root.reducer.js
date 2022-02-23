import { combineReducers } from "redux";

import urlReducers from "./reducers/urls.reducers";
import snackbarReducer from "./reducers/snackbar.reducers";
import userReducers from "./reducers/user.reducers";

export default combineReducers({
    urls : urlReducers,
    snackbar: snackbarReducer,
    users : userReducers,
})