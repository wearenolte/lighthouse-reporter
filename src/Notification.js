const Hipchat = require('./Hipchat');
const hipchat = new Hipchat( process.env.HIPCHAT_KEY || '' );

const STATUS = {
  Started: 'lozenge-moved',
  Completed: 'lozenge-success',
  Good: 'lozenge-success',
  Error: 'lozenge-error',
  Fail: 'lozenge-error',
  Avarage: 'lozenge-current',
}

const Colors = {
  Started: 'gray',
  Completed: 'green',
  Good: 'green',
  Error: 'red',
  Fail: 'red',
  Avarage: 'yellow',
}

async function Notification( options ) {
  const status = options['status'];
  const notificationOptions = {
    room: options.room,
    args: {
      title: 'Lighthouse Report',
      message: 'Reporter message',
      color: Colors[status],
      card: {
        description: {
          value: options.description,
          format: 'html',
        },
        url: options.url,
        attributes: [{
          label: 'Status',
          value: {
            label: status,
            style: STATUS[status],
          }
        }]
      }
    }
  }
  return await hipchat.send( notificationOptions );
}

module.exports = Notification;
