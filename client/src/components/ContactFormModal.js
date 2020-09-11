import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import $ from 'jquery'
import actions from '../store/actions/index'

class ContactFormModal extends React.Component {
  constructor(props) {
    super(props)
    this.renderModalContent = this.renderModalContent.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.state = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  }
  componentDidMount() {
    $('#contactUsFormModal').modal('show')
    if(this.props.user) {
      this.setState({
        email: this.props.user.email,
        name: this.props.user.name
      })
    }
  }
  renderModalContent() {
    return (
      <div className="contactForm">
        <input type="text" placeholder="full name" value={this.state.name} onChange={(e)=>{this.setState({name: e.target.value})}} />
        <input type="text" placeholder="email address" value={this.state.email} onChange={(e)=>{this.setState({email: e.target.value})}} />
        <input type="text" placeholder="subject" value={this.state.subject} onChange={(e)=>{this.setState({subject: e.target.value})}} />
        <textarea rows="8" placeholder="message" value={this.state.message} onChange={(e)=>{this.setState({message: e.target.value})}} />
      </div>
    )
  }
  submitForm() {
    this.props.dispatch(actions.submitContactForm('contact_us', this.state.name, this.state.email, this.state.subject, this.state.message))
    this.props.history.goBack()
  }
  closeModal() {
    this.props.history.goBack()
  }
  render() {
    return(
      <div class="modal fade" id="contactUsFormModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Contact Us</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}  >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              {this.renderModalContent()}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={this.closeModal}>Close</button>
              <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.submitForm}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  if(state.user)
  return {
    user: state.user.profile
  }
  else return {}
}

export default connect(mapStateToProps)(withRouter(ContactFormModal))
