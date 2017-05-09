const Hipchat = require('./Hipchat');
const hipchat = new Hipchat( process.env.HIPCHAT_KEY || '' );

const STATUS = {
  Started: 'lozenge-current',
  Completed: 'lozenge-success',
  Error: 'lozenge-error',
}

const Colors = {
  Started: 'yellow',
  Completed: 'green',
  Error: 'red',
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
        description: options.description,
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
