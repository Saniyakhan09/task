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
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "https://task4-e2qw.onrender.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "data:", "https://fonts.gstatic.com", "https://taskmanagement11-wpt5.onrender.com"],
        imgSrc: ["'self'", "data:", "https://taskmanagement11-wpt5.onrender.com"],
        connectSrc: ["'self'", "https://taskmanagement11-wpt5.onrender.com"],
        objectSrc: ["'none'"],
        frameAncestors: ["'self'"],
      },
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
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
app.get('/', (req, res) => {
  res.send('Backend server is running successfully 🚀');
});

module.exports = app;
