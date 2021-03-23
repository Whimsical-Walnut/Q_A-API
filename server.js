const express = require('express');

// create express app
const fs = require('fs');
const app = express();
// Setup server port
const port = 5000;
app.use(express.json());
// parse requests of content-type - application/json
app.use(express.urlencoded({extended: false}));
const routes = require('./Q_A.routes.js');

app.use('/qa', routes);

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});