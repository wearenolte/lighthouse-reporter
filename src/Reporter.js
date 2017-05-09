const Report = require('./report');
const Hipchat = require('./Hipchat');

function Reporter( request, reply ) {
  console.log(request.query);
  return reply({});
}

module.exports = Reporter;
