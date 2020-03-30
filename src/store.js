import {createStore,compose} from "redux";
import reducer from './reducers/index';

const stringEnhancer  = (createStore)=>(...args)=>{
    const store = createStore(...args);
    const originalDipatch = store.dispatch;
    store.dispatch = (action)=>{
        if(typeof action==="string"){
            return originalDipatch({
                type:action
            })
        }
        else {
            originalDipatch(action);
        }
    }
    return store;
}

const logEnhancer  = (createStore)=>(...args)=>{
    const store = createStore(...args);
    const originalDipatch = store.dispatch;
    store.dispatch = (action)=>{
            console.log(action.type);
            originalDipatch(action);
        }
    return store;

}


const store = createStore(reducer,compose(stringEnhancer,logEnhancer));


store.dispatch('HELLO_WORLD');

export default store;