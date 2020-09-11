import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import userReducer from './user'
import cmsReducer from './cms'
import jhCovidDataReducer from './jhCovidData'
import sharingReducer from './sharing'

const rootReducer = (history) => combineReducers({
  user: userReducer,
  cms: cmsReducer,
  jhCovidData: jhCovidDataReducer,
  sharing: sharingReducer,
  router: connectRouter(history)
})

export default rootReducer;
