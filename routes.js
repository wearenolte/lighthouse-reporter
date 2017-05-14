const Reporter = require('./src/Reporter');
const PostReporter = require('./src/PostReport');
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
    method: 'POST',
    path: '/report/',
    handler: PostReporter,
    config: {
      validate: {
        payload: Joi.object().keys({
          item: Joi.object.required(),
        }),
      }
    }
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
