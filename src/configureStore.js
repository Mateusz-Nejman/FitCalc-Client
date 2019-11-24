import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import rootReducer from './reducers';

export const history = createBrowserHistory()

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

export default function configureStore(preloadedState) {
    const store = createStore(
      rootReducer(history), // root reducer with router state
      preloadedState,
      composeEnhancers(
        applyMiddleware(
          routerMiddleware(history), // for dispatching history actions
          // ... other middlewares ...
        ),
      ),
    )
  
    return store
  }