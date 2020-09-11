// react
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

// routing
import { createBrowserHistory } from "history";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// app
import './index.css';
import App from './App';
import './App.scss';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

// redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from "./store/reducers/index";
import rootSaga from './store/sagas/index'
import createSagaMiddleware from 'redux-saga'

// GA
import ReactGA from 'react-ga';
import {GA_TRACKING_ID} from './store/constants'

// Initialisation
const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer(history),
  applyMiddleware(
    sagaMiddleware
  )
);
sagaMiddleware.run(rootSaga)

ReactGA.initialize(GA_TRACKING_ID);
history.listen(location => {
  let url
  const re = /#?/
  try {
    url = location.pathname.split(re)[0]
  } catch(e) {
    url = window.location.pathname
  }
  ReactGA.set({ page: url }); // Update the user's current page
  ReactGA.pageview(url); // Record a pageview for the given page
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path={'/*'} children={<App />} />
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
