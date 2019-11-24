import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import appConfigReducer from './app-config';
import userDataReducer from "./user-data";
import productsReducer from "./products";

const rootReducer = history => combineReducers({
    router: connectRouter(history),
    app: appConfigReducer,
    userData: userDataReducer,
    products: productsReducer
})

export default rootReducer;