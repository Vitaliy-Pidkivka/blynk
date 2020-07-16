import {applyMiddleware, combineReducers, createStore} from "redux";
import appReducer from "./appReducer";
import thunkMiddleWare from 'redux-thunk'
import {save, load} from "redux-localstorage-simple"

const reducers = combineReducers({
    app: appReducer,
})

const createStoreWithMiddleware = applyMiddleware(save({ namespace: "blynk"}), thunkMiddleWare)(createStore)
const store = createStoreWithMiddleware(reducers, load({ namespace: "blynk"}))
window.__store__ = store

export default store