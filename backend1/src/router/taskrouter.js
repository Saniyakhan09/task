const express = require('express');
const invoiceroute = express.Router()
const {create,all,update,deleteinvoice, getAdminInvoices} = require('../controller/taskcontroller')
const verifyadmin = require('../task.middleware')

invoiceroute.post('/create',verifyadmin,create);
invoiceroute.get('/all',verifyadmin,all);
invoiceroute.get('/tasks/:id',verifyadmin,getAdminInvoices);
invoiceroute.put('/update/:id',verifyadmin,update);
invoiceroute.delete('/delete/:id',verifyadmin,deleteinvoice);

module.exports = invoiceroute;
