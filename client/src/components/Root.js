import React from 'react';
import { connect } from "react-redux";
import Authenticated from './Authenticated'
import NotAuthenticated from './NotAuthenticated'
import { AUTH_STATES } from '../store/constants';

class Root extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.userAuthState === AUTH_STATES.AUTHENTICATED && <Authenticated />}
        {!this.props.userAuthState !== AUTH_STATES.AUTHENTICATED && <NotAuthenticated />}
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    userAuthState: state.user.authState,
  }
}

export default connect(mapStateToProps)(Root);
