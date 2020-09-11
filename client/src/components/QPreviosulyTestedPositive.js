import React from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import actions from '../store/actions/index'
import DatePicker from 'react-datepicker'
import { USER_COVID_STATES } from '../store/constants'

class QPreviosulyTestedPositive extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderTestedPosBefore = this.renderTestedPosBefore.bind(this)

    this.state = {
      optionSelected: false,
      testedPosPreviously: false,
      date: null
    }
  }

  handleSubmit() {
    try {
      const date = new Date(this.state.date)
      if(this.state.testedPosPreviously && 
        (new Date().getDate() - date.getDate() < 7)) {
        this.props.dispatch(actions.storeSelectedState(USER_COVID_STATES.TESTED_POSITIVE))
        this.props.setPosTestDate(this.state.date)
      }
      this.props.dispatch(actions.submitTestedPosPreviously(
        this.state.testedPosPreviously,
        date
      ))
    } catch(e) {
      window.alert(e.message)
    }
  }

  renderTestedPosBefore() {
    return(
      <React.Fragment>
        <p>Please provide the date you tested positive.</p>
        <DatePicker
          selected={this.state.date}  
          onChange={(date)=>{
            if(new Date().getDate() - date.getDate() < 7) 
              this.setState({ currentlyPositive: true })
            this.setState({date: date})
          }}
          isClearable
          placeholderText="Enter Date"
          maxDate={new Date()}
          dateFormat="dd/MM/yyyy"
        />
        {this.state.currentlyPositive &&
          <p>You have tested positive in the last 7 days. Your status will be updated to red.</p>
        } 
      </React.Fragment>
    )
  }

  render() {
    return (
      <Modal
        centered
        show={this.props.show}
        onHide={this.hide}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            It's your first time...
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="firstTimeModal">
            <p>It is important to know if you have ever previously tested positive for COVID-19.</p>
            <div class="custom-control custom-radio custom-control-inline">
              <input type="radio" id="customRadioInline1" name="customRadioInline1" class="custom-control-input"
                onChange={() => { this.setState({ optionSelected: true, testedPosPreviously: true }) }}
                checked={this.state.optionSelected && this.state.testedPosPreviously} 
              />
              <label class="custom-control-label" for="customRadioInline1">I have tested positive for COVID-19 before.</label>
            </div>
            <div class="custom-control custom-radio custom-control-inline">
              <input type="radio" id="customRadioInline2" name="customRadioInline1" class="custom-control-input"
                onChange={() => { this.setState({ optionSelected: true, testedPosPreviously: false }) }}
                checked={this.state.optionSelected && !this.state.testedPosPreviously} 
              />
              <label class="custom-control-label" for="customRadioInline2">I have NOT tested positive for COVID-19 before.</label>
            </div>
            {this.state.testedPosPreviously && this.renderTestedPosBefore()}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={this.handleSubmit} disabled={!this.state.optionSelected}>
            Continue
          </button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default connect()(QPreviosulyTestedPositive)