const Report = require('./Report');
const Notification = require('./Notification');

async function Reporter( request, reply ) {
  // Params https://sites.google.com/a/webpagetest.org/docs/advanced-features/webpagetest-restful-apis
  const base = process.env.BASE || 'http://localhost:8080';
  const result = await new Report({
    k: process.env.WEB_PAGE_TEST_KEY || '', // k means KEY
    url: request.query.site,
    pingback: `${base}/verification/?hipchat=${request.query.hipchat}`,
  }).run();
  console.log(`Pinback: ${base}/verification/?hipchat=${request.query.hipchat}`);

  // Set error as default.
  let notificationOpts = {
    status: 'Error',
    description: `There was an error proccesing ${request.query.site}`,
    room: request.query.hipchat,
    url: request.query.site,
  }

  // Update notificationOptions if was a success
  if ( 'statusCode' in result && result.statusCode === 200 ) {
    notificationOpts = Object.assign({}, notificationOpts, {
      status: 'Started',
      description: 'Your web page performance test has started.',
      url: result.data.userUrl,
    });
  }
  const notificationResult = await Notification(notificationOpts);
  return reply(notificationResult);
}

module.exports = Reporter;
