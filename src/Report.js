const fetch = require('node-fetch'); // polyfill
const URL = require('url').URL;
const URLSearchParams = require('url').URLSearchParams;

class Report {

  static get BASE () {
    return 'https://www.webpagetest.org/runtest.php';
  }

  constructor( userParams ) {
    const defaultArgs = {
      'f': 'json', // Format
      'type': 'lighthouse',
      'lighthouse': 1,
      'location': 'Dulles_MotoG4:Moto G4 - Chrome.3GFast',
      'mobile': 1,
    }
    const args = Object.assign({}, defaultArgs, userParams);
    this._saveArgs( args );
  }

  _saveArgs( args ) {
    this.params = new URLSearchParams();
    for( let item in args ) {
      this.params.set( item, args[item] );
    }
  }

  run() {
    let url = new URL(Report.BASE);
    url.search = this.params;

    return fetch( url.toString() )
      .then( (response) => response.json() )
      .catch( (error) => {
        console.log(error);
        return [];
      })
  }
}

module.exports = Report;
