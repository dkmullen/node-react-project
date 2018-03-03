const express = require('express');

const app = express();

// A route handler for the GET req
app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

// Heroku will dynamically provide port as env var; caps warns that this
// const shouldn't be changed lightly!
const PORT = process.env.PORT || 5000;
app.listen(PORT);

/* If node allowed, could use ES 2015 modules - import express from 'express'
    which comes with more power (not apparently allowed thru 8.9.4). Instead,
    the require method uses the 'common JS module'

    const app = express(); Generates a running express app; Can have multiple apps
    tho this is uncommon; app listens for requests, routes them to route handlers

    req res = js object of the incoming req and outgoing res
    res.send closes the response and sends it
    app.listen tells node to listen on 5000

    Deployment checklist:
    * Dynamic Port Binding (const.PORT = process.env.PORT || 5000)
    * Specify Node/NPM - For Heroku, specify node and npm ver in package.json
    * Specify Start Script - ... and specify start script there too (point to this file)
    * Create .gitignore - containing at least this: node_modules
    heroku create - yields app html and git repository to push to
*/
