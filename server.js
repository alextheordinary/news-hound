// Import dependencies
const path = require('path'); // path object for use in serving static files
const express = require('express'); // express server
const session = require('express-session'); // for session data / cookies
const exphbs = require('express-handlebars'); // handlebars template engine
const routes = require('./controllers'); // importing routes from controllers/index.js
const sequelize = require('./config/connection'); // connection.js
// Used to store session data / cookies
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// const helpers = require('./utils/helpers'); // handlebars helpers
const Parser = require('./utils/Parser');

// Defining the express server and the port it will run on
const app = express();
const PORT = process.env.PORT || 3001;

// Creating the session - 5 minute maxAge for testing / grading purposes

const sess = {
    secret: process.env.SESS_SECRET,
    cookie: {
      maxAge: 5 * 60 * 1000
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

// Settings up handlebars as the template engine
const hbs = exphbs.create(); // {helpers}
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Setting up middleware
app.use(session(sess)); 
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// To serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public'))); 

// app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });

const feedUrl = 'https://www.espn.com/espn/rss/nba/news';
const parser = new Parser(feedUrl);

