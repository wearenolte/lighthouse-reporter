const Reporter = require('./src/Reporter');
const RoomCommand = require('./src/RoomCommand');
const Verification = require('./src/Verification');
const Joi = require('joi');
const Boom = require('boom');

module.exports = [
  {
    method: 'GET',
    path: '/report/',
    handler: async function(request, reply) {
      let response = {};
      try {
        response = await Reporter(request.query);
        console.log('Result: ', response);
      } catch ( error ) {
        console.log(error);
        response = Boom.badImplementation('Error during the report');
      }
      return reply(response);
    },
    config: {
      validate: {
        query: {
          hipchat: Joi.string().required(),
            site: Joi.string().uri().required(),
        }
      }
    }
  }, 
  {
    method: 'POST',
    path: '/report/',
    handler: RoomCommand,
  },
  {
    method: 'GET',
    path: '/verification/{hipchat}/',
    handler: Verification,
    config: {
      validate: {
        query: {
          id: Joi.required(),
        }
      }
    }
  }
]
