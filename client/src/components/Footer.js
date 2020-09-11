import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGooglePlusSquare } from '@fortawesome/free-brands-svg-icons';
import logoandtext from '../resources/logoandtsfwhitetr.png'
import {
  PRIVACY_POLICY_URI,
  DISCLAIMER_URI,
  TERMS_URI,
  COOKIES_URI
} from '../store/constants'



class Footer extends React.Component {
  render() {
    return(
      <div className="section footer banner">
        <div className="row">
          <div className="col-sm-12 col-md-6 text-center text-md-left">
            <Link to='/'>
              <img src={logoandtext} /><br/>
            </Link>
            Targeting Coronavirus Together
          </div>
          <div className="col-sm-12 col-md-6">
            <div className="row">
              <div className="col-4">
                <Link to={PRIVACY_POLICY_URI}>Privacy</Link>
              </div>
              <div className="col-4">
                <Link to={DISCLAIMER_URI}>Disclaimer</Link>
              </div>
              <div className="col-4">
                <Link to="/contact">Contact Us</Link>
              </div>
              <div className="col-4">
                <Link to={TERMS_URI}>Terms</Link>
              </div>
              <div className="col-4">
                <Link to={COOKIES_URI}>Cookies</Link>
              </div>
              <div className="col-4 tiny-text">
                &#169; 2020 TotalSoFar.com
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
