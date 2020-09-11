import React from 'react'
import { connect } from 'react-redux'
import actions from '../store/actions/index'
import { AUTH_STATES } from '../store/constants'

class PasswordResetToken extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      password1: '',
      password2: '',
      submitDisabled: true,
      infoText: 'password needs to be 8 characters or more'
    }
    this.submitForm = this.submitForm.bind(this)
  }

  handleInputChange(e) {
    let newState = this.state
    if(e.target.id === 'pass1') {
      newState.password1 = e.target.value
    } else {
      newState.password2 = e.target.value
    }
    if(this.state.password1 !== this.state.password2) {
      newState.infoText = 'passwords do not match'
    }
    if(this.state.password1.length < 8) {
      newState.infoText = 'passwords must be 8 characters or more'
    }
    if((newState.password1.length >= 8)&&(newState.password1 == newState.password2)) {
      newState.infoText= ''
      newState.submitDisabled = false
    }
    this.setState(newState)
  }

  submitForm() {
    this.props.dispatch(actions.updateUserPassword(this.props.match.params.token, this.state.password1))
  }
  
  renderForm() {
    return (
      <React.Fragment>
        <h3>Reset Password</h3>
        <input type="password" value={this.state.password1} id="pass1" onChange={(e) => this.handleInputChange(e)}/>
        <input type="password" value={this.state.password2} id="pass2" onChange={(e) => this.handleInputChange(e)}/>
        <p>{this.state.infoText}</p>
        <button className="btn btn-primary" disabled={this.state.submitDisabled} onClick={this.submitForm}>Submit</button>
      </React.Fragment>
    )
  }

  renderError() {
    return (
      <React.Fragment>
        <p>Reset token was invalid - perhaps it has already been used or it expired, they are only valid for 10 minutes!</p>
      </React.Fragment>
    )
  }

  render() {
    return (
      <div className="passwordReset">
        {this.props.authState == AUTH_STATES.INVALID_TOKEN && this.renderError()}
        {this.props.authState != AUTH_STATES.INVALID_TOKEN && this.renderForm()}
      </div>
    )
  }
    
}

function mapStateToProps(state) {
  return {
    authState: state.user.authState
  }
}

export default connect(mapStateToProps)(PasswordResetToken)