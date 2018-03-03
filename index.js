const express = require('express'); // common JS modules
// If node allows, could use ES 2015 modules - import express from 'express'
// which comes with more power

const app = express(); // Generates a running express app; Can have multiple apps
// app listens for requests, routes them to route handlers

// A route handler for the GET req
app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

// Heroku will dynamically provides port as enn var
const PORT = process.env.PORT || 5000;
app.listen(PORT); // caps warns that this shouldn't be changed lightly!

// req res = js object of the incoming req and outgoing res
// res.send closes the response and sends it
// app.listen tells node to listen on 5000

// For Heroku, specify node and npm ver in package.json
// ... and specify start script there too (point to this file)
// heroku create - yields app html and git repository to push to
