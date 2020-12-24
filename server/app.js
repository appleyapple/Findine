const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const bp = require('body-parser');
const fetch = require('node-fetch');
const mysql = require('mysql');
const db = require('./models/db');
const dbmysql = require('./models/dbmysql');

// route modules
const restaurantRouter = require('./routes/restaurantRoutes');
const profileRouter = require("./routes/profileRoutes");
const accountRouter = require("./routes/accountRoutes");
const matchRouter = require("./routes/matchRoutes");
const sessionRouter = require("./routes/sessionRoutes");
const forumRouter = require("./routes/forumRoutes");

//server setup
const app = express();
const server = http.createServer(app);

// mongodb setup
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// cors policy fix (client-server)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers','*');
    next();
  });

// parse requests of content-type: application/json
app.use(bp.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bp.urlencoded({ extended: true }));

// routers
app.use('/', restaurantRouter);
app.use('/profiles', profileRouter);
app.use('/accounts', accountRouter);
app.use('/matches', matchRouter);
app.use('/sessions', sessionRouter);
app.use('/forums', forumRouter);


// serves files in client as landing page
app.use(express.static('../client'));

server.listen(9000, () => {
  console.log('Server is running on http://localhost:9000/');
});
