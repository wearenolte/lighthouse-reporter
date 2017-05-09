const Hapi = require('hapi');
const server = new Hapi.Server();
const Reporter = require('./src/Reporter');
const Joi = require('joi');

server.connection({
  port: (process.env.PORT || 8080),
  host: '0.0.0.0'
});

server.route({
  method: 'GET',
  path: '/',
  handler: Reporter,
  config: {
    validate: {
      query: {
        hipchat: Joi.string().required(),
        site: Joi.string().uri().required(),
      }
    }
  }
})

server.start((error) => {
  if ( error ) {
    throw error;
  }
  console.log(`Server running at:  ${server.info.uri}`);
});
