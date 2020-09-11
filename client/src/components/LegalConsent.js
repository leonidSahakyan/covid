import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import actions from '../store/actions/index'
class LegalConsent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      agreed: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    this.props.dispatch(actions.updateLegalConsent())
  }

  render() {
    return (
      <React.Fragment>
        <p>Our policies have been updated, you are required to read, understand and agree to our legal terms before you may proceed and access your account.</p>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" 
            value={this.state.agreed} 
            onChange={(e)=>{
              this.setState({agreed: e.target.checked})
            }}
            id="noSymptomsCheck"/>
          <label class="form-check-label" for="defaultCheck1">
            I agree to the updated <Link to='/privacy'>Privacy Policy</Link>, <Link to='/term'>Terms</Link> and <Link to='/disclaimer'>Disclaimer</Link>.
          </label>
        </div>
        <button className="btn btn-primary" disabled={!this.state.agreed} onClick={this.handleSubmit}>Continue</button>
      </React.Fragment>
    )
  }
}

export default connect()(LegalConsent)