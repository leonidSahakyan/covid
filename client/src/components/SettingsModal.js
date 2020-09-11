import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import $ from 'jquery'
import actions from '../store/actions'
import SettingsForm from './SettingsForm'

class Settings extends React.Component {
  componentDidMount() {
    $('#settingsModal').modal('show')
  }

  render() {
    return (
      <div class="modal fade" id="settingsModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Settings</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={()=>{this.props.history.push('/')}}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <SettingsForm />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={()=>{this.props.history.push('/')}}>Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
     user: state.user.profile
   }
}

export default connect(mapStateToProps)(withRouter(Settings))
