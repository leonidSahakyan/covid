import React from 'react'
import { connect } from 'react-redux' 
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import { USER_COVID_STATES, AUTH_STATES } from '../store/constants'
import actions from '../store/actions/index'
import { Link } from 'react-router-dom'

class LoginModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      stayLoggedIn: false,
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleForgotPassword = this.handleForgotPassword.bind(this)
  }

  handleForgotPassword() {
    this.props.dispatch(actions.getPasswordResetToken(this.state.email))
  }

  handleLogin() {
    this.props.dispatch(actions.login({
      email: this.state.email, 
      password: this.state.password, 
      stayLoggedIn: this.state.stayLoggedIn
    }))
  }

  renderAuthentication() {
    return (
      <React.Fragment>
        <input
          type="text" 
          placeholder="email address" 
          onChange={(e)=>this.setState({email: e.target.value})}
        />
        <input 
          type="password" 
          placeholder="enter / set password" 
          onChange={(e)=>this.setState({password: e.target.value})}
        /><br/>
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="persistentLoginCheck"
            checked={this.state.stayLoggedIn}
            onChange={()=>this.setState({ stayLoggedIn: !this.state.stayLoggedIn})}
          />
          <label class="custom-control-label" for="persistentLoginCheck">Stay logged in</label>
        </div>
        {this.props.userAuthState === AUTH_STATES.FAILED && 'Failed - Email address registered, password incorrect.'}
        <Link to={'/password-reset/'+this.state.email}>Email password reset</Link>
      </React.Fragment>      
    )
  }

  renderPositive() {
    return(
      <React.Fragment>
        <p>You're reporting that you've tested positive recently.</p>
        <p>Login or sign up:</p>        
      </React.Fragment>
    )
  }

  renderSymptomatic() {
    return (
      <React.Fragment>
        <p>You're reporting that you've recently had symptoms.</p>
        <p>Login or sign up:</p>
      </React.Fragment>
    )
  }

  renderNegitive() {
    return (
      <React.Fragment>
        <p>You're reporting that you're symptom free.</p>
        <p>Login or sign up:</p>
      </React.Fragment>
    )
  }
  render() {
    return (
      <Modal
        centered
        show={this.props.show}
        onHide={this.props.onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.props.selectedState === USER_COVID_STATES.TESTED_POSITIVE && 'Tested Positive' }
            {this.props.selectedState === USER_COVID_STATES.RECOVERED_CLEAR && 'Symptom Free'}
            {this.props.selectedState === USER_COVID_STATES.HAVE_SYMPTOMS && 'Symtomatic'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.selectedState === USER_COVID_STATES.TESTED_POSITIVE && this.renderPositive()}
          {this.props.selectedState === USER_COVID_STATES.RECOVERED_CLEAR && this.renderNegitive()}
          {this.props.selectedState === USER_COVID_STATES.HAVE_SYMPTOMS && this.renderSymptomatic()}
          {this.renderAuthentication()}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleLogin}>
            {this.props.userAuthState === AUTH_STATES.START && 'Continue'}
            {this.props.userAuthState === AUTH_STATES.WAITING && <Spinner animation="border" size="sm" />}
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    userAuthState: state.user.authState
  }
}

export default connect(mapStateToProps)(LoginModal)