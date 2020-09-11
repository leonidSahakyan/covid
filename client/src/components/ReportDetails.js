import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import actions from '../store/actions/index'
import QPreviosulyTestedPositive from './QPreviosulyTestedPositive'
import { USER_COVID_STATES } from '../store/constants'
import DatePicker from 'react-datepicker'

class ReportDetails extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dateSymptomsStarted: null,
      dateTestedPositive: null,
      noSymptoms: null,
      dateTestedNegative: null,
      noFeverLast24h: null,
      symptomsImproved: null,
      symptomsNotImproved: null,
      feverLast24h: null,
      optionSelectedNoFeverLast24h: null,
      optionSelectedSymptomsImproved: null,
      currentStatus: null,
      nextStatus: null,
      valid: false
    }

    this.handleBack = this.handleBack.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.startGreen = this.startGreen.bind(this)
    this.startAmber = this.startAmber.bind(this)
    this.startRed = this.startRed.bind(this)
    this.greenToGreen = this.greenToGreen.bind(this)
    this.greenToAmber = this.greenToAmber.bind(this)
    this.greenToRed = this.greenToRed.bind(this)
    this.amberToGreen = this.amberToGreen.bind(this)
    this.amberToAmber = this.amberToAmber.bind(this)
    this.amberToRed = this.amberToRed.bind(this)
    this.redToGreen = this.redToGreen.bind(this)
    this.redToAmber = this.redToAmber.bind(this)
    this.redToRed = this.redToRed.bind(this)  
    this.validateGreenToGreen = this.validateGreenToGreen.bind(this)
    this.validateGreenToAmber = this.validateGreenToAmber.bind(this)
    this.validateGreenToRed = this.validateGreenToRed.bind(this)
    this.validateAmberToGreen = this.validateAmberToGreen.bind(this)
    this.validateAmberToAmber = this.validateAmberToAmber.bind(this)
    this.validateAmberToRed = this.validateAmberToRed.bind(this)
    this.validateRedToGreen = this.validateRedToGreen.bind(this)
    this.validateRedToAmber = this.validateRedToAmber.bind(this)
    this.validateRedToRed = this.validateRedToRed.bind(this)
    this.validateStartGreen = this.validateStartGreen.bind(this)
    this.validateStartAmber = this.validateStartAmber.bind(this)
    this.validateStartRed = this.validateStartRed.bind(this)
  }

  componentWillMount() {
    this.setState({
      currentStatus: this.props.profile.status
    })
    const valid = this.validate()
    this.setState({
      nextStatus: valid
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const nextStatus = this.validate()
    if(this.state.nextStatus != nextStatus) {
      this.setState({nextStatus: nextStatus})
    }
  }

  handleBack() {
    window.location.reload(false);
  }

  validate() {
    switch(this.state.currentStatus) {
      case USER_COVID_STATES.RECOVERED_CLEAR: switch(this.props.selectedState) {
        case USER_COVID_STATES.RECOVERED_CLEAR: return this.validateGreenToGreen();
        case USER_COVID_STATES.HAVE_SYMPTOMS: return this.validateGreenToAmber();
        case USER_COVID_STATES.TESTED_POSITIVE: return this.validateGreenToRed();
      }
      case USER_COVID_STATES.HAVE_SYMPTOMS: switch(this.props.selectedState) {
        case USER_COVID_STATES.RECOVERED_CLEAR: return this.validateAmberToGreen();
        case USER_COVID_STATES.HAVE_SYMPTOMS: return this.validateAmberToAmber();
        case USER_COVID_STATES.TESTED_POSITIVE: return this.validateAmberToRed();
      }
      case USER_COVID_STATES.TESTED_POSITIVE: switch(this.props.selectedState) {
        case USER_COVID_STATES.RECOVERED_CLEAR: return this.validateRedToGreen();
        case USER_COVID_STATES.HAVE_SYMPTOMS: return this.validateRedToAmber();
        case USER_COVID_STATES.TESTED_POSITIVE: return this.validateRedToRed();
      }
      default: switch(this.props.selectedState) {
        case USER_COVID_STATES.RECOVERED_CLEAR: return this.validateStartGreen();
        case USER_COVID_STATES.HAVE_SYMPTOMS: return this.validateStartAmber();
        case USER_COVID_STATES.TESTED_POSITIVE: return this.validateStartRed();
      }
    }
  }

  handleSubmit() {
    if(this.state.currentStatus === this.state.nextStatus) {
      this.props.dispatch(actions.deleteSelectedState())
    } else {
      const report = {
        dateSymptomsStarted: this.state.dateSymptomsStarted,
        dateTestedPositive: this.state.dateTestedPositive,
        dateTestedNegative: this.state.dateTestedNegative,
        nextStatus: this.state.nextStatus
      }
      this.props.dispatch(actions.submitReport(report))
    }
  }

  renderSymptomsBox() {
    return (
      <div className="symptomsBox">
        <p>Chainbreak only considers the main symptoms of Covid-19 to try to prevent false alarms from common colds:</p>
        <ol>
          <li>Fever (38+ C / 100.4+ F) - chest feels hot to touch,</li>
          <li>New continious cough,</li>
          <li>Loss of tate or smell,</li>
          <li>Breathing difficulties.</li>
        </ol>
        <DatePicker
          selected={this.state.dateSymptomsStarted}  
          onChange={(date)=>{this.setState({dateSymptomsStarted: date})}}
          isClearable
          placeholderText="Enter Date"
          maxDate={new Date()}
          dateFormat="dd/MM/yyyy"
        />
      </div>
    )
  }

  renderPostitiveTestDate() {
    return (
      <div className="positiveTestDateBox">
        <p>Please enter the date you most recently tested positive:</p>
        <DatePicker
          selected={this.state.dateTestedPositive}  
          onChange={(date)=>{this.setState({dateTestedPositive: date})}}
          isClearable
          placeholderText="Enter Date"
          maxDate={new Date()}
          dateFormat="dd/MM/yyyy"
        />
      </div>
    )
  }

  renderNegativeTestDate() {
    return (
      <div className="negativeTestDateBox">
        <p>Please enter the date that you tested negative:</p>
        <DatePicker
          selected={this.state.dateTestedNegative}  
          onChange={(date)=>{this.setState({dateTestedNegative: date})}}
          isClearable
          placeholderText="Enter Date"
          maxDate={new Date()}
          dateFormat="dd/MM/yyyy"
        />
      </div>
    )
  }

  renderReportDetails() {
    switch(this.state.currentStatus) {
      case USER_COVID_STATES.RECOVERED_CLEAR: switch(this.props.selectedState) {
        case USER_COVID_STATES.RECOVERED_CLEAR: return this.greenToGreen();
        case USER_COVID_STATES.HAVE_SYMPTOMS: return this.greenToAmber();
        case USER_COVID_STATES.TESTED_POSITIVE: return this.greenToRed();
      }
      case USER_COVID_STATES.HAVE_SYMPTOMS: switch(this.props.selectedState) {
        case USER_COVID_STATES.RECOVERED_CLEAR: return this.amberToGreen();
        case USER_COVID_STATES.HAVE_SYMPTOMS: return this.amberToAmber();
        case USER_COVID_STATES.TESTED_POSITIVE: return this.amberToRed();
      }
      case USER_COVID_STATES.TESTED_POSITIVE: switch(this.props.selectedState) {
        case USER_COVID_STATES.RECOVERED_CLEAR: return this.redToGreen();
        case USER_COVID_STATES.HAVE_SYMPTOMS: return this.redToAmber();
        case USER_COVID_STATES.TESTED_POSITIVE: return this.redToRed();
      }
      default: switch(this.props.selectedState) {
        case USER_COVID_STATES.RECOVERED_CLEAR: return this.startGreen();
        case USER_COVID_STATES.HAVE_SYMPTOMS: return this.startAmber();
        case USER_COVID_STATES.TESTED_POSITIVE: return this.startRed();
      }
    }
  }

  render() {
    return (
      <div className="reportDetails">
        <h3>You're Reporting: {this.props.selectedState}</h3>
        <h3>Your Current Status Is: {this.state.currentStatus}</h3>
        {this.props.profile.previously_tested_positive == null && <QPreviosulyTestedPositive show 
          setPosTestDate={(date)=> {this.setState({dateTestedPositive: date})}} 
        />}
        <hr/>
        {this.renderReportDetails()}
        <hr/>
        <button className="btn btn-primary" onClick={this.handleBack}>Back</button>
        <button 
          className="btn btn-primary float-right" 
          onClick={this.handleSubmit}
          disabled={!this.state.nextStatus}
        >
          Submit
        </button>
      </div>
    )
  }

  startGreen() {
    return <p>This will set your state to green. This can be changed at any time.</p>
  }
  validateStartGreen() {
    return USER_COVID_STATES.RECOVERED_CLEAR
  }
  
  startAmber() {
    return (
      <React.Fragment>
        <p>This will set your state to amber. You will only be able to change back to green with 2 negative tests taken within 24 hours. You should take a test, if you test positive you should record that here.</p>
        {this.renderSymptomsBox()}
      </React.Fragment>
    )
  }
  validateStartAmber() {
    if(this.state.dateSymptomsStarted !== null)
      return USER_COVID_STATES.HAVE_SYMPTOMS
    else
      return null
  }
  
  startRed() {
    return (
      <React.Fragment>
        <p>You're going straight to red. We need to know when your symptoms started.</p>
        {!this.state.noSymptoms && this.renderSymptomsBox()}
        OR<br/>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" 
            value={this.state.noSymptoms} 
            onChange={(e)=>{
              this.setState({noSymptoms: e.target.checked})
              if(e.target.checked) {
                this.setState({dateSymptomsStarted: null})
              }
            }}
            id="noSymptomsCheck"/>
          <label class="form-check-label" for="defaultCheck1">
            I have had no symptoms.
          </label>
        </div>    
        {this.renderPostitiveTestDate()}  
      </React.Fragment>
    )
  }
  validateStartRed() {
    if(this.state.noSymptoms) {
      if(this.state.positiveTestDate !== null)
        return USER_COVID_STATES.TESTED_POSITIVE
      else
        return null
    } else {
      if(this.state.dateSymptomsStarted !== null && this.state.positiveTestDate !== null)
        return USER_COVID_STATES.TESTED_POSITIVE
      else
        return null
    }
  }

  greenToGreen() {
    return (
      <React.Fragment>
        <p>You're still green, that's great news.</p>
      </React.Fragment>
    )
  }
  validateGreenToGreen() {
    return USER_COVID_STATES.RECOVERED_CLEAR
  }
  
  greenToAmber() {
    return (
      <React.Fragment>
        <p>This will set you state to amber. You will only be able to change back to green with 2 negative tests taken within 24 hours. You should take a test, if you test positive you should record that here.</p>
        {this.renderSymptomsBox()}
      </React.Fragment>
    )
  }
  validateGreenToAmber() {
    if(this.state.dateSymptomsStarted !== null)
      return USER_COVID_STATES.HAVE_SYMPTOMS
    else
      return null
  }
  
  greenToRed() {
    return (
      <React.Fragment>
        <p>You're going from green straight to red. We need to know when your symptoms started.</p>
        {!this.state.noSymptoms && this.renderSymptomsBox()}
        OR<br/>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" 
            value={this.state.noSymptoms} 
            onChange={(e)=>{this.setState({noSymptoms: e.target.checked})}}
            id="noSymptomsCheck"/>
          <label class="form-check-label" for="defaultCheck1">
            I have had no symptoms.
          </label>
        </div>    
        {this.renderPostitiveTestDate()}  
      </React.Fragment>
    )
  }
  validateGreenToRed() {
    if(this.state.noSymptoms) {
      if(this.state.positiveTestDate !== null)
        return USER_COVID_STATES.TESTED_POSITIVE
      else
        return null
    } else {
      if(this.state.dateSymptomsStarted !== null && this.state.positiveTestDate !== null)
        return USER_COVID_STATES.TESTED_POSITIVE
      else
        return null
    }
  }
  
  amberToGreen() {
    const daysAgoSymptomsStarted = new Date().getDate() - new Date(this.props.profile.covid_instance.date_symptoms_started).getDate()
    if(daysAgoSymptomsStarted <= 7) {
      return (
        <React.Fragment>
          <p>As you reported your symptoms started within the last 7 days, you may only change your status to green if you have tested negative for coronavirus since then.</p>
          {this.renderNegativeTestDate()}
        </React.Fragment>
      )
    } else { 
      return (
        <React.Fragment>
          <p>As your symptoms started 7 - 14 days ago you may change your status to green if you have either:</p>
          <ol>
            <li>
              Tested negative:
              {this.renderNegativeTestDate()}
            </li>
            <li>
              OR Confirmed that:
              <ul>
                <li>
                  Your symptoms have improved, <em>and</em> 
                  <input type="checkbox" checked={this.state.symptomsImproved}
                    onChange={(e)=>{this.setState({symtpomsImproved: e.target.checked})}}
                  />
                </li>
                <li>
                  you have not had a fever in the last 24 hours 
                  <input type="checkbox" checked={this.state.noFeverLast24h}
                    onChange={(e)=>{this.setState({noFeverLast24h: e.target.checked})}}
                  />
                </li>
              </ul>
            </li>
          </ol>
        </React.Fragment>
      )
    }
  }
  validateAmberToGreen() {
    const daysAgoSymptomsStarted = new Date().getDate() - new Date(this.props.profile.covid_instance.date_symptoms_started).getDate()
    if(daysAgoSymptomsStarted <= 7) {
      if(this.state.dateSymptomsStarted !== null)
        return USER_COVID_STATES.RECOVERED_CLEAR
    } else {
      if(this.state.dateTestedNegative !== null)
        return USER_COVID_STATES.RECOVERED_CLEAR
      else {
        if(this.state.symptomsImproved && this.state.noFeverLast24h)
          return USER_COVID_STATES.RECOVERED_CLEAR
        else 
          return null
      }
    }
  }
  
  amberToAmber() {
    return (
      <React.Fragment>
        <p>You've still got symptoms.</p>
      </React.Fragment>
    )
  }
  validateAmberToAmber() {
    return USER_COVID_STATES.HAVE_SYMPTOMS
  }
  
  amberToRed() {
    const daysAgoSymptomsStarted = new Date().getDate() - new Date(this.props.profile.covid_instance.date_symptoms_started).getDate()
    console.log(daysAgoSymptomsStarted)
    if(daysAgoSymptomsStarted < 7) return this.renderPostitiveTestDate()
    else return (
      <React.Fragment>
        <p>As you tested positive (and symptoms started) over 7 days aho you may now change your status to red if you can confirm:</p>
        <ul>
          <li>
            Your symptoms have not improved, <em>or</em> 
            <input type="checkbox" checked={this.state.symptomsNotImproved}
              onChange={(e)=>{
                this.setState({symptomsNotImproved: e.target.checked})
                this.validateAmberToRed()
              }}
            />
          </li>
          <li>
            you have had a fever in the last 24 hours 
            <input type="checkbox" checked={this.state.feverLast24h}
              onChange={(e)=>{
                this.setState({feverLast24h: e.target.checked})
                this.validateAmberToRed()
            }}
            />
          </li>
        </ul>
        {!this.state.symptomsNotImproved && !this.state.feverLast24h &&
          <React.Fragment>
            <p>Please confirm:</p>
            <ol>
              <li>
                If your symptoms have improved
                <div class="custom-control custom-radio custom-control-inline">
                  <input type="radio" id="radioSymptomsImproved" name="customRadioInline1" class="custom-control-input"
                    onChange={() => { 
                      this.setState({ optionSelectedSymptomsImproved: true, symptomsImproved: true })
                      this.validateAmberToRed()
                    }}
                    checked={this.state.optionSelectedSymptomsImproved && this.state.symptomsImproved} 
                  />
                  <label class="custom-control-label" for="radioSymptomsImproved">Yes</label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                  <input type="radio" id="radioSymptomsImproved2" name="customRadioInline1" class="custom-control-input"
                    onChange={() => { 
                      this.setState({ optionSelectedSymptomsImproved: true, symptomsImproved: false })
                      this.validateAmberToRed()
                    }}
                    checked={this.state.optionSelectedSymptomsImproved && !this.state.symptomsImproved} 
                  />
                  <label class="custom-control-label" for="radioSymptomsImproved2">No</label>
                </div>
              </li>
              <li>
                If you have had a fever in the last 24h
                <div class="custom-control custom-radio custom-control-inline">
                  <input type="radio" id="radioNoFeverLast24h" name="customRadioInline2" class="custom-control-input"
                    onChange={() => { 
                      this.setState({ optionSelectedNoFeverLast24h: true, noFeverLast24h: true })
                      this.validateAmberToRed()
                    }}
                    checked={this.state.optionSelectedNoFeverLast24h && this.state.noFeverLast24h} 
                  />
                  <label class="custom-control-label" for="radioNoFeverLast24h">Yes</label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                  <input type="radio" id="radioNoFeverLast24h2" name="customRadioInline2" class="custom-control-input"
                    onChange={() => { 
                      this.setState({ optionSelectedNoFeverLast24h: true, noFeverLast24h: false })
                      this.validateAmberToRed()
                    }}
                    checked={this.state.optionSelectedNoFeverLast24h && !this.state.noFeverLast24h} 
                  />
                  <label class="custom-control-label" for="radioNoFeverLast24h2">No</label>
                </div>
              </li>
            </ol>
            {!this.state.symptomsNotImproved && !this.state.feverLast24h && this.state.symptomsImproved && this.state.noFeverLast24h &&
              <p>Great News! You are likely to have recovered from COVID-19. Because you tested positive (and symptoms started over 7 days ago) AND your symptoms have improved AND you have had no fever in the past 24 hours you are unlikely to be contagious so your status is being set to green.</p>
            }
          </React.Fragment>
        }
      </React.Fragment>
    )
  }
  validateAmberToRed() {
    const daysAgoSymptomsStarted = new Date().getDate() - new Date(this.props.profile.covid_instance.date_symptoms_started).getDate()
    if(daysAgoSymptomsStarted <= 7) {
      if(this.state.dateTestedPositive !== null)
        return USER_COVID_STATES.TESTED_POSITIVE
      else 
        return null
    } else {
      if(this.state.symptomsNotImproved || this.state.feverLast24h)
        return USER_COVID_STATES.TESTED_POSITIVE
      else {
        if(this.state.symptomsImproved && this.state.noFeverLast24h)
          return USER_COVID_STATES.TESTED_POSITIVE
        else
          return null
      }
    }
  }
  
  redToGreen() {
    const daysAgoSymptomsStarted = new Date().getDate() - new Date(this.props.profile.covid_instance.date_symptoms_started).getDate()
    const greenInDays = 21 - daysAgoSymptomsStarted
    return (
      <React.Fragment>
        <p>You cannot change your state to green. This will happen automatically in {greenInDays} days.</p>
      </React.Fragment>
    )
  }
  validateRedToGreen() {
    return USER_COVID_STATES.TESTED_POSITIVE
  }
  
  redToAmber() {
    const daysAgoSymptomsStarted = new Date().getDate() - new Date(this.props.profile.covid_instance.date_symptoms_started).getDate()
    const greenInDays = 21 - daysAgoSymptomsStarted
    return (
      <React.Fragment>
        <p>You cannot change your state to amber. It will automatically go green in {greenInDays} days.</p>
      </React.Fragment>
    )
  }
  validateRedToAmber() {
    return USER_COVID_STATES.TESTED_POSITIVE
  }
  
  redToRed() {
    const daysAgoSymptomsStarted = new Date().getDate() - new Date(this.props.profile.covid_instance.date_symptoms_started).getDate()
    const greenInDays = 21 - daysAgoSymptomsStarted
    return (
      <React.Fragment>
        <p>You're still red. It will automatically go green in {greenInDays} days.</p>
      </React.Fragment>
    )
  }
  validateRedToRed() {
    return USER_COVID_STATES.TESTED_POSITIVE
  }
}

function mapStateToProps(state) {
  return {
    selectedState: state.user.selectedState,
    profile: state.user.profile
  }
}

export default connect(mapStateToProps)(withRouter(ReportDetails))
