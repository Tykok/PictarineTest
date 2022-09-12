const express = require('express');

const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const apiErrorHandler = require('./src/router/handling/apiErrorHandler');
const logError = require('./src/router/handling/logError');

// enables environment variables by
// parsing the .env file and assigning it to process.env
dotenv.config({
  path: '.env',
});

const NODE_ENV = process.env.NODE_ENV || 'PROD';
const port = process.env.PORT || 8080;
const corsOptions = {
  origin: [''],
};

if (NODE_ENV === 'DEBUG') {
  app.use(morgan('dev'));

  // Add local address
  corsOptions.origin.push('http://localhost');
}

app.use(express.json()); // Return JSON
app.use(fileUpload()); // Upload file
app.use(cors(corsOptions)); // Use CORS
app.use('', require('./src/router/router'));

app.use(logError);
app.use(apiErrorHandler);

app.listen(port);
