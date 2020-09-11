import React from 'react'
import { connect } from 'react-redux'
import Axios from 'axios'
import {
  endpoint,
  VERIFY_EMAIL_URI
} from '../store/constants'
import Spinner from 'react-bootstrap/Spinner'

class VerifyEmail extends React.Component {
  constructor(props) {
    super(props)
    this.handleResend = this.handleResend.bind(this)
    this.state = {
      waiting: false
    }
  }
  
  handleResend() {
    this.setState({waiting: true})
    Axios({
      method: 'GET',
      url: endpoint(VERIFY_EMAIL_URI),
      withCredentials: true,
      validateStatus: () => true
    }).then(() => {
      this.setState({ waiting: false })
    }).catch(err => {
      this.setState({ waiting: false })
    })
  }

  render() {
    return (
      <React.Fragment>
        <p>You have not verified your email address, please go to {this.props.email} and paste the link provided into your browser.</p>
        <button className="btn btn-primary" onClick={this.handleResend}>
          {this.state.waiting && <Spinner animation="border" size="sm" />}
          {!this.state.waiting && 'Resend Email'}
        </button>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    email: state.user.profile.email
  }
}

export default connect(mapStateToProps)(VerifyEmail)