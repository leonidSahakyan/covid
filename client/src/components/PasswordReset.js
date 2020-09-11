import React from 'react'
import { connect } from 'react-redux'
import actions from '../store/actions/index'
class PasswordReset extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      email: null
    }
  }

  componentWillMount() {
    this.setState({email: this.props.match.params.email})
  }
  render() {
    return (
      <React.Fragment>
        <p>Enter you email below and click submit to receive a link to reset your password via email. If you cannot remember your email or no longer have access to it you will need to create a new account.</p>
        <input type="text" value={this.state.email} onChange={(e) => {this.setState({email: e.target.value})}} />
        <button className="btn btn-primary" onClick={()=>{this.props.dispatch(actions.getPasswordResetToken(this.state.email))}}>
          Submit
        </button>
      </React.Fragment>
    )
  }
}

export default connect()(PasswordReset)