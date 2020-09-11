import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import actions from '../store/actions/index'

class Menu extends React.Component {
  constructor(props) {
    super(props)

    this.ref = React.createRef()
    this.handleScroll = this.handleScroll.bind(this)
    this.getClasses = this.getClasses.bind(this)

    this.state = {
      fixed: false
    }
  }

  handleScroll() {
    if(window.scrollY > 40) {
      this.setState({
        fixed: true
      })
    } else if (window.scrollY <= 40) {
      this.setState({
        fixed: false
      })
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  getClasses() {
    if(this.state.fixed === true) return 'mobileMenu-container fixed'
    else return 'mobileMenu-container'
  }

  render() {
    return (
      <React.Fragment>
        <div className={this.getClasses()} ref={this.ref}>
          <div className="container-sm">
            <div className="menu">
              <div
                className="menuItem"
                onClick={()=>{
                  this.props.history.push('/settings')
                  this.props.closeMenu()
                }}
              >
                Settings
              </div>
              <div
                className="menuItem"
                onClick={()=>{
                  this.props.dispatch(actions.logout())
                  this.props.closeMenu()
                }}
              >
                Log out
              </div>
            </div>
          </div>
        </div>
        <div className="menuBackground" onClick={this.props.closeMenu}></div>
      </React.Fragment>
    )
  }
}

export default connect()(withRouter(Menu))

/*

<div
                className="menuItem"
                onClick={()=>{
                  this.props.history.push('/notifications')
                  this.props.closeMenu()
                }}
              >
                Notifications
              </div>



              */

              
