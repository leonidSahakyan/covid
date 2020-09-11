import React from 'react'
import { isIOS, isAndroid } from "react-device-detect";
import iphoneShareIcon from '../resources/iphone-share-icon.png'
import addTo from '../resources/addto.png'
import $ from 'jquery'
import { withRouter } from 'react-router-dom'

class InstallModal extends React.Component {
  constructor(props) {
    super(props)
    this.renderIOSContent = this.renderIOSContent.bind(this)
    this.renderAndroidContent = this.renderAndroidContent.bind(this)
    this.renderModalContent = this.renderModalContent.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  componentDidMount() {
    $('#installModal').modal('show')
  }

  renderModalContent() {
    return(
      <div className="installModalContent">
        <h1 className="text-center">Install App</h1>
        <p>For your convenience, install this app to your home screen for easy access. It works best when continually used and updated.</p>
        {isIOS && this.renderIOSContent()}
        {isAndroid && this.renderAndroidContent()}
      </div>
    )
  }

  renderIOSContent() {
    return (
      <React.Fragment>
        <img src={iphoneShareIcon} />
        <p>1. Select the sharing icon on your browser</p>
        <img src={addTo} />
        <p>2. Scroll, find and select 'Add to Home Screen'</p>
      </React.Fragment>
    )
  }

  renderAndroidContent() {
    return(
      <p>Press the three (3) dots on the url bar and select '+ ADD TO HOME SCREEN'</p>
    )
  }

  closeModal() {
    this.props.history.goBack()
  }

  render() {
    return (
      <div class="modal fade" id="installModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Install to Home Screen</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
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

export default withRouter(InstallModal)
