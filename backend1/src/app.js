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
      useDefaults: false,
      directives: {
        "default-src": ["'self'"],
        "script-src": ["'self'", "'unsafe-inline'", "https://task4-e2qw.onrender.com"],
        "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        "font-src": ["'self'", "data:", "https://fonts.gstatic.com", "https://taskmanagement11-wpt5.onrender.com"],
        "img-src": ["'self'", "data:", "https://task4-e2qw.onrender.com"],
        "connect-src": ["'self'", "https://task4-e2qw.onrender.com"],
        "object-src": ["'none'"],
        "frame-ancestors": ["'self'"],
      },
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
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
app.use(express.static('public'));

app.use(cookieParser());

app.use('/auth', route);
app.use('/task', invoiceroute);

module.exports = app;
