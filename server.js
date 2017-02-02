/* eslint-env node */

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
// var express = require('express');
import express from 'express';

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
import cfenv from 'cfenv';

// configuration of graphql endpoint
import ncSchema from './data/schema';
import graphqlHTTP from 'express-graphql';

import { graphql } from 'graphql';
import { introspectionQuery } from 'graphql/utilities';

import fs from 'fs';


// create a new express server
const app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));


app.use('/graphql', graphqlHTTP({
  schema: ncSchema,
  graphiql: true,
}));

// export schema for relay client
(async () => {
  console.log('try to create json schema');
  const json = await graphql(ncSchema, introspectionQuery);
//  console.log('graphql call ended: ' + JSON.stringify(json, null, 2));
  fs.writeFileSync('./data/ncSchema.json', JSON.stringify(json, null, 2));
  console.log('JSON test created');
})();




// get the app environment from Cloud Foundry
const appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function () {
  // print a message when the server starts listening
  console.log('server starting on ' + appEnv.url);
});
