import {createStore,applyMiddleware} from "redux";
import reducer from './reducers/index';
import thunkMiddleware from 'redux-thunk';

const logMiddleware = ({getState})=>(next) =>(action)=>{
        console.log(action.type,getState());
        return next(action);
}

const stringMiddleware=()=>(next)=>(action)=>{
    if(typeof action==='string'){
        return next({
            type:action
        })
    }
    return next(action);
}


const store = createStore(reducer,applyMiddleware(thunkMiddleware,stringMiddleware,logMiddleware));

/*const myAction = (dispatch)=>{
    setTimeout(()=>dispatch({
        type:'DELAYED_ACTION'
    }),2000);
}*/

const delayedActionCreator = (timeout)=>(dispatch)=>{
        setTimeout(()=>dispatch({
            type:'DELAYED_ACTION'
        }),timeout);
}

store.dispatch(delayedActionCreator(2000));

export default store;