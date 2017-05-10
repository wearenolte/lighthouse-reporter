const Reporter = require('./src/Reporter');
const Verification = require('./src/Verification');
const Joi = require('joi');

module.exports = [
  {
    method: 'GET',
    path: '/report/',
    handler: Reporter,
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
    method: 'GET',
    path: '/verification/',
    handler: Verification,
    config: {
    }
  }
]
