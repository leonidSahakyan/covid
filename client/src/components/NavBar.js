import React from 'react';
import { connect } from "react-redux";
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import logoandtext from '../resources/logoandtsfbluetr.png';
import { AUTH_STATES } from '../store/constants'
import Menu from './Menu'

class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.closeMenu = this.closeMenu.bind(this)
    this.renderThreeBarMenu = this.renderThreeBarMenu.bind(this)
    this.state = {
      menuOpen: false
    }
  }

  closeMenu() {
    this.setState({
      menuOpen: false
    })
  }

  renderThreeBarMenu() {
    if(this.props.authState === AUTH_STATES.AUTHENTICATED) return(
      <button
        type="button"
        className="btn btn-primary d-inline"
        onClick={()=>{this.setState({menuOpen: !this.state.menuOpen})}}
      >
          <FontAwesomeIcon icon={faBars} />
      </button>
    );
  }

  render() {
    return(
      <React.Fragment>
        <div className="section navBar">
          <div className="row">
            <div className="col">
            <table>
              <tbody>
                <tr>
                  <td className="align-middle">
                    <Link to='/'>
                      <img src={ logoandtext } />
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
            <div className="col">
              <table className="float-right">
                <tbody>
                  <tr>
                    <td>
                      {this.renderThreeBarMenu()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {this.state.menuOpen &&
          <Menu closeMenu={this.closeMenu}/>
        }
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    authState: state.user.authState
  }

}

export default connect(mapStateToProps)(NavBar);
