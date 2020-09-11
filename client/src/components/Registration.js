import React from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import actions from '../store/actions/index'
import { Link } from 'react-router-dom'
import { AUTH_STATES } from '../store/constants'

class Registration extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      password: '',
      legalConsent: false
    }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
  }

  componentDidMount() {
    if(!this.props.registrationDetails) return;
    this.setState({
      email: this.props.registrationDetails.email,
      password: this.props.registrationDetails.password,
      stayLoggedIn: this.props.registrationDetails.longLogin
    })
    window.scrollTo(0, 0)
  }

  handleRegister() {
    this.props.dispatch(actions.register({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      legalConsent: this.state.legalConsent
    }))
  }

  handleLogin() {
    this.props.dispatch(actions.login({
      email: this.state.email,
      password: this.state.password,
      legalConsent: this.state.legalConsent
    }))
  }

  render() {
    return (
      <div className="registration-form">
        <h2>Nearly There...</h2>
        <p>Your email wasn't recognised, you need to create an account or correct your details.</p>
        <input type="text" 
          value={this.state.email} 
          onChange={(e)=>{this.setState({email:e.target.value})}}
          placeholder="email"
        />
        <input type="password"
          value={this.state.password} 
          onChange={(e)=>{this.setState({password:e.target.value})}}
          placeholder="password"
        />
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="persistentLoginCheck"
            checked={this.state.stayLoggedIn}
            onChange={()=>this.setState({ stayLoggedIn: !this.state.stayLoggedIn})}
          />
          <label class="custom-control-label" for="persistentLoginCheck">Stay logged in</label>
        </div>
        <br/>
        <Button className="" onClick={this.handleLogin}>
          {this.props.userAuthState == AUTH_STATES.REGISTRATION && 'Continue with different email'}
          {this.props.userAuthState == AUTH_STATES.WAITING && <Spinner animation="border" size="sm" />}
        </Button>

        <hr/>

        <h4 className="text-center">Continue Registration:</h4>
        <input type="text" placeholder="Display Name" value={this.state.name} onChange={(e)=>{this.setState({name: e.target.value})}} />
        <p>I have read and understand the <Link to='/privacy'>Privacy Policy</Link>, <Link to='/terms'>Terms</Link> and <Link to='/disclaimer'>Disclaimer</Link>, the latest versions of which are detailed in these links, and confirm that I am at least 13 years old.</p>
        <div class="custom-control custom-checkbox text-center">
          <input type="checkbox" class="custom-control-input" id="legalConsentCheck"
            checked={this.state.legalConsent}
            onChange={()=>this.setState({ legalConsent: !this.state.legalConsent})}
          />
          <label class="custom-control-label" for="legalConsentCheck">I confirm the above.</label>
        </div>
        <hr/>
        <Button 
          className="" 
          disabled={!this.state.legalConsent} 
          onClick={this.handleRegister}
        >
          {this.props.userAuthState == AUTH_STATES.REGISTRATION && 'Register'}
          {this.props.userAuthState == AUTH_STATES.WAITING && <Spinner animation="border" size="sm" />}
        </Button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userAuthState: state.user.authState,
    registrationDetails: state.user.registrationDetails
  }
}

export default connect(mapStateToProps)(Registration)