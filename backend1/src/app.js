const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const connecttodb = require('../db/db');
require('dotenv').config();
const route = require('./router/authroute');
const invoiceroute = require('./router/taskrouter');
const cookieParser = require('cookie-parser');

const app = express();
connecttodb();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", 'https://task4-e2qw.onrender.com'],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
        imgSrc: ["'self'", 'data:', 'https://task4-e2qw.onrender.com'],
        connectSrc: ["'self'", 'https://task4-e2qw.onrender.com'],
      },
    },
  })
);

///
const corsOptions = {
  origin: 'https://taskmanagement11-wpt5.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', route);
app.use('/task', invoiceroute);

module.exports = app;
