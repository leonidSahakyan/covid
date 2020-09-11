import React from 'react'
import { connect } from 'react-redux'
import actions from '../store/actions/index'

class HandleShareCode extends React.Component {
  componentDidMount() {
    this.props.dispatch(actions.handleShareCode(this.props.code))
  }

  render() { return null }
}

export default connect()(HandleShareCode)
