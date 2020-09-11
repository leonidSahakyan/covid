import React from 'react'
import iphoneShareIcon from '../resources/iphone-share-icon.png'
import { isIOS, isAndroid, isMobile, isTablet } from "react-device-detect";
import { Link } from 'react-router-dom'

class HomeScreenInstallBanner extends React.Component {
  constructor(props) {
    super(props)
    this.renderIOS = this.renderIOS.bind(this)
    this.renderAndroid = this.renderAndroid.bind(this)
    this.isInstallable = this.isInstallable.bind(this)
  }

  renderIOS() {
    return (
      <div>
        <img src={iphoneShareIcon} />
        Install app on home screen
      </div>
    )
  }

  renderAndroid() {
    return (
      <div>
        <img src={iphoneShareIcon} />
        Install app on home screen
      </div>
    )
  }

  isInstallable() {
    if(((isMobile || isTablet) && (isIOS || isAndroid)) && !(navigator.standalone || window.matchMedia('(display-mode: standalone)').matches)) return true
    else return false
  }

  render() {
    if(this.isInstallable())
    return(
      <Link to='/install'>
        <div className="homeScreenInstallBanner text-center">
          {isIOS && this.renderIOS()}
          {isAndroid && this.renderAndroid()}
        </div>
      </Link>
    );
    else return null
  }
}

export default HomeScreenInstallBanner
