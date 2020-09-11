import React from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'

const testData = [
  'notification 1',
  'notification 1',
  'notification 1',
  'notification 1',
  'notification 1',
  'notification 1',
  'notification 1',
  'notification 1',
  'notification 1',
  'notification 1',
  'notification 1',
  'notification 1',
  'notification 1',
  'notification 1',
  'notification 1',
]

class NotificationsModal extends React.Component {

  componentDidMount() {
    $('#notificationsModal').modal('show')
  }

  render() {
    return(
      <div className="notificationsModal">
        <div class="modal fade" id="notificationsModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Notifications</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
              {testData.map((notification, index) => {
                return <Notification text={notification} key={index} />
              })}
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class Notification extends React.Component {
  render() {
    return (
      <div className="notification">
        {this.props.text}
      </div>
    )
  }
}

export default connect()(NotificationsModal)
