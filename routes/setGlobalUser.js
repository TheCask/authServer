const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../config');

router.post('/', (req, res) => {
  // fetch the user using the token in the session so that we have their ID
  request(
    // POST request to /introspect endpoint
    {
      method: 'POST',
      uri: `http://localhost:${config.fusionAuthPort}/oauth2/introspect`,
      form: {
        'client_id': config.clientID,
        'token': req.session.token
      }
    },

    // callback

    (error, response, body) => {
      let introspectResponse = JSON.parse(body);

      request(
        // PATCH request to /user endpoint
        {
          method: 'PATCH',
          uri: `http://localhost:${config.fusionAuthPort}/api/user/${introspectResponse.sub}`,
          headers: {
            'Authorization': config.apiKey
          },
          json: true,
          body: {
            'user': {
              'birthDate': req.body.birthDate,
              'data': req.body.data,
              'email': req.body.email,
              'firstName': req.body.firstName,
              'fullName': req.body.fullName,
              'imageUrl': req.body.imageUrl,
              'lastName': req.body.lastName,
              'middleName': req.body.middleName,
              'mobilePhone': req.body.mobilePhone,
              'passwordChangeRequired': req.body.passwordChangeRequired,
              'preferredLanguages': req.body.preferredLanguages,
              'timezone': req.body.timezone,
              'twoFactorDelivery': req.body.twoFactorDelivery,
              'twoFactorEnabled': req.body.twoFactorEnabled,
              'usernameStatus': req.body.usernameStatus,
              'username': req.body.username
            }
          }
        }
      );
    }
  );
});

module.exports = router;