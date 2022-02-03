import { createStore, combineReducers } from 'redux'
import { authReducer } from '../reducers'

/* The above code is combining all the reducers into one. */
const reducers = combineReducers({
    auth: authReducer,
})

/** 
 * Creating a store that will be used to store the state of our application.
 * Create a Redux store that holds the state tree. 
 * The only way to change the state tree in the store is to call store.dispatch(someActionCreator(...args)). 
 * You can pass additional argument to the action creator that will be passed to the reducer. 
 */
export const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())