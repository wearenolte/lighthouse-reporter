const Reporter = require('./Reporter');
var validUrl = require('valid-url')
const errorResponse = {
  color: 'red',
  message: 'Make sure you have a valid URL to analize.',
  notify: false,
  message_format: 'text',
}

async function RoomCommand( request, reply ) {
  let { item } = request.payload;
  let { message, room } = item || {};

  const roomID = 'id' in room ? room.id : 0;
  let chatRequest = 'message' in message ? message.message : '';
  chatRequest = chatRequest.replace('/report', '').trim();

  console.log('Notification will be done in: ', roomID);
  console.log('Validating: ', chatRequest);
  const isValid = validUrl.isUri( chatRequest );

  let response = {};
  if ( isValid ) {
    await Reporter({
      site: chatRequest,
      hipchat: roomID,
    });
  } else {
    response = errorResponse;
  }
  return reply(response);
}

module.exports = RoomCommand;
