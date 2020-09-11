import React from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle  } from '@fortawesome/free-solid-svg-icons';
import { USER_COVID_STATES, COVID_RISKS_STATES } from '../store/constants'

class ProfileCard extends React.Component {
  constructor(props) {
    super(props)
    this.getButtonClass = this.getButtonClass.bind(this)
  }
  getButtonClass() {
    let prefix = 'btn btn-'
    let suffix = 'text-left'
    if(this.props.status)
      switch(this.props.status) {
        case USER_COVID_STATES.TESTED_POSITIVE: return prefix + 'danger ' + suffix;
        case USER_COVID_STATES.HAVE_SYMPTOMS: return prefix + 'warning ' + suffix;
        case USER_COVID_STATES.RECOVERED_CLEAR: return prefix + 'success ' + suffix;
        default: return prefix + 'dark' + suffix
      }
    else
      return prefix + 'outline-dark ' + suffix
  }

  render() {
    return(
      <div className="profileCard">
        <button className={this.getButtonClass()} data-toggle="modal" data-target="#profileDetailModal">
          {this.props.picture &&
            <img src={this.props.picture} className="profilePicutre" alt="user"/>
          }
          {this.props.name}
        </button>
      </div>
    );
  }
}

export default connect()(ProfileCard)
