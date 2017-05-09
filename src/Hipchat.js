const fetch = require('node-fetch'); // polyfill
const URL = require('url').URL;
const URLSearchParams = require('url').URLSearchParams;
const _ = require('lodash');
var uniqid = require('uniqid');

class Hipchat {

  constructor( token ) {
    // https://www.hipchat.com/docs/apiv2/method/send_room_notification
    this.token = token;
  }

  base () {
    return `https://api.hipchat.com/v2/room/${this.room_id_or_name}/notification`;
  }

  send( options ) {
    this.room_id_or_name = options.room;
    this._setParams( options.args );
    return this._request();
  }

  _setParams( userParams ) {
    const defaultArgs = {
      from: 'Lighthouse Reporter',
      card: {
        id: uniqid(),
        style: 'application',
        format: 'compact',
        title: "Lighthouse Report",
        icon: {
          url: 'https://developers.google.com/web/progressive-web-apps/images/pwa-lighthouse.png'
        },
        attributes: [],
      }
    }
    this.args = _.merge({}, defaultArgs, userParams);
  }

  _request() {
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.args),
    }

    return fetch( this.base(), options)
      .then( (response) => response.json() )
      .catch( (error) => {
        console.log( error );
        return {};
      })
  }
}

module.exports = Hipchat;
