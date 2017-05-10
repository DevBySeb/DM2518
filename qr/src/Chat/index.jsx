import React, { Component } from 'react'
import './index.css'
import model from '../model'

export default class DetailPage extends Component {

  constructor(props) {
    super(props)
    this.notify = this.notify.bind(this)
    this.model = model
    this.sendMessage = this.sendMessage.bind(this)
  }

  componentDidMount() {
    this.model.subscribe(this)
  }

  componentWillUnmount() {
    this.model.unsubscribe(this)
  }

  notify(updates) {
    // Merge in the updates from the model into our local state
    const updatedState = R.toPairs(updates).reduce((acc, [key, val]) =>
      R.assoc(key, val, acc)
      , this.state)
    this.setState(updatedState)
  }

  sendMessage() {
    const element = document.getElementById('chat-message')
    const message = element.value
    if (message) {
      console.log('Sending', message)
      element.value = ''
    } else {
      console.log('no message here')
    }
  }

  render() {
    const center = { lat: 59.3446561, lng: 18.0555958 }
    const zoom = 11
    return (
      <div className="chat">
        <div className="chat__messages">
          <strong>You sent</strong><br />
          <small>HEELLLOOOO</small><br />
          <strong>Admin sent</strong><br />
          <small>HEELLLOOOO</small><br />
        </div>
        <div className="lockToBottom">
          <div className="left customSearch">
            <input id='chat-message'
              onKeyPress={(e) => e.key === 'Enter' ? this.sendMessage() : null}
              placeholder='Need help?'
              type='search'
              className='search-input helpbar width100' />
          </div>
          <div onClick={()=> this.sendMessage() } className="right customSearch list__blue nopadding nomargin">
           Send
          </div>
        </div>

      </div>
    );
  }
}
