import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheck, faUserPlus, faBell, faHeartbeat } from '@fortawesome/free-solid-svg-icons'
import UpdateStatusMobile from './UpdateStatus';

class Landing extends React.Component {
  render() {
    return(
      <div className="landingArea">
        <div className="title text-center">
          <h2 className="d-none d-md-inline">Protect your family, friends &amp; yourself instantly</h2>
          <h3 className="d-inline d-md-none">Protect your family, friends<br/> &amp; yourself instantly</h3>
          <div className="landing-container">
            <p>No tracking <FontAwesomeIcon icon={faTimes} /> No tracing <FontAwesomeIcon icon={faTimes} /></p>
          </div>
          <p className="positive">Trust people you know <FontAwesomeIcon icon={faCheck} /></p>
        </div>
        <p><b>1. Update your status now to login:</b></p>
        <UpdateStatusMobile />
        <div className="landing-container">
          <p><b>2. Privately share your status:</b></p>
        </div>
        <div className="stepTwo row">
          <div className="col-xs-12 col-md-4 text-center">
            <FontAwesomeIcon icon={faUserPlus} /><br/>
            Choose contacts to see each others status – know when social distancing is required
          </div>
          <div className="col-xs-12 col-md-4 text-center">
            <FontAwesomeIcon icon={faBell} /><br/>
            Receive immediate notification if friends status gets worse – they may need help
          </div>
          <div className="col-xs-12 col-md-4 text-center">
            <FontAwesomeIcon icon={faHeartbeat} /><br/>
            Reduce the spread of coronavirus between friends – help beat Covid-19
          </div>
          <div className="col-12 text-center landing-container">
          <br/>
            <h3>The Real Magic</h3>
          </div>
        </div>
        <div className="landing-container">
          <p>As your friends protect their friends and so on, and more people join Total So Far…  the more we all reduce the spread of the virus overall so the better for everybody.</p>
        </div>
        <div className="landing-container">
          <p>Share... blah blah blah <Link to='/share'>Click here</Link></p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userAuthenticated: state.user.authenticated,
    user: state.user.profile
  }
}

export default connect(mapStateToProps)(Landing);
