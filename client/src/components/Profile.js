import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { USER_COVID_STATES } from '../store/constants'
import actions from '../store/actions/index'

import ProfileCard from './ProfileCard'

class Profile extends React.Component {
  constructor(props) {
    super(props)

    this.renderConnections = this.renderConnections.bind(this)
  }

  componentWillMount() {
    this.props.dispatch(actions.getUserContacts())
  }

  renderConnections() {
    return(
      <div className="row">
        <div className="col-12">
          <Link to='/settings'>
            <ProfileCard 
              name={this.props.user.name}
              status={this.props.user.status}
            />
          </Link>
          <h3>You're sharing with: {this.props.connections.length}</h3>
          <Link to='/connect'>
            <button className="btn btn-secondary">
              Connect More People
            </button>
          </Link>
        </div>
        <div className="col-md-4">
          {this.props.connections.length > 0 && this.props.connections.map((connection, index) => {
            return(
              <Link to={'/connection/'+connection.id}>
                <ProfileCard
                  name={connection.name}
                  status={connection.latest_report.state || null}
                  key={index}
                />
              </Link>
            )
          })}
        </div>
      </div>
    );
  }

  render() {
    return(
      <div className="userProfile">
        {this.renderConnections()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.profile,
    connections: state.user.contacts
  }
}

export default connect(mapStateToProps)(Profile);
