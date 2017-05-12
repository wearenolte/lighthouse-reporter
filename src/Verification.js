const Notification = require('./Notification');
const fetch = require('node-fetch'); // polyfill

const SCORE = {
  GOOD: 75,
  AVARAGE: 45,
}

async function sendNotification( total = 0, url, hipchat, report ) {
  // Set error as default.
  let notificationOpts = {
    room: hipchat,
    url: url,
    description: `The score for your <a href="${url}">site</a> was <a href="${report}"><b>${total.toFixed(2)} / 100</b></a>. <a href="${report}">Full report</a>.`,
  }

  if ( total >= SCORE.GOOD ) {
    notificationOpts.status = 'Good';
  } else if ( total >= SCORE.AVARAGE ) {
    notificationOpts.status = 'Avarage';
  } else {
    notificationOpts.status = 'Fail';
  }
  return await Notification(notificationOpts);
}

async function Verification( request, reply ) {
  const { id } = request.query;
  const BASE = `https://www.webpagetest.org/jsonResult.php?test=${id}`;
  const testRequest = await fetch(BASE);
  const json = await testRequest.json();
  const data = 'data' in json ? json.data : {};
  let { lighthouse, html_result_url } = data;
  lighthouse = lighthouse || {};
  const { url } = lighthouse;
  const score = lighthouse.aggregations.reduce( (accumulator, item) => {
    return accumulator + item.total;
  }, 0);
  const total = score * 100;
  const result = sendNotification(total, url, request.params.hipchat, html_result_url);
  return reply(result);
}

module.exports = Verification;
