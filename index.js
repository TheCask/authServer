const express = require('express');
const cors = require('cors');
const session = require('express-session')
const config = require('./config');

// configure Express app and install the JSON middleware for parsing JSON bodies
const app = express();
app.use(express.json());

// configure sessions
app.use(session(
    {
      secret: 'lavacacomesola',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: 'auto',
        httpOnly: true,
        maxAge: 3600000
      }
    })
  );

// configure CORS
app.use(cors({
    origin: [`http://localhost:${config.clientPort}`],
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
  }));

// use routes
app.use('/getAppUser', require('./routes/getAppUser'));
app.use('/getGlobalUser', require('./routes/getGlobalUser'));
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));
app.use('/setGlobalUser', require('./routes/setGlobalUser'));
app.use('/oauthcallback', require('./routes/oauthCallback'));

// start server
app.listen(config.serverPort, () => console.log(`Mis Cursos UNQ App listening on port ${config.serverPort}.`));