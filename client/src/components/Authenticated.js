import React from 'react'
import { connect } from 'react-redux'
import {
  withRouter,
  Redirect,
  Route
 } from 'react-router-dom';
import $ from 'jquery'

import Profile from './Profile';
import ConnectModal from './ConnectModal';
import NotificationsModal from './NotificationsModal'
import SettingsModal from './SettingsModal'
import ConnectionProfileModal from './ConnectionProfileModal'
import ReportDetails from './ReportDetails'
import AdvicePage from './AdvicePage'
import LegalConsent from './LegalConsent'
import VerifyEmail from './VerifyEmail'

class Authenticated extends React.Component {
  constructor(props) {
    super(props)
    this.closeAllModals = this.closeAllModals.bind(this)
  }

  closeAllModals() {
    $('.modal').modal('hide')
  }

  componentWillMount() {
    this.props.history.push('/')
  }

  renderLegalConsent() {
    return <LegalConsent />
  }

  renderVerifyEmail() {
    return <VerifyEmail />
  }

  renderReportDetails() {
    return <ReportDetails />
  }

  renderAdvicePage() {
    return <AdvicePage />
  }

  renderNormal() {
    return(
      <React.Fragment>
        <Profile />
        <Route path='/'>
          {this.closeAllModals()}
        </Route>
        <Route path={['/login','/gdpr-consent', 'password-reset-token/*']}>
          <Redirect to='/' />
        </Route>
        <Route path='/notifications'>
          <NotificationsModal />
        </Route>
        <Route path='/settings'>
          <SettingsModal />
        </Route>
        <Route path='/connect'>
          <ConnectModal />
        </Route>
        <Route path='/connection/:userID'>
          <ConnectionProfileModal />
        </Route>
      </React.Fragment>
    )
  }

  render() {
    if(!this.props.user.email_verified)
      return this.renderVerifyEmail()
    if(!this.props.user.current_legal_consent)
      return this.renderLegalConsent()
    if (this.props.selectedState)
      return this.renderReportDetails()
    else if (this.props.newState)
      return this.renderAdvicePage()
    else
      return this.renderNormal()
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.profile,
    selectedState: state.user.selectedState,
    newState: state.user.newState
  }
}

export default connect(mapStateToProps)(withRouter(Authenticated))
