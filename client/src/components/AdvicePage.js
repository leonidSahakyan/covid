import React from 'react'
import { connect } from 'react-redux'
import { USER_COVID_STATES } from '../store/constants'
class AdvicePage extends React.Component {
  
  constructor(props) {
    super(props)
    this.renderSymptomatic = this.renderSymptomatic.bind(this)
    this.renderTestedPositive = this.renderTestedPositive.bind(this)
  }

  renderTestedPositive() {
    return (
      <div classNAme="advicePage">
        <h2>Your State is now RED</h2>
        <p>Advice</p>
      </div>
    )
  }

  renderSymptomatic() {
    return (
      <div classNAme="advicePage">
        <h2>Your State is now AMBER</h2>
        <p>Advice</p>
      </div>
    )
  }

  render() {
    if(!this.props.newState) return null
    else if(this.props.newState === USER_COVID_STATES.TESTED_POSITIVE) {
      return this.renderTestedPositive()
    } else {
      return this.renderSymptomatic()
    }
  }
}

function mapStateToProps(state) {
  return {
    newState: state.user.newState
  }
}

export default connect(mapStateToProps)(AdvicePage)
