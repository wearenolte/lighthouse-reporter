const Notification = require('./Notification');

async function Verification( request, reply ) {
  console.log(request);
  // const notificationResult = await Notification({
  //   status: 'Error',
  //   description: `There was an error proccesing`,
  //   room: request.query.hipchat,
  //   url: request.query.site,
  // });
  return reply({});
}

module.exports = Verification;
