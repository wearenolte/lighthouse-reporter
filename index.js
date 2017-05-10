const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({
  port: (process.env.PORT || 8080),
  host: '0.0.0.0'
});

server.route( require('./routes') );

server.start((error) => {
  if ( error ) {
    throw error;
  }
  console.log(`Server running at:  ${server.info.uri}`);
});
