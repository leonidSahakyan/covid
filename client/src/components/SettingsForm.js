import React from 'react'
import { connect } from 'react-redux'
import actions from '../store/actions/index'
import { withRouter } from 'react-router-dom'
import DatePicker from 'react-datepicker'

class SettingsForm extends React.Component {
  constructor(props) {
    super(props)
    this.saveSettings = this.saveSettings.bind(this)

    let {user} = props
    this.state = {
      name: user.name,
      email: user.email,
      gender: user.gender,
      dob: user.dob,
      city: user.city,
      county: user.county,
      country: user.country,
      phone:user.phone,
      notifications_on: user.notifications_on,
      autosharing_on: user.autosharing_on,
      interested_ppe: user.interested_ppe,
      interested_htk: user.interested_htk,
      confirmDeleteAccount: false
    }
  }

  saveSettings() {
    let settings = {
      name: this.state.name,
      email: this.state.email,
      gender: this.state.gender,
      dob: this.state.dob,
      city: this.state.city,
      county: this.state.county,
      country: this.state.country,
      phone:this.state.phone,
      notifications_on: this.state.notifications_on,
      autosharing_on: this.state.autosharing_on,
      interested_ppe: this.state.interested_ppe,
      interested_htk: this.state.interested_htk
    }

    // validation
    let {user} = this.props
    if(settings.name === user.name) delete settings.name
    if(settings.email === user.email) delete settings.email
    if(settings.gender === user.gender) delete settings.gender
    if(settings.dob === user.dob) delete settings.dob
    if(settings.city === user.city) delete settings.city
    if(settings.county === user.county) delete settings.county
    if(settings.country === user.country) delete settings.country
    if(settings.phone === user.phone) delete settings.phone
    if(settings.notifications_on === user.notifications_on) delete settings.notifications_on
    if(settings.autosharing_on === user.autosharing_on) delete settings.autosharing_on
    if(settings.interested_ppe === user.interested_ppe) delete settings.interested_ppe
    if(settings.interested_htk === user.interested_htk) delete settings.interested_htk
    this.props.history.goBack()
    this.props.dispatch(actions.updateSettings(settings))
  }

  render() {
    return (
      <div className="settings">
        <input type="text" placeholder="Display Name" value={this.state.name} onChange={(e)=>{this.setState({name: e.target.value})}} />
        <input type="text" placeholder="email" value={this.state.email} onChange={(e)=>{this.setState({email: e.target.value})}} />
        <div class="custom-control custom-radio custom-control-inline">
          <input type="radio" id="customRadioInline1"  name="sexRadioInline1" class="custom-control-input" checked={this.state.gender === 'male'} onChange={(e)=>{this.setState({gender: 'male'})}}/>
          <label class="custom-control-label" for="customRadioInline1">Male</label>
        </div>
        <div class="custom-control custom-radio custom-control-inline">
          <input type="radio" id="customRadioInline2" name="sexRadioInline1" class="custom-control-input" checked={this.state.gender === 'female'} onChange={(e)=>{this.setState({gender: 'female'})}}/>
          <label class="custom-control-label" for="customRadioInline2">Female</label>
        </div>
        <div class="custom-control custom-radio custom-control-inline">
          <input type="radio" id="customRadioInline3" name="sexRadioInline1" class="custom-control-input" checked={this.state.gender === 'other'} onChange={(e)=>{this.setState({gender: 'other'})}}/>
          <label class="custom-control-label" for="customRadioInline3">Other</label>
        </div>
        <div className="dob">
          Date of birth: 
          <DatePicker
            selected={this.state.dob}  
            onChange={(date)=>{
              this.setState({dob: date})
            }}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            isClearable
            placeholderText="Date Of Birth"
            maxDate={new Date()}
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <input type="text" placeholder="City" value={this.state.city} onChange={(e)=>{this.setState({city: e.target.value})}} />
        <input type="text" placeholder="County" value={this.state.county} onChange={(e)=>{this.setState({county: e.target.value})}} />
        <input type="text" placeholder="Country" value={this.state.country} onChange={(e)=>{this.setState({country: e.target.value})}} />
        <input type="text" placeholder="Phone Number" value={this.state.phone} onChange={(e)=>{this.setState({phone: e.target.value})}} />
        <div class="custom-control custom-switch">
          <input type="checkbox" class="custom-control-input" id="toggleNotifications" checked={this.state.notifications_on} onChange={(e)=>{this.setState({notifications_on: e.target.checked})}}/>
          <label class="custom-control-label" for="toggleNotifications">Notifications</label>
        </div>
        <div class="custom-control custom-switch">
          <input type="checkbox" class="custom-control-input" id="toggleAutosharing" checked={this.state.autosharing_on} onChange={(e)=>{this.setState({autosharing_on: e.target.checked})}}/>
          <label class="custom-control-label" for="toggleAutosharing">Share my status</label>
        </div>
        <div class="custom-control custom-switch">
          <input type="checkbox" class="custom-control-input" id="togglePpe" checked={this.state.interested_ppe} onChange={(e)=>{this.setState({interested_ppe: e.target.checked})}}/>
          <label class="custom-control-label" for="togglePpe">I'm interested in PPE</label>
        </div>
        <div class="custom-control custom-switch">
          <input type="checkbox" class="custom-control-input" id="toggleHtk" checked={this.state.interested_htk} onChange={(e)=>{this.setState({interested_htk: e.target.checked})}}/>
          <label class="custom-control-label" for="toggleHtk">I'm interested in Home Testing Kits</label>
        </div>
        <a onClick={() => { this.setState({confirmDeleteAccount: true})}}>Delete Account</a><br/>
        {this.state.confirmDeleteAccount &&
          <React.Fragment>
            <p>This action will permenantly delete your account and all data associated with it. This action cannot be reversed.</p>
            <button className="btn btn-danger" onClick={()=>{
                this.props.history.push('/')
                this.props.dispatch(actions.deleteAccount())
              }}>
              Delete Account
            </button>
            <button className="btn btn-success" onClick={()=>{this.setState({confirmDeleteAccount: false})}}>
              Cancel
            </button>
          </React.Fragment>
        }
        <br/>
        <button className="btn btn-primary" onClick={this.saveSettings}>Save</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.profile
  }
}

export default connect(mapStateToProps)(withRouter(SettingsForm))
