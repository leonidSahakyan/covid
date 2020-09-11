import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import $ from 'jquery'

class ShareAppModal extends React.Component {
  constructor(props) {
    super(props)
    this.renderModalContent = this.renderModalContent.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }
  componentDidMount() {
    $('#shareAppModal').modal('show')
  }
  renderModalContent() {
    return (
      <h1>Share App</h1>
    )
  }
  closeModal() {
    this.props.history.goBack()
  }
  render() {
    return(
      <div class="modal fade" id="shareAppModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Talk About Us</h5>
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

export default connect()(withRouter(ShareAppModal))
