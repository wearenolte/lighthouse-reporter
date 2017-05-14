const Report = require('./Report');
const Notification = require('./Notification');

async function Reporter( query ) {
  // Params https://sites.google.com/a/webpagetest.org/docs/advanced-features/webpagetest-restful-apis
  const base = process.env.BASE || 'http://localhost:8080';
  const pinback = `${base}/verification/${query.hipchat}/`;
  const result = await new Report({
    k: process.env.WEB_PAGE_TEST_KEY || '', // k means KEY
    url: query.site,
    pingback: pinback,
  }).run();
  console.log(`Pinback: ${pinback}`);

  // Set error as default.
  let notificationOpts = {
    status: 'Error',
    description: `There was an error proccesing <a href="${query.site}">${query.site}</a>`,
    room: query.hipchat,
    url: query.site,
  }

  // Update notificationOptions if was a success
  console.log('Response from API', result);
  if ( 'statusCode' in result && result.statusCode === 200 ) {
    let { data } = result;
    notificationOpts = Object.assign({}, notificationOpts, {
      status: 'Started',
      description: `The performance tests for <a href="${query.site}">${query.site}</a> has started. (<a href="${data.userUrl}">Click for more details or the title).</a>`,
      url: data.userUrl,
    });
  }
  const notificationResult = await Notification(notificationOpts);
  return notificationResult;
}

module.exports = Reporter;
