const Reporter = require('./Reporter');
var validUrl = require('valid-url')

async function PostReporter( request, reply ) {
  let { item } = request.payload;
  let { message, room } = item || {};

  const roomID = 'id' in room ? room.id : 0;
  let chatRequest = 'message' in message ? message.message : '';
  chatRequest = chatRequest.replace('/report', '').trim();
  console.log('Notification will be done in: ', roomID);
  console.log('Validating: ', chatRequest);
  const isValid = validUrl.isUri( chatRequest );

  if ( isValid ) {
    await Reporter({
      query: {
        site: chatRequest,
          hipchat: roomID,
      }
    }, () => {});
  }

  return reply({
    color: isValid ? 'green' : 'red',
    message: isValid ? 'Report recieved, thank you!' : 'Make sure you have a valid URL to analize.',
    notify: false,
    message_format: 'text',
  })
}

module.exports = PostReporter;
