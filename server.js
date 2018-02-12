import bodyParser from 'body-parser';
import express from 'express';
import expressHB from 'express-handlebars';

import {} from 'dotenv/config';

import config from './config';
import router from './controllers';

// Initialize Express
const app = express();

// Load body-parser
app.use(bodyParser.json());

// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Load routes
app.use('/api', router.api);
app.use('/', router.main);
  
// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});