const Report = require('./Report');
const Notification = require('./Notification');

async function Reporter( request, reply ) {

  const result = await new Report({
    k: process.env.WEB_PAGE_TEST_KEY || '',
    url: request.query.site,
  }).run();
  
  // Set error as default.
  let notificationOptions = {
    status: 'Error',
    description: `There was an error proccesing ${request.query.site}`,
    room: request.query.hipchat,
    url: request.query.site,
  }

  // Update notificationOptions if was a success
  if ( 'statusCode' in result && result.statusCode === 200 ) {
    notificationOptions = Object.assign({}, notificationOptions, {
      status: 'Started',
      description: 'Your web page performance test has started.',
      url: result.data.userUrl,
    });
  }
  const notificationResult = await Notification(notificationOptions);
  return reply(notificationResult);
}

module.exports = Reporter;
