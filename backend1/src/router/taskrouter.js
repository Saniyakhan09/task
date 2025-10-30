const express = require('express');
const taskroute = express.Router()
const {create,all,update,deletetasks, getAdmintasks} = require('../controller/taskcontroller')
const verifyadmin = require('../task.middleware')

taskroute.post('/create',verifyadmin,create);
taskroute.get('/all',verifyadmin,all);
taskroute.get('/tasks/:id',verifyadmin,getAdmintasks);
taskroute.put('/update/:id',verifyadmin,update);
taskroute.delete('/delete/:id',verifyadmin,deletetasks);

module.exports = taskroute;
