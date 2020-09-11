import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import Landing from './Landing';
import Registration from './Registration'
import PasswordResetToken from './PasswordResetToken'
import { AUTH_STATES } from '../store/constants';
import ShareConnectMessage from './ShareConnectMessage'
import PasswordReset from './PasswordReset'

class NotAuthenticated extends React.Component {
  constructor(props) {
    super(props)
    this.handleFbAuth = this.handleFbAuth.bind(this)
    this.handleGoogleAuth = this.handleGoogleAuth.bind(this)
  }

  handleFbAuth() {
    /*
    let code = new URLSearchParams(this.props.location.search).get('code')
    let state = new URLSearchParams(this.props.location.search).get('state')
    state = JSON.parse(state)
    this.props.dispatch(actions.storeUserCovidState(state.covidState))
    this.props.dispatch(actions.oauthFacebook(code))
    return <Redirect to='/' />
    */
   return null
  }

  handleGoogleAuth() {
    /*
    let code = new URLSearchParams(this.props.location.search).get('code')
    let state = new URLSearchParams(this.props.location.search).get('state')
    state = JSON.parse(state)
    this.props.dispatch(actions.storeUserCovidState(state.covidState))
    this.props.dispatch(actions.oauthGoogle(code))
    return <Redirect to='/' />
    */
   return null
  }

  render() {
    return(
      <React.Fragment>
        <Switch>
          <Route exact path='/oauth/facebook' render={()=>this.handleFbAuth()}/>
          <Route exact path='/oauth/google' render={()=>this.handleGoogleAuth()}/>
          <Route exact path='/connect/:shareCode' render={(props) => (
            <ShareConnectMessage {...props}/>
          )}>
          </Route>
          <Route exact path='/password-reset-token/:token' render={(props) => (
            <PasswordResetToken {...props}/>
          )}>
          </Route>
          <Route exact path='/password-reset/:email?' render={(props) => (
            <PasswordReset {...props}/>
          )}>
          </Route>
          <Route path='*'>
            <Redirect to='/' />
            {((this.props.userAuthState == AUTH_STATES.START) ||
              (this.props.userAuthState == AUTH_STATES.WAITING)) && <Landing />}
            {this.props.userAuthState == AUTH_STATES.REGISTRATION && <Registration />}
          </Route>
        </Switch>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    covidState: state.user.covidState,
    userAuthState: state.user.authState
  }
}

export default connect(mapStateToProps)(withRouter(NotAuthenticated))
