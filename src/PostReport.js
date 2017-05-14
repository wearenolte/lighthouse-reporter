var validUrl = require('valid-url')

function PostReporter( request, reply ) {
  let { item } = request.payload;
  let { message, room } = item || {};

  const roomID = 'id' in room ? room.id : 0;
  let chatRequest = 'message' in message ? message.message : '';
  chatRequest = chatRequest.replace('/weather', '').trim();
  console.log('Notification will be done in: ', roomID);
  console.log('Validating: ', chatRequest);
  const isValid = validUrl.isUri( chatRequest );

  return reply({
    color: isValid ? 'green' : 'red',
    message: isValid ? 'Report recieved, thank you!' : 'Make sure you have a valid URL to analize.',
    notify: false,
    message_format: 'text',
  })
}

module.exports = PostReporter;
