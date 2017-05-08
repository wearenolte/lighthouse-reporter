const fetch = require('node-fetch'); // polyfill
const URL = require('url').URL;
const URLSearchParams = require('url').URLSearchParams;
const NOTIFICATIONS = require('./Notifications');
var uniqid = require('uniqid');

class Hipchat {

  constructor( token, room_id_or_name, userParams ) {
    // https://www.hipchat.com/docs/apiv2/method/send_room_notification
    const defaultArgs = {
      from: 'Lighthouse Reporter',
      color: 'red',
      card: {
        id: uniqid(),
        style: 'application',
        url: "https://www.application.com/an-object",
        format: 'compact',
        title: "Lighthouse Report",
        description: 'Your web page performance test has finished.',
        icon: {
          url: 'https://developers.google.com/web/progressive-web-apps/images/pwa-lighthouse.png'
        },
        attributes: [
          {
            label: 'Status',
            value: {
              label: 'In Progress',
              style: 'lozenge-complete'
            }
          }
        ],
      }
    }
    this.room_id_or_name = room_id_or_name;
    this.token = token;
    this.args = Object.assign({}, defaultArgs, userParams);
  }

  base () {
    return `https://api.hipchat.com/v2/room/${this.room_id_or_name}/notification`;
  }

  send() {
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.args),
    }
    console.log(options);
    return fetch( this.base(), options)
      .then( (response) => response.json() )
      .catch( (error) => {
        console.log( error );
        return {};
      })
  }
}

module.exports = Hipchat;
