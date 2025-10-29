const cors = require('cors');
const express = require('express');
const connecttodb = require('../db/db');
require('dotenv').config();
const route = require('./router/authroute');
const invoiceroute = require('./router/taskrouter');
const cookieParser = require('cookie-parser');

const app = express();
connecttodb();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', route);
app.use('/task', invoiceroute);

module.exports = app;
