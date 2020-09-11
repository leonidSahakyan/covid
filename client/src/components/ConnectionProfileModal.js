import React from 'react'
import $ from 'jquery'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class ConnectionProfileModal extends React.Component {
  constructor(props) {
    super(props)
    this.renderModalContent = this.renderModalContent.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  componentDidMount() {
    $('#profileDetailModal').modal('show')
  }

  renderModalContent() {
    const subject = this.props.connections.find(connection => connection.id == this.props.match.params.userID)
    return (
      <div className="profileDetail">
        { subject.name }
      </div>
    )
  }

  closeModal() {
    this.props.history.goBack()
  }

  render() {
    return (
      <div class="modal fade" id="profileDetailModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Connection</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              {this.renderModalContent()}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={this.closeModal}>Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    connections: state.user.contacts
  }
}

export default connect(mapStateToProps)(withRouter(ConnectionProfileModal))
