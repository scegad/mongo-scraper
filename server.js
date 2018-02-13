import bodyParser from 'body-parser';
import express from 'express';
import expressHB from 'express-handlebars';
import passport from 'passport';
import session from 'express-session';

import {} from 'dotenv/config';

import config from './config';
import router from './routes';

// Initialize Express
const app = express();

// Enable Middleware
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({ secret: process.env.SESSIONS_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

// Configure view engine
app.engine("handlebars", expressHB({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Load routes
app.use('/', router.main);
app.use('/api', router.api);
  
// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});