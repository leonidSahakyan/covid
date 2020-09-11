import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import QrReader from 'react-qr-scanner'
import QRCode from 'react-qr-code'
import ProfileCard from './ProfileCard'
import bojo from '../resources/bojo.jpg';
import $ from 'jquery'
import actions from '../store/actions/index'
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton
  
} from "react-share";

const quote = "Hi I'm using the covid app"
const title = "COVID APP"

class ConnectModal extends React.Component {

  constructor(props) {
    super(props)
    this.copyUrl = this.copyUrl.bind(this)
    this.renderModalBody = this.renderModalBody.bind(this)
    this.handleShareClick = this.handleShareClick.bind(this)
    this.handleQRScanClick = this.handleQRScanClick.bind(this)
    this.handleScan = this.handleScan.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleConnectClick = this.handleConnectClick.bind(this)
    this.renderShareCode = this.renderShareCode.bind(this)
    this.handleConfirmConnect = this.handleConfirmConnect.bind(this)
    this.handleRejectConnect = this.handleRejectConnect.bind(this)
    this.renderSharing = this.renderSharing.bind(this)

    this.state = {
      copiedUrl: false,
      delay: 100,
      scanResult: null,
      scannerActive: false,
      connectButtonText: 'Connect',
      flashMessage: ''
    }
    this.sharingUrl = React.createRef()
  }

  componentWillMount(){
    this.props.dispatch(actions.getShareCode())
  }

  componentDidMount() {
    $('#connectModal').modal('show')
  }

  componentWillReceiveProps(props, nextProps) {
    if(!props.scannedProfileResult && nextProps.scannedProfileResult)
      this.setState({
        flashMessage: ''
      })
  }

  copyUrl() {
    this.sharingUrl.current.select()
    document.execCommand("copy");
    this.setState({
      copiedUrl: true
    })
  }

  handleQRScanClick() {
      this.setState({
        scannerActive: !this.state.scannerActive,
        scanResult: null
      })
  }

  closeModal() {
    this.setState({
      scannerActive: false
    })
    this.props.history.push('/')
  }

  handleScan(data){
    if(typeof data == "string")
    {
      const token = data.split('/')[4]
      this.props.dispatch(actions.revealTokenOwner(token))
      this.setState({ 
        scanResult: data,
        flashMessage: 'loading profile...'
      })
    }
  }

  handleError(err){
    window.alert(err)
  }

  handleConnectClick() {
    this.setState({
      connectButtonText: 'Connected'
    })
  }

  async handleShareClick() {
    let shareData = {
      title: title,
      text: quote,
      url: this.props.sharingUrl
    }
    try {
      await navigator.share(shareData)
      window.alert('shared')
    } catch(err) {
      window.alert(err)
    }
  }

  handleConfirmConnect() {
    this.props.dispatch(actions.confirmConnection(this.props.scannedProfileResult.id))
    this.props.history.push('/')
  }

  handleRejectConnect() {
    this.setState({
      scanResult: null
    })
    this.props.dispatch(actions.storeScannedProfileResult(null))
  }

  renderSharing() {
    return (
      <React.Fragment>
        {!navigator.share &&
        <div className="sharingButtons">
          <EmailShareButton 
            url={this.props.sharingUrl}
            subject={title}
            body={quote}
          >
            <EmailIcon round/>
          </EmailShareButton>
          <FacebookShareButton 
            url={this.props.sharingUrl}
            quote={quote}
          >
            <FacebookIcon round />
          </FacebookShareButton>
          <FacebookMessengerShareButton 
            url={this.props.sharingUrl} 
            appId='566073887380055'
            message={quote}  
          >
            <FacebookMessengerIcon round />
          </FacebookMessengerShareButton>
          <LinkedinShareButton
            url={this.props.sharingUrl}
            quote={quote}  
          >
            <LinkedinIcon round />
          </LinkedinShareButton>
          <TwitterShareButton 
            url={this.props.sharingUrl}
            quote={quote}  
          >
            <TwitterIcon round />
          </TwitterShareButton>
          <WhatsappShareButton 
            url={this.props.sharingUrl}
            quote={quote}  
          >
            <WhatsappIcon round />
          </WhatsappShareButton>
        </div>}
        {navigator.share &&
          <button className="btn btn-primary" onClick={this.handleShareClick}>Share Your Code</button>
        }
      </React.Fragment>
    )
  }

  renderShareCode() {
    if(this.props.sharingUrl)
      return (
        <React.Fragment>
          <div class="input-group mb-3">
            <input type="text" class="form-control" value={this.props.sharingUrl} ref={this.sharingUrl} readOnly="true"/>
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" onClick={this.copyUrl}>{(this.state.copiedUrl) ? 'Copied' : 'Copy'}</button>
            </div>
          </div>
          {this.renderSharing()}
          <p align="center">Or presnt your code for scanning:</p>
          <QRCode value={this.props.sharingUrl} />
        </React.Fragment>
      )
    else
      return <p>Loading Code</p>
  }

  renderModalBody() {
    return (
      <div className="connectModal">
        <p><b>Sharing is caring</b>, the more people connected to you and this app, the easier it will be to break chains of transmission.</p>
        <p>Connect with the people you care about by sharing this link with them</p>

        {!this.state.scannerActive && !this.state.scanResult && this.renderShareCode()}
        <button className="btn btn-primary" onClick={this.handleQRScanClick}>{this.state.scannerActive ? 'Cancel' : 'Scan a code'}</button>
        {this.state.scannerActive && !this.state.scanResult &&
          <QrReader
            delay={this.state.delay}
            onError={this.handleError}
            onScan={this.handleScan}
          />
          }
          {this.state.flashMessage}
          {this.props.scannedProfileResult &&
            <React.Fragment>
              <ProfileCard
                name={this.props.scannedProfileResult.name}
              />
              <button className="btn btn-primary w-50" onClick={this.handleConfirmConnect}>Confirm</button>
              <button className="btn btn-primary w-50" onClick={this.handleRejectConnect}>Cancel</button>
            </React.Fragment>
          }
      </div>
    )
  }

  render() {
    return(
      <div class="modal fade" id="connectModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Connect</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              {this.renderModalBody()}
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.closeModal}>Close</button>
            </div>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    //sharingUrl: window.location.href + '/' + state.sharing.currentUserShareCode,
    sharingUrl: 'https://dev.chainbreak.com' + '/' + state.sharing.currentUserShareCode,    
    scannedProfileResult: state.sharing.scannedTokenProfile
  }
}

export default connect(mapStateToProps)(withRouter(ConnectModal));
