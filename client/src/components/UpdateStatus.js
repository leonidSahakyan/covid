import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile, faFrown, faMeh } from '@fortawesome/free-solid-svg-icons';

import { USER_COVID_STATES } from '../store/constants'
import LoginModal from './LoginModal'
import actions from '../store/actions/index'

class UpdateStatus extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedState: null
    }
  }

  handleStatusButtonClick(e, status) {
    this.setState({
      selectedState: status
    })
    this.props.dispatch(actions.storeSelectedState(status))
  }

  renderColourButtons() {
    return(
      <div className="updateStatus">
        <div className="row no-gutters-sm">
          <div className="col-4">
            <div className="text-center">
              <button
                type="button"
                className="btn colour-button positive"
                onClick={(e) => {this.handleStatusButtonClick(e, USER_COVID_STATES.TESTED_POSITIVE)}}
              >
                <div className="d-none d-md-block">
                  Tested Positive &nbsp;&nbsp;
                  <FontAwesomeIcon icon={faFrown} />
                </div>
              </button>
            </div>
          </div>
          <div className="col-4">
            <div className="text-center">
              <button
                type="button"
                className="btn colour-button symptomatic"
                onClick={(e) => {this.handleStatusButtonClick(e, USER_COVID_STATES.HAVE_SYMPTOMS)}}
              >
                <div className="d-none d-md-block">
                  Got Symptoms &nbsp;&nbsp;
                  <FontAwesomeIcon icon={faMeh} />
                </div>
              </button>
            </div>
          </div>
          <div className="col-4">
            <div className="text-center">
              <button
                type="button"
                className="btn colour-button negative"
                onClick={(e) => {this.handleStatusButtonClick(e, USER_COVID_STATES.RECOVERED_CLEAR)}}
              >
                <div className="d-none d-md-block">
                  No Symptoms &nbsp;&nbsp;
                  <FontAwesomeIcon icon={faSmile} />
                </div>
              </button>
            </div>
          </div>
        </div>
        <LoginModal 
          selectedState={this.state.selectedState}
          onHide={() => this.setState({selectedState: null})}
          show={this.state.selectedState !== null}
        />
      </div>
    )
  }

  render() {
    return (
      <React.Fragment>
        {this.renderColourButtons()}
      </React.Fragment>
    )
  }
}

export default connect()(withRouter(UpdateStatus));
/*
 this.props.dispatch(actions.getCurrentUser())
                this.props.dispatch(actions.storeUserCovidState(this.state.selectedState))
                this.props.history.push('/login')
*/
