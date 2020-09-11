import React from 'react'
import { connect } from 'react-redux'
import actions from '../store/actions/index'
class ShareConnectMessage extends React.Component {

  componentDidMount() {
    this.props.dispatch(actions.handleShareCode(this.props.match.params.shareCode))
  }

  render() {
    return (
      <p>This is a message from Chainbreak!</p>
    )
  }
}

export default connect()(ShareConnectMessage)