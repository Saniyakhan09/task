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
        fontSrc: ["'self'", "data:", "https://taskmanagement11-wpt5.onrender.com"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'", "*"],
      },
    },
  })
);
app.use(express.static("public"));

///
const corsOptions = {
  origin: 'https://task4-e2qw.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));

app.use(cookieParser());

app.use('/auth', route);
app.use('/task', invoiceroute);
app.get('/', (req, res) => {
  res.send('Backend server is running successfully 🚀');
});

module.exports = app;
