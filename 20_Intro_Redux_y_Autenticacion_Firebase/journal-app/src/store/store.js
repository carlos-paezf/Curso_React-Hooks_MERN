import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { authReducer, uiReducer } from '../reducers'
import thunk from 'redux-thunk'

/* The above code is combining all the reducers into one. */
const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer
})

/* Checking if the window object exists and if it does, it checks if the __REDUX_DEVTOOLS_EXTENSION__
exists on the window object. If it does, it returns the compose function with the
__REDUX_DEVTOOLS_EXTENSION__ function as the first argument. If it does not, it returns the compose
function. */
const composeEnhancers = (typeof window !== 'undefined' && (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose))

/** 
 * Creating a store that will be used to store the state of our application.
 * Create a Redux store that holds the state tree. 
 * The only way to change the state tree in the store is to call store.dispatch(someActionCreator(...args)). 
 * You can pass additional argument to the action creator that will be passed to the reducer. 
 */
export const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk))
)